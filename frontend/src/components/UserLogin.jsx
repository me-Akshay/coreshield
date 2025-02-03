import { useNavigate,Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext'
import axios from 'axios';
import { useContext,useState } from 'react';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      });

      if (res.status === 200) {
        login(res.data.user);
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-3xl font-bold text-gray-900">Sign in</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/register" className="text-blue-600 hover:text-blue-500">
          Sign up
        </Link>
      </div>
    </div>
  </div>



  );
};

export default UserLogin