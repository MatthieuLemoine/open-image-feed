import NotificationForm from '../components/NotificationForm.jsx';

const HomeContainer = props =>
    <div className="home-container">
      <div className="jumbotron">
        <h1>Push Server</h1>
      </div>
      <div className="well">
        <h2>Send a notification</h2>
        <NotificationForm
          onSubmit={props.onSendNotification}
          users={props.state.userReducer.users.items}
          success={props.state.pushReducer.notification.success}
          error={props.state.pushReducer.notification.error}
        />
      </div>
    </div>;

HomeContainer.propTypes = {
  onSendNotification : React.PropTypes.func.isRequired,
  state              : React.PropTypes.object.isRequired
};

export default HomeContainer;
