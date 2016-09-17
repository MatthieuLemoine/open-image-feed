import { connect } from 'react-redux';
import ChooseFeed from '../../components/app/ChooseFeed.js';
import { connectToFeed } from '../../actions/root/root';

export default connect(
  null,
  {
    connectToFeed
  }
)(ChooseFeed);
