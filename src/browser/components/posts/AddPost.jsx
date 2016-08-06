import Form from '../shared/Form.jsx';

// TODO Handle image
const AddPost = ({
  add,
  isPersisting
}) =>
  <Form
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
    secondLinkTo="/"
  />;

AddPost.propTypes = {
  add : React.PropTypes.func.isRequired,
  isPersisting : React.PropTypes.bool.isRequired
};

export default AddPost;
