import useUserContext from '../../hooks/useUserCtx';

import Form from '../Form';
import Button from '../Button';
import FormikField from '../FormikField';

const SignUpForm = () => {
  const { loginOrRegister, setUser } = useUserContext();

  const handleOnSubmit = async values => {
    try {
      const user = await loginOrRegister('/register', values);

      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const formClasses = `flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2`;
  const inputClasses = `border border-gray-500 rounded shadow p-1`;

  return (
    <Form
      label="Sign Up"
      className={formClasses}
      onSubmit={handleOnSubmit}
      initialValues={{ name: '', email: '', password: '' }}
    >
      <FormikField name="name" label="User Name" id="sign_up_name" className={inputClasses} />
      <FormikField
        type="email"
        name="email"
        label="Email"
        id="sign_up_email"
        className={inputClasses}
      />
      <FormikField
        type="password"
        name="password"
        label="Password"
        id="sign_up_password"
        className={inputClasses}
      />
      <Button type="submit" className="my-2">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
