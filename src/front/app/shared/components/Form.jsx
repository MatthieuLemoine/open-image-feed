import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import { scaleImage } from '../../utils/imageResizer';

/**
 * Generic form component
 * @param title  : form's title
 * @param submit : function called on submit
 * @param submitLabel : submit button label
 * @param submitDisabled : boolean to disable submit button
 * @param inputs : array of form fields
 * @param secondLinkLabel : secondary button label
 * @param secondLinkTo : secondary button "to" attribute
 */
const Form = ({
  title,
  submit,
  submitLabel,
  submitDisabled,
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
          required={input.required}
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
    const reader  = new FileReader();
    const type    = files[0].type;
    preview.src   = files[0].preview;

    reader.addEventListener('load', () => {
      preview.src    = reader.result;
      preview.src    = scaleImage(preview, type);
      imageRef.image = preview.src;
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
        <div
          className="mdl-card__media"
          style={{
            display : imageRef.key ? 'initial' : 'none'
          }}
        >
          <img
            role="presentation"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAABAu4DAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGqQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAQABBQI9/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAwEBPwE9/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPwE9/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAQAGPwI9/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAQABPyE9/9oADAMBAAIAAwAAABCSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSST//xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/ED3/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/ED3/xAAUEAEAAAAAAAAAAAAAAAAAAABg/9oACAEBAAE/ED3/2Q=="
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
            disabled={!!submitDisabled}
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
  submitDisabled  : React.PropTypes.bool,
  secondLinkLabel : React.PropTypes.string,
  secondLinkTo    : React.PropTypes.string
};

export default Form;
