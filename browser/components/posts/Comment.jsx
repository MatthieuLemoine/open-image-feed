import { since } from '../../../common/utils/date';

const Comment = ({
  comment
}) =>
  <li className="mdl-list__item mdl-list__item--three-line">
    <span className="mdl-list__item-primary-content">
      <i className="material-icons mdl-list__item-avatar">person</i>
      <span>{comment.authorId}</span>
      <span className="mdl-list__item-text-body">
        {comment.content}
      </span>
    </span>
    <span className="mdl-list__item-secondary-content comment-secondary">
      <span>{since(comment.createdAt)}</span>
    </span>
  </li>;

Comment.propTypes = {
  comment : React.PropTypes.object.isRequired
};

export default Comment;
