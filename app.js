import express from 'express';
import path from 'path';
const app = express();

const __dirname = path.resolve(path.dirname(''));

app.listen(3000, () => {
  console.log("Server is listening at port 3000.");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  res.setHeader('Content-Type', 'text/html');
});

app.get("/sshkey", (req, res) => {
  res.sendFile(__dirname + "/public/sshkey");
  res.setHeader('Content-Type', 'text/plain');
})
app.get("/key", (req, res) => {
  res.sendFile(__dirname + "/public/sshkey");
  res.setHeader('Content-Type', 'text/plain');
})

app.get("/resume", (req, res) => {
  res.sendFile(__dirname + "/public/Resume.pdf");
  res.setHeader('Content-Type', 'application/pdf');
})

app.get("/websites", (req, res) => {
  res.send(401)
  // res.sendFile(__dirname + "/public/otherwebsites.html");
  // res.setHeader('Content-Type', 'text/html');
})

app.get("/resume-html", (req, res) => {
  res.send(401)
  // res.sendFile(__dirname + "/public/resume.html");
  // res.setHeader('Content-Type', 'text/html');
})

app.get("/certificate", (req, res) => {
  res.send(401)
  // res.sendFile(__dirname + "/public/certificate");
  // res.setHeader('Content-Type', 'text/plain');
})

app.get("/arc-sw.js", (req, res) => {
  res.sendFile(__dirname + "/public/arc-sw.js");
  res.setHeader('Content-Type', 'application/javascript');
})