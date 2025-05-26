import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Files({ backendUrl, onDelete }) {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState({})

    useEffect(() => {
        fetchFiles()
    }, [])

    const isImageFile = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        const extension = filename.split('.').pop().toLowerCase()
        return imageExtensions.includes(extension)
    }

    async function fetchFiles() {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/files`)
            const data = response.data
            if (Array.isArray(data)) {
                setFiles(data.map(file => ({
                    ...file,
                    name: file.filename || file.name,
                    previewUrl: `${backendUrl}/upload/files/${file.filename || file.name}`
                })))
            } else if (data.files) {
                setFiles(data.files.map(file => ({
                    ...file,
                    name: file.name,
                    previewUrl: `${backendUrl}/upload/files/${file.name}`
                })))
            } else {
                setFiles([])
            }
        } catch (error) {
            console.error('Error fetching files:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(filename) {
        setDeleteLoading(prev => ({ ...prev, [filename]: true }))
        try {
            await axios.delete(`${backendUrl}/files/${filename}`)
            if (onDelete) {
                onDelete(filename)
            }
            fetchFiles()
        } catch (error) {
            alert('Error deleting file: ' + (error.response?.data?.error || error.message))
        } finally {
            setDeleteLoading(prev => ({ ...prev, [filename]: false }))
        }
    }

    if (loading) {
        return <div className="container mx-auto p-8 text-center">Loading...</div>
    }

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Uploaded Files</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left">Preview</th>
                            <th className="py-3 px-6 text-left">File Name</th>
                            <th className="py-3 px-6 text-left">Path</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                    {isImageFile(file.name) ? (
                                        <img 
                                            src={file.previewUrl}
                                            alt={file.name}
                                            className="w-24 h-24 object-cover rounded"
                                            onError={(e) => {
                                                console.error('Image failed to load:', file.name)
                                                e.target.src = 'https://via.placeholder.com/150?text=No+Preview'
                                            }}
                                        />
                                    ) : (
                                        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded">
                                            <span className="text-gray-500 text-sm">No Preview</span>
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-6">{file.name}</td>
                                <td className="py-4 px-6">{file.previewUrl}</td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                                        transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={deleteLoading[file.name]}
                                    >
                                        {deleteLoading[file.name] ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}