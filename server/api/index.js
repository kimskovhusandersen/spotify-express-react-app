const express = require("express");
const router = express.Router();
const qs = require("querystring");
const axios = require("axios");

router.get("/callback", (req, res) => {
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        code: req.query.code || null,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
      }
    )
    .then(({ data }) => {
      console.log({ data });
      res.redirect(
        "http://localhost:3000?" +
          qs.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
          })
      );
    })
    .catch((error) => res.json(error));
});

router.get("/me", (req, res) => {
  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + req.session.access_token,
      },
    })
    .then(({ data }) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/me/playlists", (req, res) => {
  return axios
    .get("https://api.spotify.com/v1/me/playlists?" + qs.stringify(req.query), {
      headers: {
        Authorization: "Bearer " + req.session.access_token,
      },
    })
    .then(({ data }) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.json(err);
    });
});

module.exports = router;
