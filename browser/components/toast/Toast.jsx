const Toast = ({
  id
}) =>
  <div id={id} className="mdl-snackbar mdl-js-snackbar" >
    <div className="mdl-snackbar__text"></div>
    <button className="mdl-snackbar__action" type="button"></button>
  </div>;

Toast.propTypes = {
  id : React.PropTypes.string
};

export default Toast;
