import { useState } from 'react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleOnChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.log(formData);
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
              <span className="text-sm font-medium">Name</span>
              <input
                className="border border-gray-400 p-1 rounded"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
              />
            </label>
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
            <label className="flex flex-col">
              <span className="text-sm font-medium">Confirm Password</span>
              <input
                className="border border-gray-400 p-1 rounded"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
              />
            </label>
            <button
              type="submit"
              className="h-full w-full border border-blue-600 text-blue-600 font-semibold text-sm py-1 px-2 rounded shadow hover:bg-blue-600 hover:text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
