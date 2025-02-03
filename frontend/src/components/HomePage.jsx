import { UserDataContext } from '../context/UserContext';
import RoleSwitcher from '../components/RoleSwitcher';
import AdminDashboard from '../components/AdminDashboard';
import EditorDashboard from '../components/EditorDashboard';
import ViewerDashboard from '../components/ViewerDashboard';
import { useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const HomePage = () => {
  const { user, selectedRole, logout } = useContext(UserDataContext);
  const navigate = useNavigate();


  const renderDashboard = () => {
    switch(selectedRole) {
      case 'admin': return <AdminDashboard />;
      case 'editor': return <EditorDashboard />;
      case 'viewer': return <ViewerDashboard />;
      default: return null;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Welcome, {user?.fullname.firstname}</h1>
            <p className="text-sm text-gray-600">Roles: {user?.roles.join(', ')}</p>
          </div>
          {/* <button
            onClick={ navigate('/logout')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button> */}
          <Link to="/logout" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"  >
            Logout
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <RoleSwitcher />
        {renderDashboard()}
      </div>
    </div>
  );
};


export default HomePage