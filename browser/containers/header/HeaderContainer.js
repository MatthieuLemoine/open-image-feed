import { withRouter } from 'react-router';
import Header from '../../components/header/Header.jsx';
import getHeaderContainer from '../../../common/containers/header/HeaderContainer';

export default getHeaderContainer(Header, withRouter);
