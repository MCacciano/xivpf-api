import useUser from '../../hooks/useUser';
import { SignUpForm } from '../../components/forms';
import { useRouter } from 'next/router';

export default function SignUpPage() {
  const { setToken } = useUser();
  const router = useRouter();

  const handleOnSubmit = async values => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const { token } = await res.json();

      setToken(token);

      router.push('/');
    } catch (err) {
      console.error(`Error: ${err}`);
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
        <SignUpForm onSubmit={handleOnSubmit} />
      </div>
    </div>
  );
}
