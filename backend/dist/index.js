"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var routes = require('./routes');
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes);
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Serving on port ".concat(port));
});
