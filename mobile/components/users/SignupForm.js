import React from 'react';
import Form from '../app/Form.js';
import styles from '../../styles/styles.js';


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
    secondLinkTo="login"
    style={styles.container}
  />;

SignupForm.propTypes = {
  isFetching : React.PropTypes.bool.isRequired,
  signup     : React.PropTypes.func.isRequired
};

export default SignupForm;
