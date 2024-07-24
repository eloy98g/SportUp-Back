import { Router } from "express";
import { ChatController } from "../controllers/chat/chatController";

export const chatRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Endpoints related to chat functionalities
 */

/**
 * @swagger
 * /chat:
 *  get:
 *    summary: Get all chats for a specific user
 *    tags: [Chat]
 *    parameters:
 *      - name: userGid
 *        in: query
 *        required: true
 *        description: GID of the user
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully retrieved chats
 *      400:
 *        description: Invalid input
 *      404:
 *        description: No chats found
 */

chatRouter.get("/", ChatController.getAllOfUser);

/**
 * @swagger
 * /chat/{id}:
 *  get:
 *    summary: Get messages of a specific chat by chat ID
 *    tags: [Chat]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the chat
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully retrieved messages
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Chat not found or no messages
 */
chatRouter.get("/:id", ChatController.getMessages);
