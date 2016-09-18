import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, IconToggle, Icon } from 'react-native-material-design';
import { PRIMARY, SECONDARY } from '../../styles/material.js';
import { since } from '../../../common/utils/date';
import CommentList from './CommentList.js';
// eslint-disable-next-line import/no-unresolved
import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
  title : {
    marginTop    : 4,
    marginBottom : -10,
    color        : '#000000',
    fontSize     : 18,
    fontWeight   : '300'
  },
  author : {
    color        : 'rgba(0, 0, 0, 0.54)',
    fontSize     : 11,
    fontWeight   : '400',
    marginTop    : 8,
    marginLeft   : -4,
    marginBottom : -5
  },
  actions : {
    borderTopColor : 'rgba(0, 0, 0, 0.1)',
    borderStyle    : 'solid',
    borderTopWidth : 1,
    marginLeft     : -16,
    marginRight    : -16,
    marginBottom   : 5
  },
  spacer : {
    width : 15
  }
});

class Post extends Component {
  componentWillMount() {
    // Compute post width
    const windowWidth = Dimensions.get('window').width;
    this.postWidth = windowWidth - 16;
    this.postWidth = Math.ceil(this.postWidth > 750 ? 750 : this.postWidth);
  }
  render() {
    // Props
    const post             = this.props.post;
    const width            = this.postWidth;
    const like             = this.props.like;
    // const comment          = this.props.comment;
    const toggleComments   = this.props.toggleComments;
    // const isCommenting     = this.props.isCommenting;
    const toggleAddComment = this.props.toggleAddComment;
    // Compute image height
    let height;
    const nativeHeight = post.imageHeight;
    const nativeWidth  = post.imageWidth;
    if (nativeHeight && nativeWidth && width) {
      const nativeRatio = nativeHeight / nativeWidth;
      height = Math.ceil(nativeRatio * width);
    }
    const styleCommentList = StyleSheet.create({
      commentList : {
        height : post.displayComments ? undefined : 0,
        opacity : post.displayComments ? 1 : 0
      }
    });
    return (
      <View>
        <Card>
          <Text
            style={styles.title}
          >
            {post.title}
          </Text>
          <Card.Body>
            <Card.Media
              height={height}
              image={
                <Image
                  onLayout={(event) => {
                    this.postWidth = event.nativeEvent.layout.width;
                  }}
                  source={{ uri : post.image }}
                  resizeMode="stretch"
                />
              }
              overlay
            />
            <Text
              style={styles.author}
            >
              {post.authorId} - {since(post.createdAt)}
            </Text>
          </Card.Body>
          <View style={styles.actions} />
          <Card.Actions
            position="left"
          >
            <View style={styles.spacer} />
            <IconToggle
              color={PRIMARY}
              onPress={() => {
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
            <View style={styles.spacer} />
            <IconToggle
              color={PRIMARY}
              onPress={() => {
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
          <View
            style={styleCommentList.commentList}
          >
            <IconToggle
              color={SECONDARY}
              onPress={() => {
                toggleAddComment(post.id);
              }}
            >
              <Icon
                color={SECONDARY}
                name="add"
              />
            </IconToggle>
            <CommentList comments={post.comments} />
          </View>
        </Card>
      </View>
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
