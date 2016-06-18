import Card from '../components/Card.jsx';

const FeedContainer = (props) =>
  <main className="mdl-layout__content">
    <div className="page-content">
      <div className="feed-container">
      {
        props.cards.map((card) => <Card card={card} />)
      }
      </div>
    </div>
  </main>;

FeedContainer.propTypes = {
  cards              : React.PropTypes.array.isRequired
};

export default FeedContainer;
