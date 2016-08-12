import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import CommentList from './CommentList.jsx';
import Form from '../shared/Form.jsx';
import { since } from '../../../common/utils/date';

class Post extends Component {
  componentWillMount() {
    // Compute post width
    this.postWidth = window.innerWidth * 0.8;
    this.postWidth = Math.ceil(this.postWidth > 750 ? 750 : this.postWidth);
  }
  componentWillUpdate() {
    // Update post width
    const node     = findDOMNode(this);
    this.postWidth = node.clientWidth;
  }
  render() {
    // Props
    const post             = this.props.post;
    const width            = this.postWidth;
    const like             = this.props.like;
    const comment          = this.props.comment;
    const toggleComments   = this.props.toggleComments;
    const isCommenting     = this.props.isCommenting;
    const toggleAddComment = this.props.toggleAddComment;

    // Compute image height
    let height;
    const nativeHeight = post.imageHeight;
    const nativeWidth  = post.imageWidth;
    if (nativeHeight && nativeWidth && width) {
      const nativeRatio = nativeHeight / nativeWidth;
      height = Math.ceil(nativeRatio * width);
      height += 'px';
    }

    // Render
    return (
      <div className="card mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{post.title}</h2>
        </div>
        <div className="mdl-card__media">
          <img
            src={post.image}
            alt="loading..."
            style={{
              padding : '20px',
              height : height || 'initial'
            }}
          />
        </div>
        <div className="mdl-card__supporting-text">
          {post.authorId} - {since(post.createdAt)}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a
            id={`like-${post.id}`}
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              like(post.id);
            }}
          >
            <i className="material-icons">{post.hasLiked ? 'favorite' : 'favorite_border'}</i>
            <span className="post-counts">{post.likes.length}</span>
          </a>
          <div className="mdl-tooltip" htmlFor={`like-${post.id}`}>Like</div>
          <a
            id={`toggle-comments-${post.id}`}
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={(e) => {
              e.preventDefault();
              toggleComments(post.id);
            }}
          >
            <i className="material-icons">comment</i>
            <span className="post-counts">{post.comments.length}</span>
          </a>
          <div className="mdl-tooltip" htmlFor={`toggle-comments-${post.id}`}>Toggle comments</div>
        </div>
        <div
          className="comment-list"
          style={{
            display : post.displayComments ? 'block' : 'none'
          }}
        >
          <div className="mdl-grid">
            <div className="mdl-layout-spacer"></div>
            <button
              id={`comment-${post.id}`}
              className="mdl-button mdl-js-button mdl-button--fab
                mdl-js-ripple-effect mdl-button--mini-fab mdl-button--colored"
              onClick={(e) => {
                e.preventDefault();
                toggleAddComment(post.id);
              }}
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <div className="mdl-tooltip" htmlFor={`comment-${post.id}`}>Comment</div>
          <div
            className="comment-add-form"
            style={{
              display : post.displayAddComment ? 'block' : 'none'
            }}
          >
            <Form
              title="Add a comment"
              submit={newComment => {
                newComment.postId = post.id;
                comment(newComment);
              }}
              submitLabel="Save"
              submitDisabled={isCommenting}
              inputs={[
                {
                  id       : 'content',
                  type     : 'text',
                  label    : 'Comment',
                  required : true
                }
              ]}
              notACard
              hideTitle
            />
          </div>
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post             : React.PropTypes.object.isRequired,
  like             : React.PropTypes.func.isRequired,
  comment          : React.PropTypes.func.isRequired,
  toggleComments   : React.PropTypes.func.isRequired,
  isCommenting     : React.PropTypes.bool.isRequired,
  toggleAddComment : React.PropTypes.func.isRequired
};

export default Post;
