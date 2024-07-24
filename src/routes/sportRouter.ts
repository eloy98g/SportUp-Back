import { Router } from "express";
import { SportController } from "../controllers/sport/sportController";

export const sportRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Sports
 *   description: Endpoints related to sports
 */

/**
 * @swagger
 * /sport:
 *  get:
 *    summary: Get all sports
 *    tags: [Sports]
 *    responses:
 *      200:
 *        description: Successfully retrieved sports
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
 *                    properties:
 *                      sportGid:
 *                        type: string
 *                      sportImage:
 *                        type: string
 *                      sportName:
 *                        type: string
 *                      sportIconBlack:
 *                        type: string
 *                      sportIconWhite:
 *                        type: string
 *      404:
 *        description: Error retrieving sports
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
sportRouter.get("/", SportController.getAll);

/**
 * @swagger
 * /sport/{id}/favorite:
 *  post:
 *    summary: Mark a sport as favorite for a user
 *    tags: [Sports]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the sport to mark as favorite
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gid:
 *                type: string
 *                description: GID of the user that marks the sport as favorite
 *            required:
 *              - userGid
 *              - reportedBy
 *              - reportReason
 *    responses:
 *      200:
 *        description: Sport marked as favorite
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
 *                  type: string
 *      404:
 *        description: Error marking sport as favorite
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
 *                  type: string
 */
sportRouter.post("/:id/favorite", SportController.favorite);

/**
 * @swagger
 * /sport/{id}/unfavorite:
 *  post:
 *    summary: Unmark a sport as favorite for a user
 *    tags: [Sports]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the sport to unmark as favorite
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gid:
 *                type: string
 *                description: GID of the user that unmarks the sport as favorite
 *            required:
 *              - userGid
 *              - reportedBy
 *              - reportReason
 *    responses:
 *      200:
 *        description: Sport unmarked as favorite
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
 *                  type: string
 *      404:
 *        description: Error unmarking sport as favorite
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
 *                  type: string
 */
sportRouter.post("/:id/unfavorite", SportController.unfavorite);
