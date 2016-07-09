import Header from '../components/Header.jsx';
import { connect } from 'react-redux';

export default connect(
  state => ({
    isLogged : state.user.isLogged
  })
)(Header);
