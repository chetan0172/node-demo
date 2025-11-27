const express = require('express');
const app = express();
const crypto = require('crypto');

function log(level, event, message, extra={}) {
  const entry = {
    timestamp: new Date().toISOString(),
    service: "node-demo-app",
    env: process.env.NODE_ENV || "dev",
    level,
    event,
    message,
    request_id: crypto.randomBytes(4).toString('hex'),
    ...extra
  };
  console.log(JSON.stringify(entry));
}

app.get('/', (req,res) => {
  log("INFO","home","User visited home");
  res.send("OK");
});

app.get('/login', (req,res) => {
  log("INFO","user_login","User logged in",{ user_id: 101 });
  res.send("login ok");
});

app.get('/payment', (req,res) => {
  const duration = Math.floor(Math.random()*400) + 20;
  log("INFO","payment","Payment processed",{ user_id: 101, duration_ms: duration });
  res.send("payment ok");
});

app.get('/error', (req,res) => {
  log("ERROR","app_error","Simulated error",{ code:5001 });
  res.status(500).send("error");
});

app.get('/health', (req,res) => res.send({ ok: true }));

app.listen(3000, () => log("INFO","app_start","Node app started"));
