import React from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import FeedContainer from '../../containers/posts/FeedContainer.js';
import AddPostContainer from '../../containers/posts/AddPostContainer.js';
import LoginContainer from '../../containers/users/LoginContainer.js';
import SignupContainer from '../../containers/users/SignupContainer.js';
import TabIcon from '../../components/app/TabIcon.js';

const Root = ({
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
              key="app"
              tabs
              initial
            >
              <Scene key="feed" component={FeedContainer} title="Feed" icon={TabIcon} />
              <Scene key="add-post" component={AddPostContainer} title="New post" icon={TabIcon} />
              <Scene key="login" component={LoginContainer} title="Login" icon={TabIcon} />
              <Scene key="signup" component={SignupContainer} title="Signup" icon={TabIcon} />
            </Scene>
          </Scene>
        </Scene>
      </RouterWithRedux>
    </Provider>
  );
};


Root.propTypes = {
  store : React.PropTypes.object.isRequired
};

export default Root;
