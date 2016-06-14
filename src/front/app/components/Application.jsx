import FeedContainer from '../containers/FeedContainer.jsx';
import Header from './Header.jsx';
import Drawer from './Drawer.jsx';

const Application = props =>
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <Drawer />
    <FeedContainer onSendNotification={props.onSendNotification} state={props.state} />
  </div>;

Application.propTypes = {
  onSendNotification : React.PropTypes.func.isRequired,
  state              : React.PropTypes.object.isRequired
};

export default Application;
