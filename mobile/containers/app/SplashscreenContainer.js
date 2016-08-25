import { connect } from 'react-redux';
import Splashscreen from '../../components/app/Splashscreen.js';

import { Actions } from 'react-native-router-flux';

export default connect(
  state => ({
    loaded : state.asyncInitialState.loaded
  }),
  {
    redirect : () => Actions.feed()
  }
)(Splashscreen);
