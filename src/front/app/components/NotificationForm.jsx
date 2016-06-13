class NotificationForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    this.props.onSubmit({
      title   : this.titleInput.value,
      message : this.messageInput.value,
      target  : [].filter.call(this.targetSelect.options,
        option => option.selected
      ).map(option => option.value)
    });
  }
  render() {
    let alert = <div></div>;
    if (this.props.success) {
      alert = <div className="alert alert-success" role="alert">Notification send</div>;
    } else if (this.props.error) {
      alert = <div className="alert alert-danger" role="alert">An error occured</div>;
    }
    return (
      <form name="message-form" onSubmit={this.submit}>
        { alert }
        <div className="form-group">
          <label htmlFor="notification-title">Title</label>
          <input id="notification-title" ref={node => {
            this.titleInput =  node;
          }} name="notification-title" type="text" required className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notification-message">Message</label>
          <input id="notification-message" ref={node => {
            this.messageInput =  node;
          }} name="notification-message" type="text" required className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notification-target">Recipients</label>
          <select id="notification-target" ref={node => {
            this.targetSelect =  node;
          }} multiple name="notification-target" className="form-control" required
          >
            {
              this.props.users.map(user =>
                <option key={user._id} value={user._id}>{user.email}</option>
              )
            }
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    );
  }
}

NotificationForm.propTypes = {
  onSubmit : React.PropTypes.func.isRequired,
  users    : React.PropTypes.array.isRequired,
  success  : React.PropTypes.bool,
  error    : React.PropTypes.object
};

export default NotificationForm;
