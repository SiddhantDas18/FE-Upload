import { useState } from 'react'
import axios from 'axios'

export default function FileUpload({ onUploadSuccess, backendUrl }) {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) {
            setError('Please select a file')
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post(`${backendUrl}/upload`, formData)
            setFile(null)
            if (onUploadSuccess) {
                onUploadSuccess(response.data)
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Error uploading file')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    style={{ marginBottom: '10px' }}
                />
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>
        </div>
    )
}