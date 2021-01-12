import * as React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import {HeartbeatTest, Application, Hooks, Root, Services, History} from "../pages";

const Router: React.FunctionComponent = () => (
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/" component={Root} />
            <Route exact path="/application" component={Application} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/hooks" component={Hooks} />
            <Route exact path="/history" component={History} />
            <Route exact path="/heartbeat-test" component={HeartbeatTest} />
        </Switch>
    </HashRouter>
)

export default Router;