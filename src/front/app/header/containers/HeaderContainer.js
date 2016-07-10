import Header from '../components/Header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isLogged } from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isLogged : isLogged(state)
  })
)(Header));
