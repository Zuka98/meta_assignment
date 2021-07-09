// client/src/App.js

import React from "react";
import "./App.css";
import LandingPage from "./LandingPage";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;