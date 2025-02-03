import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  // Separate states for each form field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(`${base}/users/register`, {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email,
        password,
        roles
      });

      if (response.status === 201) {
        setUser(response.data.newUser);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRoles([]);
  };

  const handleRoleChange = (role) => {
    setRoles(prevRoles => 
      prevRoles.includes(role)
        ? prevRoles.filter(r => r !== role)
        : [...prevRoles, role]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          {/* <img 
            className="w-20 mx-auto mb-4"
            src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-online-taxi-booking-travel-service-flat-design-illustration-via-mobile-app-png-image_4750926.png" 
            alt="Logo"
          /> */}
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              required
              className="w-full p-2 border rounded"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            required
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block font-medium">Select Roles:</label>
            <div className="grid grid-cols-3 gap-2">
              {['admin', 'editor', 'viewer'].map(role => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={roles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                    className="rounded"
                  />
                  <span className="capitalize">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-xs text-gray-500 mt-6 text-center">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;