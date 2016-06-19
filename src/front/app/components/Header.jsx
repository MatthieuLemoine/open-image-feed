const Header = (props) =>
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Open Image Feed</span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          onClick={props.open}
        >
          <i className="material-icons">add</i>
        </button>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
          <i className="material-icons">account_circle</i>
        </button>
      </nav>
    </div>
  </header>;

Header.propTypes = {
  open : React.PropTypes.func.isRequired
};

export default Header;
