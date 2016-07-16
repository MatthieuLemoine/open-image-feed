import Post from './Post.jsx';

const PostList = ({
  posts,
  like
}) =>
  <div className="feed-container">
  {
    posts.map((post) =>
      <Post post={post} key={post.id} onLikeClick={like} />)
  }
</div>;

PostList.propTypes = {
  posts : React.PropTypes.array.isRequired,
  like : React.PropTypes.func.isRequired
};

export default PostList;
