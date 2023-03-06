require("dotenv").config();
const express = require("express");
const dbConnect = require("./middlewares/dbUtil/dbconnect");
const app = express();
const cors = require("cors");
const path = require('path');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const settings = 'production'


// Requiring routes
const authentication = require("./routes/authentication/indexAuthentication.route");
const studentRoutes = require("./routes/student.route");
const companyRoutes = require("./routes/company.route");
const profileRoutes = require("./routes/profile/index.profile");
const jobRoutes = require("./routes/job.route");
const mailSender = require("./middlewares/helperfunctions/mailSender");

// setting cors
const whiteList = ["http://localhost:3000", "http://localhost:3000","http://localhost:3001", "https://testt-orpin.vercel.app"];
const corsOption = {
  origin: whiteList,
  credentials: true,
};

// Using general middlewares
app.use(helmet());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Using routes
app.use(authentication);
app.use(studentRoutes);
app.use(companyRoutes);
app.use(profileRoutes);
app.use(jobRoutes);

app.set('trust proxy', 1);

// Serve static assets in production
if (settings === 'production') {
  // Set static folder
 
  app.use(express.static(path.join(__dirname, './client/build')))

  

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Database connection and starting the server
const PORT = process.env.PORT;
const SERVER = "localhost";
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${SERVER}:${PORT}`);
  });
});

