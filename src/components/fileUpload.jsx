import { useState } from 'react';
import axios from 'axios';

export default function FileUpload({ onUploadSuccess, backendUrl }) {
    const [file, setFile] = useState(null);
    const [fileDisplayName, setFileDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileDisplayName(selectedFile.name.split('.')[0] || '');
            setError('');
        }
    };

    const handleFileDisplayNameChange = (e) => {
        setFileDisplayName(e.target.value);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFileDisplayName(droppedFile.name.split('.')[0] || '');
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('newName', fileDisplayName);

        try {
            const response = await axios.post(`${backendUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            setFileDisplayName('');
            setSuccessMessage('File uploaded successfully!');
            if (onUploadSuccess) {
                onUploadSuccess(response.data);
            }
            setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to upload file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h1 className='text-3xl font-extrabold text-gray-800 mb-8'>Upload your file</h1>

                {successMessage && (
                    <div className="w-full mb-4 p-4 rounded-lg bg-green-100 text-green-700 text-center">
                        {successMessage}
                    </div>
                )}

                {/* File Upload Area */}
                <div
                    className={`flex flex-col justify-center items-center p-8 m-3 w-full border-2 rounded-lg transition-colors duration-200
                        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
                        ${error ? 'border-red-500' : ''}
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <label htmlFor="file-input" className='cursor-pointer flex flex-col items-center text-center w-full'>
                        <svg className="w-12 h-12 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className='mb-2 text-lg text-gray-600'><span className='font-semibold text-blue-600'>Click to upload</span> or drag and drop</p>
                        <p className='text-sm text-gray-500'>PNG, JPG, GIF (MAX. 800x400px)</p>
                        {file && (
                            <p className='mt-3 text-base text-blue-700 font-medium break-words px-2'>{file.name}</p>
                        )}
                        <input
                            id="file-input"
                            type="file"
                            className='hidden'
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/gif" // Restrict file types
                        />
                    </label>
                </div>

                {/* File Name Input */}
                <div className='w-full mt-6'>
                    <input
                        type="text"
                        placeholder='Set a name for your file'
                        className='w-full p-3 border border-gray-300 rounded-md text-center text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={handleFileDisplayNameChange}
                        value={fileDisplayName}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <p className='text-red-500 text-sm mt-4'>{error}</p>
                )}

                {/* Upload Button */}
                <div className='pt-8 w-full'>
                    <button
                        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300
                            ${file && !loading ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
                        `}
                        onClick={handleSubmit}
                        disabled={!file || loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </div>
                        ) : (
                            'Upload'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
