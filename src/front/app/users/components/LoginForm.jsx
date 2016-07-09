import { Link } from 'react-router';

const LoginForm = ({
  login
}) => {
  let usernameInput;
  let passwordInput;
  return (
    <div className="form-container">
      <div className="card mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Login</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="username"
              ref={node => {
                usernameInput =  node;
              }}
            />
            <label className="mdl-textfield__label" htmlFor="username">Username</label>
          </div>
          <br />
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="password"
              id="password"
              ref={node => {
                passwordInput =  node;
              }}
            />
            <label className="mdl-textfield__label" htmlFor="password">Password</label>
          </div>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              login({
                username : usernameInput.value,
                password : passwordInput.value
              });
            }}
          >
            Login
          </a>
          <Link
            className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
            to="signup"
          >
            I do not have an account yet
          </Link>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login : React.PropTypes.func.isRequired
};

export default LoginForm;
