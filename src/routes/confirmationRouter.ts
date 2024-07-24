import { Router } from "express";
import { ConfirmationController } from "../controllers/confirmation/confirmationController";

export const confirmationRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Confirmation
 *   description: Endpoints related to confirmations
 */

/**
 * @swagger
 * /confirmation:
 *  get:
 *    summary: Get all confirmations based on userGid and/or activityGid (//TODO NOT QUITE SURE OF THIS ENDPOINT USE)
 *    tags: [Confirmation]
 *    parameters:
 *      - name: userGid
 *        in: query
 *        required: false
 *        description: GID of the admin user
 *        schema:
 *          type: string
 *      - name: activityGid
 *        in: query
 *        required: false
 *        description: GID of the activity
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully retrieved confirmations
 *      400:
 *        description: Invalid input
 *      404:
 *        description: No confirmations found
 */
confirmationRouter.get("/", ConfirmationController.getAll);

/**
 * @swagger
 * /confirmation:
 *  post:
 *    summary: Create a new confirmation
 *    tags: [Confirmation]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userGid:
 *                type: string
 *                description: GID of the user
 *              activityGid:
 *                type: string
 *                description: GID of the activity
 *            required:
 *              - userGid
 *              - activityGid
 *    responses:
 *      200:
 *        description: Successfully created confirmation
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Error creating confirmation
 */
confirmationRouter.post("/", ConfirmationController.create);
