import React from 'react';
import { PrimaryButton, FontWeights } from 'office-ui-fabric-react';
import {AppNav} from "./components/nav/nav";

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <AppNav />
    </div>
  );
};
