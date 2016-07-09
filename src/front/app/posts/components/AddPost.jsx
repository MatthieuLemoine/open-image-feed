import { Link } from 'react-router';
// TODO Handle image
const AddPost = ({
  add
}) => {
  let titleInput;
  return (
    <div className="form-container">
      <div className="card mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Add a post</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="title"
              ref={node => {
                titleInput =  node;
              }}
            />
            <label className="mdl-textfield__label" htmlFor="title">Title</label>
          </div>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              add({
                title : titleInput.value
              });
            }}
          >
            Save
          </a>
          <Link
            className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
            to="/"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

AddPost.propTypes = {
  add : React.PropTypes.func.isRequired
};

export default AddPost;
