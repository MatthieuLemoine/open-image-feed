import React from 'react';
import { View, Text } from 'react-native';
import { since } from '../../../common/utils/date';
import { Icon } from 'react-native-material-design';

const Comment = ({
  comment
}) =>
  <View>
    <Icon name="person" />
    <Text>{comment.authorId}</Text>
    <Text>{comment.content}</Text>
    <Text>{since(comment.createdAt)}</Text>
  </View>;

Comment.propTypes = {
  comment : React.PropTypes.object.isRequired
};

export default Comment;
