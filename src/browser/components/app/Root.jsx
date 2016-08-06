import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Application from './Application.jsx';
import { Provider } from 'react-redux';
import FeedContainer from '../../containers/posts/FeedContainer';
import AddPostContainer from '../../containers/posts/AddPostContainer';
import LoginContainer from '../../containers/users/LoginContainer';
import SignupContainer from '../../containers/users/SignupContainer';

const Root = ({
    store
  }) =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application} >
        <IndexRoute component={FeedContainer} />
        <Route path="/add-post" component={AddPostContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
      </Route>
    </Router>
  </Provider>;

Root.propTypes = {
  store : React.PropTypes.object.isRequired
};

export default Root;
