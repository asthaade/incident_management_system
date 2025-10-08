import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '',
    pincode: '', city: '', country: '', password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.register(formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
          {/* Form Fields */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="name" type="text" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="email" type="email" name="email" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="phone" type="text" name="phone" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="address" type="text" name="address" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">Pincode</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="pincode" type="text" name="pincode" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="city" type="text" name="city" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3" id="country" type="text" name="country" onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3" id="password" type="password" name="password" onChange={handleChange} required />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" type="submit">
              Register
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;