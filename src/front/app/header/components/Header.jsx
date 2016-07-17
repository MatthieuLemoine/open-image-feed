import { Link } from 'react-router';

const Header = ({
  isLogged,
  isFetching
}) =>
  <div>
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
          <Link className="mdl-js-button mdl-js-ripple-effect" to="/">
            Open Image Feed
          </Link>
        </span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation">
          <Link
            id="add-post"
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
            to="add-post"
          >
            <i className="material-icons">add</i>
          </Link>
          <div className="mdl-tooltip" htmlFor="add-post">New post</div>
          <Link
            id="login"
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
            to="/login"
            style={{
              display : isLogged ? 'none' : 'initial'
            }}
          >
            <i className="material-icons">account_circle</i>
          </Link>
          <div className="mdl-tooltip" htmlFor="login">Login</div>
        </nav>
      </div>
    </header>
    <div
      style={{
        display : isFetching ? 'block' : 'none'
      }}
      className="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-indicator"
    ></div>
  </div>;

Header.propTypes = {
  isLogged : React.PropTypes.bool.isRequired,
  isFetching : React.PropTypes.bool.isRequired
};

export default Header;
