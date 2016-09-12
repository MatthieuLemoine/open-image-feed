import { connect } from 'react-redux';
import Splashscreen from '../../components/app/Splashscreen.js';
import { loadInitialState } from '../../actions/root/root';

export default connect(
  state => ({
    loaded : state.root.loaded
  }),
  {
    loadState : loadInitialState
  }
)(Splashscreen);
