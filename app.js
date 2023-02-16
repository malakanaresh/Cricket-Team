const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbpath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running a http://localhost:3000/");
    });
  } catch (e) {
    console.log("error db");
  }
};
initializeDBAndServer();
app.get("/players/", async (request, response) => {
  const { playerId } = request.params;
  const getBookQuery = `
     SELECT
     *
     FROM
     cricket_team
  `;
  const player = await db.get(getBookQuery);
  response.send(player);
});
