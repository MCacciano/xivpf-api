import { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import { LoginForm } from '../../components/forms';

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const { token } = await res.json();

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data: userDetails } = await userRes.json();

      setToken(token);
      setUser(userDetails);

      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-0 w-full">
      <div className="relative flex justify-center items-center min-h-screen">
        <img
          src="/images/endwalker-1.jpg"
          className="absolute w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <LoginForm
          formData={formData}
          onSubmit={handleOnSubmit}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}
