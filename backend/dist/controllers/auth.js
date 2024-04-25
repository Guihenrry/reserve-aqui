"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
function signIn(req, res) {
    return res.status(200).json(req.body);
}
exports.signIn = signIn;
function signUp(req, res) {
    return res.status(200).json(req.body);
}
exports.signUp = signUp;
