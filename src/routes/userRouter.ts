import { Router } from "express";
import { UserController } from "../controllers/user/userController";

export const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to users
 */

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to retrieve
 *    responses:
 *      200:
 *        description: Successfully retrieved user
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
 *                  type: object
 *                  properties:
 *                    gid:
 *                      type: string
 *                    name:
 *                      type: string
 *                    image:
 *                      type: string
 *                    location:
 *                      type: object
 *                      properties:
 *                        locationId:
 *                          type: string
 *                        locationName:
 *                          type: string
 *      404:
 *        description: User not found
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
 *                  type: object
 *                  nullable: true
 */
userRouter.get("/:id", UserController.getById);

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Get all users with filters
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: following
 *        schema:
 *          type: string
 *        description: ID of the user to find users they are following
 *      - in: query
 *        name: followedBy
 *        schema:
 *          type: string
 *        description: ID of the user to find users who are following them
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name to search users by
 *    responses:
 *      200:
 *        description: Successfully retrieved users
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
 *                      gid:
 *                        type: string
 *                      name:
 *                        type: string
 *                      image:
 *                        type: string
 *      404:
 *        description: No users found or error
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
userRouter.get("/", UserController.getAll);

/**
 * @swagger
 * /user/{id}/favSports:
 *  get:
 *    summary: Get favorite sports of a user by their ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user whose favorite sports are to be retrieved
 *    responses:
 *      200:
 *        description: Successfully retrieved favorite sports
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
 *                    type: string
 *      404:
 *        description: User not found or no favorite sports found
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
 *                    type: string
 *                  nullable: true
 */
userRouter.get("/:id/favSports", UserController.getFavoriteSports);

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update user information by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to update
 *    requestBody:
 *      description: User information to update
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the user
 *              email:
 *                type: string
 *                format: email
 *                description: The email of the user
 *              phone:
 *                type: integer
 *                description: The phone number of the user
 *              birthdate:
 *                type: integer
 *                description: The birthdate of the user as a Unix timestamp
 *              description:
 *                type: string
 *                description: A brief description of the user
 *              location:
 *                type: object
 *                properties:
 *                  latitude:
 *                    type: number
 *                    format: float
 *                  longitude:
 *                    type: number
 *                    format: float
 *                  latitudeDelta:
 *                    type: number
 *                    format: float
 *                  longitudeDelta:
 *                    type: number
 *                    format: float
 *                  radius:
 *                    type: number
 *                    format: float
 *                description: The location information of the user
 *              gender:
 *                type: string
 *                enum: ["NS/NC", "male", "female", "other"]
 *                description: The gender of the user
 *    responses:
 *      200:
 *        description: Successfully updated user information
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
 *                  type: object
 *                  properties:
 *                    gid:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    phone:
 *                      type: integer
 *                    birthdate:
 *                      type: integer
 *                    description:
 *                      type: string
 *                    location:
 *                      type: object
 *                      properties:
 *                        latitude:
 *                          type: number
 *                        longitude:
 *                          type: number
 *                        latitudeDelta:
 *                          type: number
 *                        longitudeDelta:
 *                          type: number
 *                        radius:
 *                          type: number
 *                    gender:
 *                      type: string
 *      404:
 *        description: User not found or invalid input
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
 *                  type: object
 *                  nullable: true
 */
userRouter.patch("/:id", UserController.update);

/**
 * @swagger
 * /user/{id}/follow:
 *  post:
 *    summary: Follow another user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user who is following
 *    requestBody:
 *      description: ID of the user to follow
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gid:
 *                type: string
 *                description: The ID of the user to follow
 *    responses:
 *      200:
 *        description: Successfully followed the user
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
 *                  description: Success message
 *      404:
 *        description: User not found, already following the user, or other errors
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
 *                  nullable: true
 */
userRouter.post("/:id/follow", UserController.follow);

/**
 * @swagger
 * /user/{id}/unfollow:
 *  post:
 *    summary: Unfollow another user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user who is unfollowing
 *    requestBody:
 *      description: ID of the user to unfollow
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gid:
 *                type: string
 *                description: The ID of the user to unfollow
 *    responses:
 *      200:
 *        description: Successfully unfollowed the user
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
 *                  description: Success message
 *      404:
 *        description: User not found, not following the user, or other errors
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
 *                  nullable: true
 */
userRouter.post("/:id/unfollow", UserController.unfollow);
