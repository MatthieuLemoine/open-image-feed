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
        id    : 'title',
        type  : 'text',
        label : 'Title'
      },
      {
        id    : 'image',
        type  : 'image',
        label : 'Image'
      }
    ]}
    secondLinkLabel="Cancel"
    secondLinkTo="/"
  />;

AddPost.propTypes = {
  add : React.PropTypes.func.isRequired
};

export default AddPost;
