import { Router } from "express";
import { ReviewController } from "../controllers/review/reviewController";

export const reviewRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Endpoints related to reviews
 */

/**
 * @swagger
 * /review:
 *  post:
 *    summary: Create a new review
 *    tags: [Review]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              activityGid:
 *                type: string
 *                description: The ID of the activity being reviewed
 *              rating:
 *                type: integer
 *                description: The rating given (0-5)
 *              comment:
 *                type: string
 *                description: Optional comment about the review
 *              reviewedBy:
 *                type: string
 *                description: The ID of the user who is giving the review
 *              users:
 *                type: array
 *                items:
 *                  type: string
 *                description: List of user IDs being reviewed
 *    responses:
 *      200:
 *        description: Review successfully created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *      400:
 *        description: Validation or creation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 */
reviewRouter.post("/", ReviewController.create);

/**
 * @swagger
 * /review:
 *  get:
 *    summary: Get all reviews for a user
 *    tags: [Review]
 *    parameters:
 *      - in: query
 *        name: userGid
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user for whom to retrieve reviews
 *    responses:
 *      200:
 *        description: Successfully retrieved reviews
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *      400:
 *        description: Validation or retrieval error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 */
reviewRouter.get("/", ReviewController.getAll);
