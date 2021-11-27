import { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';

const API_URL = 'http://localhost:5000/api/v1';

export default function LoginPage() {
  const { setUser, setToken } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      console.error('Please enter email and password');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const { token } = await res.json();

      const userRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { data: userDetails } = await userRes.json();

      setToken(token);
      setUser(userDetails);

      router.push('/');
    } catch (err) {
      console.error(err);
      0;
    }
  };

  return (
    <div className="absolute top-0 w-full">
      <div className="relative flex justify-center items-center min-h-screen">
        <img src="/images/endwalker-1.jpg" className="absolute w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <div className="flex flex-col space-y-5 border border-black bg-white rounded shadow z-20 p-5">
          <h1 className="text-2xl text-blue-600">Welcome to LFGPF</h1>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Email</span>
              <input
                className="border border-gray-400 p-1 rounded"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Password</span>
              <input
                className="border border-gray-400 p-1 rounded"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
              />
            </label>
            <button
              type="submit"
              className="h-full w-full border border-blue-600 text-blue-600 font-semibold text-sm py-1 px-2 rounded shadow hover:bg-blue-600 hover:text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
