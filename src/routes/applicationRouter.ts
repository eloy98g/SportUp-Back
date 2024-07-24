import { Router } from "express";
import { ApplicationController } from "../controllers/application";

export const applicationRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Endpoints related to Activity Applications
 */

/**
 * @swagger
 * /application/{id}:
 *  get:
 *    summary: Get all the applications for the activity provided by ID
 *    tags: [Application]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the activity
 *        schema:
 *          type: string
 *      - name: status
 *        in: query
 *        required: false
 *        description: Status of the application
 *        schema:
 *          type: string
 *          enum: [pending, rejected, accepted]
 *      - name: userGid
 *        in: query
 *        required: false
 *        description: ID of the user that has applicated for the activity
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully retrieved
 *      404:
 *        description: Activity not found
 */

applicationRouter.get("/:id", ApplicationController.getAll);

/**
 * @swagger
 * /application:
 *  post:
 *    summary: Create a new application for an activity
 *    tags: [Application]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              activityGid:
 *                type: string
 *                description: ID of the activity
 *              userGid:
 *                type: string
 *                description: ID of the user applying
 *              code:
 *                type: string
 *                description: Optional code of the activity
 *    responses:
 *      200:
 *        description: Application created successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Activity not found or other errors
 */
applicationRouter.post("/", ApplicationController.create);

/**
 * @swagger
 * /application/{id}/resolve:
 *  post:
 *    summary: Resolve an application for an activity
 *    tags: [Application]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the application to be resolved
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              response:
 *                type: string
 *                description: Response to the application
 *                enum: [accepted, rejected]
 *    responses:
 *      200:
 *        description: Application resolved successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Application not found or other errors
 */
applicationRouter.post("/:id/resolve", ApplicationController.resolve);
