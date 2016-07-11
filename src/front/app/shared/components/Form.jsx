import { Link } from 'react-router';
import Dropzone from 'react-dropzone';

/**
 * Generic form component
 * @param title  : form's title
 * @param submit : function called on submit
 * @param submitLabel : submit button label
 * @param inputs : array of form fields
 * @param secondLinkLabel : secondary button label
 * @param secondLinkTo : secondary button "to" attribute
 */
const Form = ({
  title,
  submit,
  submitLabel,
  inputs,
  secondLinkLabel,
  secondLinkTo
}) => {
  const refs = [];
  const imageRef = {};
  const form = inputs.map((input) => {
    if (input.type === 'image') {
      imageRef.key = input.id;
      refs.push(imageRef);
      return (
        <div className="mdl-textfield mdl-js-textfield" key={input.id}>
          <Dropzone onDrop={onDrop} multiple={false}>
            <div>Drop your image here.</div>
          </Dropzone>
        </div>
      );
    }
    return (
      <div className="mdl-textfield mdl-js-textfield" key={input.id}>
        <input
          className="mdl-textfield__input"
          type={input.type}
          id={input.id}
          ref={node => {
            refs.push({
              key : input.id,
              node
            });
          }}
        />
        <label className="mdl-textfield__label" htmlFor={input.id}>{input.label}</label>
      </div>
    );
  });

  const secondLink = secondLinkLabel && secondLinkTo ?
    <Link
      className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
      to={secondLinkTo}
    >
      {secondLinkLabel}
    </Link>
    : null;

  // FIXME Image drop
  function onDrop(files) {
    const preview = document.querySelector('#preview');
    preview.src = files[0].preview;

    const reader  = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      imageRef.image = reader.result;
    }, false);

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  }

  return (
  <div className="form-container form-open">
    <div className="card mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">{title}</h2>
      </div>
      <div className="mdl-card__supporting-text">
        {form}
      </div>
      <div className="mdl-card__media">
        <img
          src={imageRef.image ? imageRef.image.preview : null}
          id="preview"
          style={{
            padding : '20px'
          }}
        />
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <a
          className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          onClick={(e) => {
            e.preventDefault();
            submit(refs.reduce((obj, ref) => {
              obj[ref.key] = ref.image || ref.node.value;
              return obj;
            }, {}));
          }}
        >
           {submitLabel}
        </a>
        {secondLink}
      </div>
    </div>
  </div>
  );
};

Form.propTypes = {
  submit          : React.PropTypes.func.isRequired,
  inputs          : React.PropTypes.array.isRequired,
  title           : React.PropTypes.string.isRequired,
  submitLabel     : React.PropTypes.string.isRequired,
  secondLinkLabel : React.PropTypes.string,
  secondLinkTo    : React.PropTypes.string
};

export default Form;
