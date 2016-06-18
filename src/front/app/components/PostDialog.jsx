let dialog;
const post = {};
const PostDialog = (props) =>
  <dialog
    className="mdl-dialog" ref={node => {
      dialog =  node;
    }}
  >
    <h4 className="mdl-dialog__title">Create a post</h4>
    <div className="mdl-dialog__content">
      <p>
        Allowing us to collect data will let us get you the information you want faster.
      </p>
    </div>
    <div className="mdl-dialog__actions">
      <button type="button" className="mdl-button" onClick={props.save(dialog, post)}>Add</button>
      <button type="button" className="mdl-button close" onClick={props.close()}>Close</button>
    </div>
  </dialog>;

PostDialog.propTypes = {
  close : React.PropTypes.func.isRequired,
  save  : React.PropTypes.func.isRequired
};

export default PostDialog;
