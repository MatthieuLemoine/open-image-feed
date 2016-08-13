import React, { Component } from 'react';
import Toolbar from './Toolbar.js';

const withNavigationBar = Wrapped => class WithNavigationBar extends Component {        // (1)
  static renderNavigationBar() {
    return <Toolbar title="Open Image Feed" />;
  }
  render() {
    return <Wrapped {...this.props} />;
  }
};

export default withNavigationBar;
