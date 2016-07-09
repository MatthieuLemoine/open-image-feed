import { Link } from 'react-router';

const LoginForm = ({
  login
}) => (
    <div className="form-container">
      <div className="card mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Login</h2>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              login('google');
            }}
          >
            Signin with Google
          </a>
          <a
            className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              login('github');
            }}
          >
            Signin with GitHub
          </a>
        </div>
      </div>
    </div>
  );

LoginForm.propTypes = {
  login : React.PropTypes.func.isRequired
};

export default LoginForm;
