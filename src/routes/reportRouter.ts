import { Router } from "express";
import { ReportController } from "../controllers/report/reportController";

export const reportRouter = Router();

reportRouter.post("/", ReportController.createReport);

reportRouter.get("/", ReportController.getReportReasons);

