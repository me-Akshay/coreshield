import { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const { user, login } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) return navigate('/login');
      
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        login(res.data);
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyAuth();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return children;
};

export default UserProtectWrapper;