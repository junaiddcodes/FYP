const { Validate } = require("../models/trainerDetails");
const { trainerDetails } = require("../models/trainerDetails");

const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");

var multerFilename;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    multerFilename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    req.body.trainer_photo = "/frontend/public/uploads/" + multerFilename;
    console.log(req.body.trainer_photo);
    callback(null, multerFilename);
  },
});
const upload = multer({ storage: storage });

function validateTrainer(req, res, next) {
  let { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    //req.user = user

    console.log(user._id);
    req.user = await trainerDetails.findById(user._id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}

module.exports.Auth = auth;
module.exports.Verify = validateTrainer;
module.exports.Upload = upload;
