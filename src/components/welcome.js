import React from "react";
import PingApi from "./ping-api";
import logo from "../logo.svg";
import "./welcome.css";

function Welcome() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/components/welcome.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <PingApi />
        <p>
          This data is from the server and provided via window.bootstrap:{" "}
          {JSON.stringify(window.bootstrap)}
        </p>
      </header>
    </div>
  );
}

export default Welcome;
