import React from "react";

import Standalone from "./standalone";
import ProviderBased from "./providerBased";

const App = () => {
  return (
    <>
      <ProviderBased />
      <Standalone />
    </>
  );
};
export default App;
