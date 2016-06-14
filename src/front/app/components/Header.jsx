const Header = () =>
    <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Open Image Feed</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="">
                  <i className="material-icons">plus</i>
              </a>
              <a className="mdl-navigation__link" href="">
                  <i className="material-icons">account</i>
              </a>
            </nav>
        </div>
    </header>;

Header.propTypes = {};

export default Header;
