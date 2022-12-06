"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.postLogin = exports.postRegister = void 0;
const statusCodes_1 = __importDefault(require("../statusCodes"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const user_1 = __importDefault(require("../models/user"));
const logging_1 = __importDefault(require("../config/logging"));
const signToken_1 = __importDefault(require("../functions/signToken"));
const { MISSING_DATA, EMAIL_UNAVAILABLE, INVALID_PASSWORD, INVALID_EMAIL, SUCCESS, SERVER_ERROR } = statusCodes_1.default;
//POST routes
const postRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get data from request
    const { name, lastName, email, password } = req.body;
    //check if all the data is provided 
    if (!(name && lastName && email && password)) {
        const fieldsRequired = ['name', 'lastName', 'email', 'password'];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //check if email already exists 
    try {
        const result = yield user_1.default.findOne({ email: email });
        if (result) {
            return next(new HttpException_1.default(EMAIL_UNAVAILABLE));
        }
    }
    catch (err) {
        logging_1.default.error('Error when getting user from database');
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //create user   
    const newUser = new user_1.default({
        name,
        lastName,
        email,
        password,
    });
    //save user 
    try {
        yield newUser.save();
    }
    catch (err) {
        //TODO: send user more explicit error 
        logging_1.default.error(err.message);
        logging_1.default.error('Error when saving user to database');
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //success
    const response = {
        statusCode: SUCCESS.code,
        error: false,
        message: 'User registered succesfully'
    };
    return res.status(SUCCESS.code).send(response);
});
exports.postRegister = postRegister;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get data from request
    const { email, password } = req.body;
    //check if data is provided
    if (!(email && password)) {
        const fieldsRequired = ['email', 'password'];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    let user = null;
    let isMatch = false;
    //get user
    try {
        user = yield user_1.default.findOne({ email });
        if (!user) {
            return next(new HttpException_1.default(INVALID_EMAIL));
        }
    }
    catch (_a) {
        logging_1.default.error('Error when retrieving user from database');
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //check password
    try {
        isMatch = yield user.comparePasswords(password);
        if (!isMatch) {
            return next(new HttpException_1.default(INVALID_PASSWORD));
        }
    }
    catch (_b) {
        logging_1.default.error('Error when comparing passwords');
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //create token
    const token = signToken_1.default(user._id, user.name, user.email);
    const response = {
        statusCode: SUCCESS.code,
        error: false,
        message: 'Login succesfully',
        data: {
            token: token
        }
    };
    res.status(SUCCESS.code).json(response);
});
exports.postLogin = postLogin;
const checkToken = (_, res, __) => {
    //in routes, checkToken middleware is fired before this middleware,
    //if it make it to here means token was valid.
    const response = {
        error: false,
        statusCode: SUCCESS.code,
        message: 'Valid token'
    };
    res.status(SUCCESS.code).json(response);
};
exports.checkToken = checkToken;
//# sourceMappingURL=authenticationController.js.map