import { connect } from 'react-redux';
import Splashscreen from '../../components/app/Splashscreen';
import { loadInitialState } from '../../actions/root/root';
import { isAppLoaded, getFeedURL } from '../../reducers/app';
import withNavigationBar from '../../components/app/NavigationBar';

export default withNavigationBar(connect(
  state => ({
    loaded : isAppLoaded(state),
    feedURL : getFeedURL(state)
  }),
  {
    loadState : loadInitialState
  }
)(Splashscreen), true);
