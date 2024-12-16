require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Add it back when communicating with react
const logger = require("morgan");
const mongoose = require("mongoose");


const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Setting up cors
const allowedOrigins = ['https://mtechsystem.netlify.app/'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(logger("dev"));

// const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user')




// test route
app.get("/api/test", (req, res) => { res.status(200).json({ data: "test route success" }) });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/super-admin", superAdminRoutes);



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
