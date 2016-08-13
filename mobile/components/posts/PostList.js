import React from 'react';
import { ListView, StyleSheet } from 'react-native';
import PostContainer from '../../containers/posts/PostContainer';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

const styles = StyleSheet.create({
  container : {
    flex            : 1,
    backgroundColor : 'transparent',
    marginTop : 60
  }
});


const PostList = ({
  posts,
  loadMore,
  hasMore
}) => {
  const ds = new ListView.DataSource({
    rowHasChanged : (a, b) => a.id !== b.id
  });
  const dataSource = ds.cloneWithRows(posts);
  return (
    <ListView
      enableEmptySections
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      dataSource={dataSource}
      renderRow={(post) =>
        <PostContainer
          post={post}
          key={post.id}
        />
      }
      style={styles.container}
      canLoadMore={hasMore}
      onLoadMoreAsync={loadMore}
    />
  );
};

PostList.propTypes = {
  posts    : React.PropTypes.array.isRequired,
  loadMore : React.PropTypes.func.isRequired,
  hasMore  : React.PropTypes.bool.isRequired
};

export default PostList;
