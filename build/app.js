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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importStar(require("express"));
// Middlewares
const cors_1 = require("./middlewares/cors");
// Routes
const activityRouter_1 = require("./routes/activityRouter");
const userRouter_1 = require("./routes/userRouter");
const chatRouter_1 = require("./routes/chatRouter");
const sportRouter_1 = require("./routes/sportRouter");
const authRouter_1 = require("./routes/authRouter");
const app = (0, express_1.default)();
exports.PORT = process.env.PORT || 1234;
app.use((0, express_1.json)());
app.use((0, cors_1.corsMiddleware)());
app.disable("x-powered-by");
app.use("/auth", authRouter_1.authRouter);
app.use("/user", userRouter_1.userRouter);
app.use("/activity", activityRouter_1.activityRouter);
app.use("/chat", chatRouter_1.chatRouter);
app.use("/sport", sportRouter_1.sportRouter);
app.listen(exports.PORT, () => {
    console.log(`server listening on http://localhost:${exports.PORT}`);
});
