import { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Files() {
    const [files, setFiles] = useState([])

    useEffect(() => {
        fetchFiles()
    }, [])

    async function fetchFiles() {
        try {
            const response = await fetch(`${BACKEND_URL}/files`)
            const data = await response.json()
            if (data.files) {
                setFiles(data.files.map(file => ({
                    ...file,
                    // Ensure we have the correct name even if the URL structure is different
                    name: file.name || file.url.split('/').pop()
                })))
            }
        } catch (error) {
            console.error('Error fetching files:', error)
        }
    }

    async function handleDelete(filename) {
        try {
            const response = await fetch(`${BACKEND_URL}/files/${filename}`, {
                method: 'DELETE'
            })
            
            if (response.ok) {
                alert('File deleted successfully')
                // Refresh the file list
                fetchFiles()
            } else {
                const data = await response.json()
                throw new Error(data.error || 'Delete failed')
            }
        } catch (error) {
            alert('Error deleting file: ' + error.message)
        }
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
                                    <img 
                                        src={`${BACKEND_URL}/${file.name}`} 
                                        alt={file.name}
                                        className="w-24 h-24 object-cover rounded"
                                        onError={(e) => {
                                            console.error('Image failed to load:', file.name);
                                            e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                                        }}
                                    />
                                </td>
                                <td className="py-4 px-6">{file.name}</td>
                                <td className="py-4 px-6">{`${BACKEND_URL}/${file.name}`}</td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                    >
                                        Delete
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