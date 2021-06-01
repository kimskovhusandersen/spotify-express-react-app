import React from "react";

function Error({ error }) {
  return <div>{JSON.stringify(error, null, 4)}</div>;
}

export default Error;
