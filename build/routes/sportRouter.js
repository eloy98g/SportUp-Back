"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportRouter = void 0;
const express_1 = require("express");
const sportController_1 = require("../controllers/sportController");
exports.sportRouter = (0, express_1.Router)();
exports.sportRouter.post("/:id/favorite", sportController_1.SportController.favorite);
exports.sportRouter.post("/:id/unfavorite", sportController_1.SportController.unfavorite);
