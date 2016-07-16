const Post = ({
  post,
  onLikeClick
}) =>
  <div className="card mdl-card mdl-shadow--2dp">
    <div className="mdl-card__title">
      <h2 className="mdl-card__title-text">{post.title}</h2>
    </div>
    <div className="mdl-card__media">
      <img
        src={post.image}
        alt="stock"
        style={{
          padding : '20px'
        }}
      />
    </div>
    <div className="mdl-card__supporting-text">
      {post.authorId}
    </div>
    <div className="mdl-card__actions mdl-card--border">
      <a
        className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        onClick={(e) => {
          e.preventDefault();
          onLikeClick(post.id);
        }}
      >
        <i className="material-icons">{ post.hasLiked ? 'favorite' : 'favorite_border' }</i>
      </a>
      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        <i className="material-icons">comment</i>
      </a>
    </div>
  </div>;

Post.propTypes = {
  post        : React.PropTypes.object.isRequired,
  onLikeClick : React.PropTypes.func.isRequired
};

export default Post;
