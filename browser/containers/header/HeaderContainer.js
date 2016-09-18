import Header from '../../components/header/Header.jsx';
import { withRouter } from 'react-router';
import getHeaderContainer from '../../../common/containers/header/HeaderContainer.js';

export default getHeaderContainer(Header, withRouter);
