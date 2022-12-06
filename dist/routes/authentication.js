"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//file imports 
const checkToken_1 = __importDefault(require("../middleware/checkToken"));
const authenticationController_1 = require("../controllers/authenticationController");
const router = express_1.default.Router();
//POST routes
router.post('/login', authenticationController_1.postLogin);
router.post('/register', authenticationController_1.postRegister);
router.post('/checkToken', checkToken_1.default, authenticationController_1.checkToken);
//test route
router.get('/test', (_, res) => {
    return res.send(" hello from test route ");
});
exports.default = router;
//# sourceMappingURL=authentication.js.map