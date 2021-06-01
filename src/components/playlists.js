import React, { useState } from "react";
import { Loading, Error } from ".";
import qs from "querystring";
import { useRequest } from "../hooks";
import "./playlists.css";

function Playlists() {
  const [queryParams, setQueryParams] = useState({ limit: 12, offset: 0 });
  const { data, loading, error } = useRequest(
    `/api/me/playlists? + ${qs.stringify(queryParams)}`
  );

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error={error} />;
  }
  return (
    <ul className="playlists">
      {data?.items?.length &&
        data?.items.map((playlist, i) => {
          return (
            <li key={i}>
              <img src={playlist.images?.[0].url} alt="" />
              <div>
                <b>{playlist.name || ""}</b>
                <p>{playlist.description}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default Playlists;
