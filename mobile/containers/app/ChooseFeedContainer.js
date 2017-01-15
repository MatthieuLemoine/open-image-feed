import { connect } from 'react-redux';
import ChooseFeed from '../../components/app/ChooseFeed';
import { connectToFeed } from '../../actions/root/root';
import withNavigationBar from '../../components/app/NavigationBar';

export default withNavigationBar(connect(
  null,
  {
    connectToFeed
  }
)(ChooseFeed));
