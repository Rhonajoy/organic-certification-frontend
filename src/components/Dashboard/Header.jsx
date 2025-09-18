import { FaUserCircle } from 'react-icons/fa'; 

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
                Agri-Certify: Agronomist Dashboard
            </h1>
            <div className="flex items-center space-x-2 text-gray-700">
                <FaUserCircle className="text-xl" />
                <span className="font-medium">Agronomist Alex</span>
            </div>
        </header>
    );
};

export default Header;