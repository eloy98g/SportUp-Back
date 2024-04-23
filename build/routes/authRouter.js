"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_ts_1 = require("../controllers/authController.ts");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get("/signup", authController_ts_1.AuthController.newUser);
exports.authRouter.post("/signin", authController_ts_1.AuthController.signin);
exports.authRouter.post("/forgotPassword", authController_ts_1.AuthController.forgotPassword);
