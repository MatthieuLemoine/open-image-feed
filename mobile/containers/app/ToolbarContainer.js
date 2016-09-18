import Toolbar from '../../components/app/Toolbar.js';
import getHeaderContainer from '../../../common/containers/header/HeaderContainer.js';
import { isAppLoaded, hasFeedURL } from '../../reducers/app';

export default getHeaderContainer(Toolbar, null, isAppLoaded && hasFeedURL);
