import React from 'react';
import {FontWeights} from 'office-ui-fabric-react';
import {AppNav} from "./components/nav/nav";
import Router from "./routes";
import {initializeIcons} from '@uifabric/icons';
import './App.css'

const boldStyle = {
    root: {fontWeight: FontWeights.semibold}
};

export const App: React.FunctionComponent = () => {

    return (
        <div className="App">
            <div className="header"></div>
            <div className="body">
                <div className="content"><Router/></div>
                <div className="sidebar"><AppNav/></div>
            </div>
            <div className="footer"></div>
        </div>
    );
};
