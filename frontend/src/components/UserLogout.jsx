import { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const { logout } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } finally {
        logout();
        navigate('/login');
      }
    };
    
    performLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default UserLogout;