
import HeaderContainer from '../../header/containers/HeaderContainer';
import Drawer from '../../drawer/components/Drawer.jsx';

const Application = ({ children }) =>
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <HeaderContainer />
    <Drawer />
    <main className="mdl-layout__content">
      <div className="page-content">
        { children }
      </div>
    </main>
  </div>;

export default Application;
