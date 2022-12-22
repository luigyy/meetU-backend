"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: add usage to the response
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const admin_1 = __importDefault(require("./routes/admin"));
const NotFoundHandler_1 = __importDefault(require("./middleware/NotFoundHandler"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const mongoConnect_1 = __importDefault(require("./config/mongoConnect"));
const morgan_1 = __importDefault(require("./config/morgan"));
const checkRole_1 = __importDefault(require("./middleware/checkRole"));
const checkToken_1 = __importDefault(require("./middleware/checkToken"));
const cors_1 = __importDefault(require("cors"));
//import session from 'express-session'
require('dotenv').config();
const app = express_1.default();
//connect to database
//TODO: stop listening if not properly connected to db
mongoConnect_1.default();
//send formatted JSON
app.set('json spaces', 2);
//middleware TODO: add security middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(morgan_1.default);
app.use(cors_1.default());
//session stuff
//app.use(session({
// name: 'express',
//secret: 'mysecret',
//saveUninitialized: true,
//resave: false,
//cookie: {
//path: '*',
//httpOnly: true,
//maxAge: 60 * 60 //one hour in seconds
//}
//}))
//routes middleware
app.use('/', authentication_1.default);
app.use('/admin', checkToken_1.default, checkRole_1.default(['ADMIN']), admin_1.default);
//404 and errorhandler
app.use(errorHandler_1.default);
app.use(NotFoundHandler_1.default);
app.listen(config_1.default.server.port, () => {
    console.clear();
    logging_1.default.info(`Listening on port ${config_1.default.server.port}`);
});
//# sourceMappingURL=index.js.map