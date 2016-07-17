import Comment from './Comment.jsx';

const CommentList = ({
  comments
}) =>
  <ul className="mdl-list">
  {
    comments.map((comment) =>
      <Comment
        comment={comment}
        key={comment.id}
      />
    )
  }
</ul>;

CommentList.propTypes = {
  comments : React.PropTypes.array.isRequired
};

export default CommentList;
