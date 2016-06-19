import FeedContainer from '../containers/FeedContainer.jsx';
import Header from './Header.jsx';
import Drawer from './Drawer.jsx';
import PostDialog from './PostDialog.jsx';

const Application = (props) =>
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header open={props.open} />
    <Drawer />
    <FeedContainer
      cards={props.posts}
    />
  <PostDialog close={props.close} save={props.addPost} registerDialog={props.registerDialog} />
  </div>;

Application.propTypes = {
  open           : React.PropTypes.func.isRequired,
  close          : React.PropTypes.func.isRequired,
  addPost        : React.PropTypes.func.isRequired,
  posts          : React.PropTypes.array.isRequired,
  registerDialog : React.PropTypes.func.isRequired
};

export default Application;
