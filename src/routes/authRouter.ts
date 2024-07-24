import { Router } from "express";
import { AuthController } from "../controllers/auth/authController";

export const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints related to user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Register a new user
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: User's email
 *                example: "user@example.com"
 *              password:
 *                type: string
 *                description: User's password
 *                example: "password123"
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: User already exists or other errors
 */

authRouter.post("/signup", AuthController.newUser);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: Sign in a user
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: User's email
 *                example: "user@example.com"
 *              password:
 *                type: string
 *                description: User's password
 *                example: "password123"
 *    responses:
 *      200:
 *        description: User signed in successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Incorrect email or password
 */

authRouter.post("/signin", AuthController.signIn);

authRouter.post("/forgotPassword", AuthController.forgotPassword);
