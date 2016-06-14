const FeedContainer = () =>
  <main className="mdl-layout__content">
    <div className="page-content"></div>
  </main>;

FeedContainer.propTypes = {
  onSendNotification : React.PropTypes.func.isRequired,
  state              : React.PropTypes.object.isRequired
};

export default FeedContainer;
