import { Request, Response } from "express";

import { createReport } from "./methods/createReport";
import { getReportReasons } from "./methods/getReportReasons";

export class ReportController {
  static createReport = async (req: Request, res: Response) =>
    createReport(req, res);

  static getReportReasons = async (req: Request, res: Response) =>
    getReportReasons(req, res);
}
