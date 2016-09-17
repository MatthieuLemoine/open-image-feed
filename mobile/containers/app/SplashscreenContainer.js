import { connect } from 'react-redux';
import Splashscreen from '../../components/app/Splashscreen.js';
import { loadInitialState } from '../../actions/root/root';
import { isAppLoaded, getFeedURL } from '../../reducers/app';

export default connect(
  state => ({
    loaded : isAppLoaded(state),
    feedURL : getFeedURL(state)
  }),
  {
    loadState : loadInitialState
  }
)(Splashscreen);
