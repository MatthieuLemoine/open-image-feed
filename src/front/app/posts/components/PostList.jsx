import PostContainer from '../containers/PostContainer';

const PostList = ({
  posts
}) =>
  <div className="feed-container">
  {
    posts.map((post) =>
      <PostContainer
        post={post}
        key={post.id}
      />
    )
  }
</div>;

PostList.propTypes = {
  posts          : React.PropTypes.array.isRequired
};

export default PostList;
