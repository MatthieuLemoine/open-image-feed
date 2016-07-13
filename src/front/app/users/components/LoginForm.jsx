import Form from '../../shared/components/Form.jsx';

const LoginForm = ({
  login
}) =>
  <Form
    title="Login"
    submit={login}
    submitLabel="Sign in"
    inputs={[
      {
        id       : 'username',
        type     : 'text',
        label    : 'Username',
        required : true
      },
      {
        id       : 'password',
        type     : 'password',
        label    : 'Password',
        required : true
      }
    ]}
    secondLinkLabel="I do not have an account"
    secondLinkTo="/signup"
  />;

LoginForm.propTypes = {
  login : React.PropTypes.func.isRequired
};

export default LoginForm;
