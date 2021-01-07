import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {loadTheme, styled } from 'office-ui-fabric-react';
import { appStyles } from './App.styles'
import {initializeIcons} from "@uifabric/icons";
import light from './themes/light'

initializeIcons();
loadTheme(light);

const StyledApp = styled(App, appStyles)

ReactDOM.render(<StyledApp />, document.getElementById('app'));
