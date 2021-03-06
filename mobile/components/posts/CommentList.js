import React from 'react';
import { ListView } from 'react-native';
import Comment from './Comment';

const CommentList = ({
  comments
}) => {
  const ds = new ListView.DataSource({
    rowHasChanged : (a, b) => a.id !== b.id
  });
  const dataSource = ds.cloneWithRows(comments);
  return (
    <ListView
      enableEmptySections
      dataSource={dataSource}
      renderRow={(comment) =>
        <Comment
          comment={comment}
          key={comment.id}
        />
      }
    />
  );
};

CommentList.propTypes = {
  comments : React.PropTypes.array.isRequired
};

export default CommentList;
