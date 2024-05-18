import { createReport } from "./methods/createReport";
import { getReportReasons } from "./methods/getReportReasons";

export class ReportModel {
  static createReport = async (input: any) => createReport(input);

  static getReportReasons = async () => getReportReasons();
}
