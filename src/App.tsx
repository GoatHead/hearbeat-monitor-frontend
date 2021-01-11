import React, {useState} from 'react';
import {FontWeights} from 'office-ui-fabric-react';
import {AppNav} from "./components/nav/nav";
import Router from "./routes";
import {initializeIcons} from '@uifabric/icons';
import './App.css'

const boldStyle = {
    root: {fontWeight: FontWeights.semibold}
};

export const App: React.FunctionComponent = () => {
    const [title, setTitle] = useState('하트비트 검사관')

    return (
        <div className="App">
            <title>{ title }</title>
            <div className="header"></div>
            <div className="body">
                <div className="content"><Router/></div>
                <div className="sidebar"><AppNav/></div>
            </div>
            <div className="footer"></div>
        </div>
    );
};
