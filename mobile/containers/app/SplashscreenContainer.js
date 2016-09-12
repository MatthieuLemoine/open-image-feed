import { connect } from 'react-redux';
import Splashscreen from '../../components/app/Splashscreen.js';
import { loadInitialState } from '../../actions/root/root';

import { Actions } from 'react-native-router-flux';

export default connect(
  state => ({
    loaded : state.root.loaded
  }),
  {
    redirect    : () => Actions.feed(),
    loadState : loadInitialState
  }
)(Splashscreen);
