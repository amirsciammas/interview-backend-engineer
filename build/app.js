"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv = __importStar(require("dotenv"));
var Dbconnector_1 = require("./Helper/Dbconnector");
dotenv.config();
app.use(body_parser_1.default.json());
(0, Dbconnector_1.openDb)().then(function (db) {
    return __awaiter(this, void 0, void 0, function () {
        var t;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(db);
                    return [4 /*yield*/, db.get("SELECT * FROM sqlite_master WHERE type='table';")];
                case 1:
                    t = _a.sent();
                    console.log(":-----", t);
                    return [2 /*return*/];
            }
        });
    });
}).catch(console.log);
var server_port = (_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : "";
app.get('/users/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, db, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, (0, Dbconnector_1.openDb)()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM users WHERE id = ?', userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.status(404).send('User not found');
                }
                else {
                    res.send(user);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:userId/albums', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, limit, offset, sort, sortOrder, db, albums;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                limit = parseInt(req.query.limit) || 10;
                offset = parseInt(req.query.offset) || 0;
                sort = req.query.sort || 'title';
                sortOrder = req.query.order || 'ASC';
                return [4 /*yield*/, (0, Dbconnector_1.openDb)()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all("SELECT albums.* FROM albums\n       INNER JOIN users ON albums.userId = users.id\n       WHERE users.id = ?\n       ORDER BY ".concat(sort, " ").concat(sortOrder, " LIMIT ? OFFSET ?"), userId, limit, offset)];
            case 2:
                albums = _a.sent();
                res.send(albums);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:userId/albums/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, limit, offset, db, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                limit = parseInt(req.query.limit) || 10;
                offset = parseInt(req.query.offset) || 0;
                return [4 /*yield*/, (0, Dbconnector_1.openDb)()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all("SELECT images.* FROM images\n         INNER JOIN albums ON images.albumId = albums.id\n         INNER JOIN users ON albums.userId = users.id\n         WHERE users.id = ?\n         LIMIT ? OFFSET ?", userId, limit, offset)];
            case 2:
                images = _a.sent();
                res.send(images);
                return [2 /*return*/];
        }
    });
}); });
//404 response
var port = server_port || 5000;
app.listen(port, function () {
    console.log("Application started on ".concat(port, "..."));
});
exports.default = app;
