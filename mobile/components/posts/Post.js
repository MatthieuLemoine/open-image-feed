import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, IconToggle, Icon } from 'react-native-material-design';
import { PRIMARY } from '../../styles/material.js';
import { since } from '../../../common/utils/date';
import { API_URL } from '../../../common/utils/config.js';

const Post = ({
  post,
  like,
  toggleComments
}) =>
  <View>
    <Card>
      <Text>{post.title}</Text>
      <Card.Body>
        <Card.Media
          image={<Image source={{ uri : `${API_URL}${post.image}` }} />}
          overlay
        />
        <Text>{post.authorId} - {since(post.createdAt)}</Text>
      </Card.Body>
      <Card.Actions position="left">
        <IconToggle
          color={PRIMARY}
          onPress={(e) => {
            e.preventDefault();
            like(post.id);
          }}
          badge={{
            value : post.likes.length
          }}
        >
          <Icon
            color={PRIMARY}
            name={post.hasLiked ? 'favorite' : 'favorite-border'}
          />
        </IconToggle>
        <IconToggle
          color={PRIMARY}
          onPress={(e) => {
            e.preventDefault();
            toggleComments(post.id);
          }}
          badge={{
            value : post.comments.length
          }}
        >
          <Icon
            color={PRIMARY}
            name="comment"
          />
        </IconToggle>
      </Card.Actions>
    </Card>
  </View>;

Post.propTypes = {
  post             : React.PropTypes.object.isRequired,
  like             : React.PropTypes.func.isRequired,
  comment          : React.PropTypes.func.isRequired,
  toggleComments   : React.PropTypes.func.isRequired,
  isCommenting     : React.PropTypes.bool.isRequired,
  toggleAddComment : React.PropTypes.func.isRequired
};

export default Post;
