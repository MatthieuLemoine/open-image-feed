import Form from '../../shared/components/Form.jsx';

const SignupForm = ({
  signup
}) =>
  <Form
    title="Sign Up"
    submit={signup}
    submitLabel="Join"
    inputs={[
      {
        id    : 'username',
        type  : 'text',
        label : 'Username'
      },
      {
        id    : 'password',
        type  : 'password',
        label : 'Password'
      }
    ]}
    secondLinkLabel="I already have an account"
    secondLinkTo="/login"
  />;

SignupForm.propTypes = {
  signup : React.PropTypes.func.isRequired
};

export default SignupForm;
