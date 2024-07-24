import { Router } from "express";
import { ReportController } from "../controllers/report/reportController";

export const reportRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Endpoints related to reports
 */

/**
 * @swagger
 * /report:
 *  post:
 *    summary: Create a new report
 *    tags: [Report]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userGid:
 *                type: string
 *                description: GID of the user being reported
 *              reportedBy:
 *                type: string
 *                description: GID of the user making the report
 *              reportReason:
 *                type: string
 *                description: Reason for the report
 *            required:
 *              - userGid
 *              - reportedBy
 *              - reportReason
 *    responses:
 *      200:
 *        description: Successfully created report
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Error creating report
 */
reportRouter.post("/", ReportController.createReport);

/**
 * @swagger
 * /report:
 *  get:
 *    summary: Get all report reasons
 *    tags: [Report]
 *    responses:
 *      200:
 *        description: Successfully retrieved report reasons
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  gid:
 *                    type: string
 *                  detail:
 *                    type: string
 *      404:
 *        description: Error retrieving report reasons
 */
reportRouter.get("/", ReportController.getReportReasons);
