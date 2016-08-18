import React, { Component } from 'react';
import ToolbarContainer from '../../containers/app/ToolbarContainer';

const withNavigationBar = Wrapped => class WithNavigationBar extends Component {        // (1)
  static renderNavigationBar() {
    return <ToolbarContainer title="Open Image Feed" />;
  }
  render() {
    return <Wrapped {...this.props} />;
  }
};

export default withNavigationBar;
