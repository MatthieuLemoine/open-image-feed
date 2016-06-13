import HomeContainer from '../containers/HomeContainer.jsx';

const Application = props =>
  <HomeContainer onSendNotification={props.onSendNotification} state={props.state} />;

Application.propTypes = {
  onSendNotification : React.PropTypes.func.isRequired,
  state              : React.PropTypes.object.isRequired
};

export default Application;
