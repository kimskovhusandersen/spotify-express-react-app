import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./core-layout.css";

function CoreLayout({ children, history }) {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const [playlists, setPlaylists] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/me")
      .then(({ data }) => {
        setMe(data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div id="content">
      <header>
        <ul>
          <li>
            <Link className="logo" exact to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Antu_spotify.svg/768px-Antu_spotify.svg.png"
                alt="Logo"
              />
            </Link>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {me ? (
            <li className="profile">
              <img className="avatar" src={me.images?.[0]?.url} alt="avatar" />
              <p>{me.display_name}</p>{" "}
            </li>
          ) : null}
        </ul>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>
        <p>&copy; Kim Skovhus Andersen 2021</p>
      </footer>
    </div>
  );
}

export default CoreLayout;
