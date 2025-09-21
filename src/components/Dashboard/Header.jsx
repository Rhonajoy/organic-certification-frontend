import { FaUserCircle } from "react-icons/fa";
import Icon from "../app/Icon";
import { useAuth } from "../context/AuthContext";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";


const Header = () => {
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign out error:", error));
  };

  const displayName = user?.displayName || user?.email || "Guest";

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-sm border-b border-gray-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Organic-Certified
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Agronomist Dashboard
        </p>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-full">
        <Icon as={FaUserCircle} />
        <span className="font-medium text-gray-700">{displayName}</span>

        <button
          onClick={handleSignOut}
          className="ml-2 text-sm text-red-500 hover:text-red-600 hover:underline"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
