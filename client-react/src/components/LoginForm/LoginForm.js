import useUserContext from '../../hooks/useUserCtx';

import Form from '../Form';
import Button from '../Button';
import FormikField from '../FormikField';

const LoginForm = () => {
  const { loginOrRegister, setUser } = useUserContext();

  const handleOnSubmit = async values => {
    try {
      const user = await loginOrRegister('/login', values);

      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const formClasses = `flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2`;
  const inputClasses = `border border-gray-500 rounded shadow p-1`;

  return (
    <Form
      label="Login"
      className={formClasses}
      onSubmit={handleOnSubmit}
      initialValues={{ email: '', password: '' }}
    >
      <FormikField
        type="email"
        label="Email"
        id="login_email"
        name="email"
        className={inputClasses}
      />
      <FormikField
        type="password"
        id="login_password"
        label="Password"
        name="password"
        className={inputClasses}
      />
      <Button type="submit" className="my-2">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
