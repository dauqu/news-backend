const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");


//Generate random 5 digit number
const random = Math.floor(10000 + Math.random() * 80000);
console.log(random);

const PORT = process.env.PORT || 4000;

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000", "https://admin-for-all.vercel.app",
                        "https://harsha-news-21-frontend-ebsr5yren-dauqu.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//Allow JSON to be parsed
app.use(express.json());

// Enable file upload using express-fileupload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Allow static files
app.use(express.static(__dirname + "/files"));


//Connect to database
const connectDB = require("./config/database");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

//Send html file
app.get("/files", (req, res) => {
  res.sendFile(__dirname + "/files/");
});

const apiv1 = "/api/v1";

app.use(`${apiv1}/login`, require("./routes/login"));
app.use(`${apiv1}/register`, require("./routes/register"));
app.use(`${apiv1}/categories`, require("./routes/categories"));
app.use(`${apiv1}/news`, require("./routes/news"));
app.use(`${apiv1}/files`, require("./routes/files"));
app.use(`${apiv1}/profile`, require("./routes/profile"));
app.use(`${apiv1}/feed`, require("./routes/feed"));
app.use(`${apiv1}/bookmarks`, require("./routes/bookmarks"));
app.use(`${apiv1}/search`, require("./routes/search"));
app.use(`${apiv1}/users`, require("./routes/users"));
app.use(`${apiv1}/notifications`, require("./routes/notifications"));

app.use(`${apiv1}/terms`, require("./routes/terms"));
app.use(`${apiv1}/about`, require("./routes/about"));

//Static files
app.use(express.static("public"));

app.use("/privacy-policy", (req, res) => {
  res.sendFile(__dirname + "/public/privacy-policy.html"); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} After Rebuild Second Time`);
}); //Start the server
