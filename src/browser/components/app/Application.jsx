import HeaderContainer from '../../containers/header/HeaderContainer';
import ToastContainer from '../../containers/toast/ToastContainer';

const Application = ({ children }) =>
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <HeaderContainer />
    <main className="mdl-layout__content">
      <div className="page-content">
        {children}
      </div>
    </main>
    <ToastContainer />
  </div>;

Application.propTypes = {
  children : React.PropTypes.any
};

export default Application;
