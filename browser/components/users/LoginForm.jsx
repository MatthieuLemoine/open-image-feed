import Form from '../shared/Form.jsx';

const LoginForm = ({
  isFetching,
  login
}) =>
  <Form
    title="Login"
    submit={login}
    submitLabel="Sign in"
    submitDisabled={isFetching}
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
  isFetching : React.PropTypes.bool.isRequired,
  login : React.PropTypes.func.isRequired
};

export default LoginForm;
