import { connect } from 'react-redux';
import ChooseFeed from '../../components/app/ChooseFeed.js';
import { connectToFeed } from '../../actions/root/root';
import withNavigationBar from '../../components/app/NavigationBar.js';

export default withNavigationBar(connect(
  null,
  {
    connectToFeed
  }
)(ChooseFeed));
