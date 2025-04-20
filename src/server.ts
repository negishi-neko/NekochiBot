import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Nekochi Bot Server is Online.");
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Koyeb health check server listening on port ${port}`);
  });
}
