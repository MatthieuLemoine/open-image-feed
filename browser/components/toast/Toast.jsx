const Toast = ({
  id
}) =>
  <div id={id} className="mdl-snackbar mdl-js-snackbar" >
    <div className="mdl-snackbar__text" />
    <button className="mdl-snackbar__action" type="button" />
  </div>;

Toast.propTypes = {
  id : React.PropTypes.string
};

export default Toast;
