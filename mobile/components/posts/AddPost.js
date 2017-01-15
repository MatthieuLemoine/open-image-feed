import React from 'react';
import Form from '../app/Form';
import styles from '../../styles/styles';

const AddPost = ({
  add,
  isPersisting
}) =>
  <Form
    style={styles.container}
    title="Create a post"
    submit={add}
    submitLabel="Publish"
    submitDisabled={isPersisting}
    inputs={[
      {
        id       : 'title',
        type     : 'text',
        label    : 'Title',
        required : true
      },
      {
        id       : 'image',
        type     : 'image',
        label    : 'Image',
        required : true
      }
    ]}
    secondLinkLabel="Cancel"
    secondLinkTo="feed"
  />;

AddPost.propTypes = {
  add : React.PropTypes.func.isRequired,
  isPersisting : React.PropTypes.bool.isRequired
};

export default AddPost;
