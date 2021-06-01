import React from "react";

import { Loading, Error, Playlists } from ".";
import styles from "./profile.module.css";

import { useRequest } from "../hooks";

function Profile() {
  const { data: me, loading, error } = useRequest("/api/me");

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error={error} />;
  }
  return (
    <div className={styles.wrapper}>
      <img className={styles.avatar} src={me?.images?.[0]?.url} alt="avatar" />
      <h1>{me?.display_name}</h1>
      <h2>Playlists</h2>
      <Playlists />
    </div>
  );
}

export default Profile;
