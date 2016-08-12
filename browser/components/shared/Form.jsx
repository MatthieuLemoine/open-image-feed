import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import { scaleImage } from '../../../common/utils/imageResizer';
import { Component } from 'react';
import { placeholderImage } from '../../../common/constants/stock';

// Generic Form component
class Form extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }
  render() {
    const {
      title,
      submit,
      submitLabel,
      submitDisabled,
      inputs,
      secondLinkLabel,
      secondLinkTo,
      notACard,
      hideTitle
    } = this.props;
    const refs = [];
    // Only support one image input for now
    const imageRef = {};
    // Render inputs
    const form = inputs.map((input) => {
      if (input.type === 'image') {
        imageRef.key = input.id;
        refs.push(imageRef);
        // Image Drag&Drop
        return (
          <div className="mdl-textfield mdl-js-textfield" key={input.id}>
            <Dropzone onDrop={onDrop} multiple={false}>
              <div>Drop your image here.</div>
            </Dropzone>
          </div>
        );
      }
      // Text input
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

    // Second button such as a cancel button
    const secondLink = secondLinkLabel && secondLinkTo ?
      <Link
        className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
        to={secondLinkTo}
      >
        {secondLinkLabel}
      </Link>
      : null;

    // On image drop
    // Load image in preview & scale it down to 750px width
    function onDrop(files) {
      const preview  = document.querySelector('#preview');
      const reader   = new FileReader();
      const type     = files[0].type;
      preview.src    = files[0].preview;
      imageRef.image = files[0];

      reader.addEventListener('load', () => {
        if (type === 'image/gif') {
          refs.push({
            key : 'imageHeight',
            node : {
              value : preview.height
            }
          });
          refs.push({
            key : 'imageWidth',
            node : {
              value : preview.width
            }
          });
        } else {
          preview.src    = reader.result;
          scaleImage(blob => {
            const url = URL.createObjectURL(blob);
            preview.src = url;
            imageRef.image = blob;
            refs.push({
              key : 'imageHeight',
              node : {
                value : preview.height
              }
            });
            refs.push({
              key : 'imageWidth',
              node : {
                value : preview.width
              }
            });
          }, preview, type);
        }
      }, false);

      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    }

    // Render form
    return (
      <form
        action="#"
        className={
          notACard ? '' : 'form-container form-open'
        }
      >
        <div
          className={
            notACard ? '' : 'card mdl-card mdl-shadow--2dp'
          }
        >
          <div
            className="mdl-card__title"
            style={{
              display : hideTitle ? 'none' : 'block'
            }}
          >
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
              src={placeholderImage}
              id="preview"
              style={{
                padding : '20px'
              }}
            />
          </div>
          <div
            className={
              notACard ? '' : 'mdl-card__actions mdl-card--border'
            }
          >
            <button
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
            </button>
            {secondLink}
          </div>
        </div>
      </form>
    );
  }
}

/**
 * Generic form component
 * @param title  : form's title
 * @param submit : function called on submit
 * @param submitLabel : submit button label
 * @param submitDisabled : boolean to disable submit button
 * @param inputs : array of form fields
 * @param secondLinkLabel : secondary button label
 * @param secondLinkTo : secondary button "to" attribute
 * @param notACard : if set remove all card related styling
 * @param hideTitle : if set does not display form's title
 */
Form.propTypes = {
  submit          : React.PropTypes.func.isRequired,
  inputs          : React.PropTypes.array.isRequired,
  title           : React.PropTypes.string.isRequired,
  submitLabel     : React.PropTypes.string.isRequired,
  submitDisabled  : React.PropTypes.bool,
  secondLinkLabel : React.PropTypes.string,
  secondLinkTo    : React.PropTypes.string,
  notACard        : React.PropTypes.bool,
  hideTitle       : React.PropTypes.bool
};

export default Form;
