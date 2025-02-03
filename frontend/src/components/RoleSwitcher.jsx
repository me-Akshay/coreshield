import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const RoleSwitcher = () => {
  const { user, selectedRole, switchRole } = useContext(UserDataContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">Switch Role</h3>
      <div className="flex gap-2">
        {user?.roles.map(role => (
          <button
            key={role}
            onClick={() => switchRole(role)}
            className={`px-4 py-2 rounded ${
              selectedRole === role 
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;