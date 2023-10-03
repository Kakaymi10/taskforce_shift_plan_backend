"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("./models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const {
  PORT,
  DB_NAME
} = process.env;
const app = (0, _express.default)();
app.use(_bodyParser.default.json({
  limit: '50mb'
}));
app.use((0, _cors.default)());
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to our app!!'
  });
});
const server = app.listen(PORT || 3000, () => {
  console.log(`Server started on port ${PORT}`);
});

// INITIATE DATABASE CONNECTION
const dbCon = async () => {
  try {
    await _index.default.sequelize.authenticate();
    console.log(`Database ${DB_NAME} connected successfully`);
  } catch (error) {
    console.log(error);
  }
};

// START SERVER
Promise.all([server, dbCon()]).catch(error => {
  console.log(`Server error: ${error.message}`);
});
var _default = exports.default = app;