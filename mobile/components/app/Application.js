import React from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { StatusBar } from 'react-native';
import FeedContainer from '../../containers/posts/FeedContainer';
import AddPostContainer from '../../containers/posts/AddPostContainer';
import LoginContainer from '../../containers/users/LoginContainer';
import SignupContainer from '../../containers/users/SignupContainer';
import SplashscreenContainer from '../../containers/app/SplashscreenContainer';
import ChooseFeedContainer from '../../containers/app/ChooseFeedContainer';
import TabIcon from '../../components/app/TabIcon';

const Application = ({
    store
  }) => {
  const RouterWithRedux = connect()(Router);
  StatusBar.setBackgroundColor('#3F51B5');
  return (
    <Provider store={store}>
      <RouterWithRedux>
        <Scene key="modal" component={Modal} >
          <Scene
            key="root"
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
