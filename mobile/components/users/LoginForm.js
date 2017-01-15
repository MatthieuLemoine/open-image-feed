import React from 'react';
import Form from '../app/Form';
import styles from '../../styles/styles';

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
    secondLinkTo="signup"
    style={styles.container}
  />;

LoginForm.propTypes = {
  isFetching : React.PropTypes.bool.isRequired,
  login : React.PropTypes.func.isRequired
};

export default LoginForm;
