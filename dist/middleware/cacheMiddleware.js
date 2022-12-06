"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const cacheOptions = {
    stdTLL: 100,
    checkperiod: 600,
    maxKeys: -1, //default -1, unlimited keys
};
const myCache = new node_cache_1.default(cacheOptions);
const cache = (duration) => {
    return (req, res, next) => {
        const key = '__express__' + req.originalUrl;
        const cachedBody = myCache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
        }
        else {
            //not cached yet
            let ress = res.send;
            res.send = (body) => {
                ress(body);
            };
        }
    };
};
exports.default = cache;
//# sourceMappingURL=cacheMiddleware.js.map