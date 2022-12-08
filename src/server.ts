import app from "./app";

app.listen(process.env.PORT || 5000, () =>
  console.log("server listening on port")
);
