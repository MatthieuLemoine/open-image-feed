import React from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import FeedContainer from '../../containers/posts/FeedContainer.js';
import AddPostContainer from '../../containers/posts/AddPostContainer.js';
import LoginContainer from '../../containers/users/LoginContainer.js';
import SignupContainer from '../../containers/users/SignupContainer.js';
import SplashscreenContainer from '../../containers/app/SplashscreenContainer.js';
import ChooseFeedContainer from '../../containers/app/ChooseFeedContainer.js';
import TabIcon from '../../components/app/TabIcon.js';

const Application = ({
    store
  }) => {
  const RouterWithRedux = connect()(Router);
  return (
    <Provider store={store}>
      <RouterWithRedux>
        <Scene key="modal" component={Modal} >
          <Scene
            key="root"
            hideNavBar
          >
            <Scene
              key="splashscreen"
              component={SplashscreenContainer}
              title="Splashscreen"
              initial
            />
            <Scene key="chooseFeed" component={ChooseFeedContainer} title="Choose feed" />
            <Scene key="feed" component={FeedContainer} title="Feed" icon={TabIcon} />
            <Scene key="addPost" component={AddPostContainer} title="New post" icon={TabIcon} />
            <Scene key="login" component={LoginContainer} title="Login" icon={TabIcon} />
            <Scene key="signup" component={SignupContainer} title="Signup" icon={TabIcon} />
          </Scene>
        </Scene>
      </RouterWithRedux>
    </Provider>
  );
};


Application.propTypes = {
  store : React.PropTypes.object.isRequired
};

export default Application;
