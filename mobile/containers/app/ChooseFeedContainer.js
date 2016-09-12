import { connect } from 'react-redux';
import ChooseFeed from '../../components/app/ChooseFeed.js';

export default connect(
  state => ({
    feedURL : state.root.feedURL
  })
)(ChooseFeed);
