/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import FormData from "form-data";

const config = {
  client_id: process.env.CLIENT_ID || "f0ec6845e25f34025892",
  redirect_uri: process.env.REDIRECT_URI || "http://localhost:5173/gists",
  client_secret: process.env.CLIENT_SECRET || "bc32b3c686b9c3524220627a0cb336b22b071401",
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/authenticate", async (req, res) => {
  const { code } = req.query;

  fetch(
    `https://github.com/login/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.get("/user", async (req, res) => {
  const auth = req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((resp) => resp.json())
    .then((resp) => res.status(200).json(resp));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
