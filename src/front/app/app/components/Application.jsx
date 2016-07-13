import HeaderContainer from '../../header/containers/HeaderContainer';
import ToastContainer from '../../toast/containers/ToastContainer';

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
