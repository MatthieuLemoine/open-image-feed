import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Application from './Application.jsx';
import { Provider } from 'react-redux';
import FeedContainer from '../../posts/containers/FeedContainer';
import AddPostContainer from '../../posts/containers/AddPostContainer';
import LoginContainer from '../../users/containers/LoginContainer';

const Root = ({
    store
  }) =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application} >
        <IndexRoute component={FeedContainer} />
        <Route path="/add-post" component={AddPostContainer} />
        <Route path="/login" component={LoginContainer} />
      </Route>
    </Router>
  </Provider>;

Root.propTypes = {
  store : React.PropTypes.object.isRequired
};

export default Root;
