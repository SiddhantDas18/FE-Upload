import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-2 flex justify-center">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <NavLink
          to="/upload"
          className={({ isActive }) => `
            px-4 py-2 text-sm font-medium rounded-l-lg
            ${isActive 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-700 border border-gray-200'
            }
            flex items-center
          `}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Add Images
        </NavLink>
        <NavLink
          to="/files"
          className={({ isActive }) => `
            px-4 py-2 text-sm font-medium rounded-r-lg
            ${isActive 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-700 border border-gray-200 border-l-0'
            }
            flex items-center
          `}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          View Files
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;