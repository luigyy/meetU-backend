"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRole_1 = __importDefault(require("../interfaces/userRole"));
const salt = 10;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        required: true
    },
    email: {
        type: String,
        min: 3,
        max: 40,
        trim: true,
        required: true,
        unique: [true, 'Email already exists'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        enum: Object.values(userRole_1.default),
        default: userRole_1.default.USER,
        required: true
    },
    password: {
        type: String,
        min: 5,
        max: 40,
    }
}, { timestamps: true });
//hash password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const thisObj = this;
        try {
            thisObj.password = yield bcrypt_1.default.hash(thisObj.password, salt);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
//method has to be awaited when use
UserSchema.methods.comparePasswords = function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
//do not spit password out when retrieving user
UserSchema.set('toJSON', {
    transform: function (_, ret) {
        delete ret['password'];
        return ret;
    }
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map