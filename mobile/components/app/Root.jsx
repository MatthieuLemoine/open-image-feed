import React from 'react';
import { Router, TabsRoute, Route, nativeHistory } from 'react-router-native';
import Application from './Application.jsx';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import FeedContainer from '../../containers/posts/FeedContainer';
import AddPostContainer from '../../containers/posts/AddPostContainer';
import LoginContainer from '../../containers/users/LoginContainer';
import SignupContainer from '../../containers/users/SignupContainer';

const Root = ({
    store
  }) => {
  const history = syncHistoryWithStore(nativeHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <TabsRoute
          path="/"
          component={Application}
          transition="horizontal-pager"
        >
          <Route path="/" component={FeedContainer} />
          <Route path="add-post" component={AddPostContainer} />
          <Route path="login" component={LoginContainer} />
          <Route path="signup" component={SignupContainer} />
        </TabsRoute>
      </Router>
    </Provider>
  );
};


Root.propTypes = {
  store : React.PropTypes.object.isRequired
};

export default Root;
