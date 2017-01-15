import Toolbar from '../../components/app/Toolbar';
import getHeaderContainer from '../../../common/containers/header/HeaderContainer';
import { isAppLoaded, hasFeedURL } from '../../reducers/app';

export default getHeaderContainer(Toolbar, null, isAppLoaded && hasFeedURL);
