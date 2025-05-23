
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex gap-6">
                    <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                        Upload Files
                    </Link>
                    <Link to="/files" className="text-white hover:text-gray-300 transition-colors">
                        Manage Files
                    </Link>
                </div>
            </div>
        </nav>
    )
}