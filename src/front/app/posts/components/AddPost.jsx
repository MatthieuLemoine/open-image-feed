import Form from '../../shared/components/Form.jsx';

// TODO Handle image
const AddPost = ({
  add
}) =>
  <Form
    title="Create a post"
    submit={add}
    submitLabel="Publish"
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
  add : React.PropTypes.func.isRequired
};

export default AddPost;
