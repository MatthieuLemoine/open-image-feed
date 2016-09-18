import React, { Component } from 'react';
import ToolbarContainer from '../../containers/app/ToolbarContainer';
import { View } from 'react-native';

const withNavigationBar = (Wrapped, hide) =>
  class WithNavigationBar extends Component {        // (1)
    static renderNavigationBar() {
      return hide ? <View /> : <ToolbarContainer title="Open Image Feed" />;
    }
    render() {
      return <Wrapped {...this.props} />;
    }
  };

export default withNavigationBar;
