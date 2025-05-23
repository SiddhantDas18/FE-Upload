import {useState} from 'react'

export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return <>
        <div>
            <div className='h-screen w-screen flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold mb-6'>Upload your file</h1>
                <div className='flex flex-col justify-center text-center items-center border-2 border-dashed border-gray-300 rounded-lg p-8 m-3 w-96 hover:border-blue-500 transition-colors'>
                    <label className='cursor-pointer'>
                        <div className='flex flex-col items-center'>
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className='mb-2 text-sm text-gray-500'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                            <p className='text-xs text-gray-500'>PNG, JPG or GIF (MAX. 800x400px)</p>
                            {selectedFile && (
                                <p className='mt-2 text-sm text-blue-600'>{selectedFile.name}</p>
                            )}
                        </div>
                        <input 
                            type="file" 
                            className='hidden' 
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </label>
                </div>
                <div className='pt-5'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors'>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    </>
}