import { Link } from 'react-router';

const Header = ({
  isLogged
}) =>
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
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          to="add-post"
        >
          <i className="material-icons">add</i>
        </Link>
        <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          to="/login"
          style={{
            display : isLogged ? 'none' : 'initial'
          }}
        >
          <i className="material-icons">account_circle</i>
        </Link>
      </nav>
    </div>
  </header>;

Header.propTypes = {
  isLogged : React.PropTypes.bool
};

export default Header;
