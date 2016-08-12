import Form from '../shared/Form.jsx';

const SignupForm = ({
  isFetching,
  signup
}) =>
  <Form
    title="Sign Up"
    submit={signup}
    submitLabel="Join"
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
    secondLinkLabel="I already have an account"
    secondLinkTo="/login"
  />;

SignupForm.propTypes = {
  isFetching : React.PropTypes.bool.isRequired,
  signup     : React.PropTypes.func.isRequired
};

export default SignupForm;
