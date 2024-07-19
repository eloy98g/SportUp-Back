import { Router } from "express";
import { ActivityController } from "../controllers/activity";

export const activityRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Endpoints related to Activity
 */

/**x
 * @swagger
 * /activity/{id}:
 *   get:
 *     summary: Get activity by ID
 *     description: Retrieve a single activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: Activity not found
 */
activityRouter.get("/:id", ActivityController.getById);

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get all Activity
 *     description: Retrieve all Activity
 *     tags: [Activity]
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */

activityRouter.get("/", ActivityController.getAll);

/**
 * @swagger
 * /activity:
 *   post:
 *     summary: Create a new activity
 *     description: Create a new activity
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the activity
 *                 example: Football
 *               description:
 *                 type: string
 *                 description: The description of the activity
 *                 example: A friendly football match
 *     responses:
 *       201:
 *         description: Successfully created
 */
activityRouter.post("/", ActivityController.create);

/**
 * @swagger
 * /activity/{id}:
 *   patch:
 *     summary: Update an activity
 *     description: Update an existing activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the activity
 *                 example: Football
 *               description:
 *                 type: string
 *                 description: The description of the activity
 *                 example: A friendly football match
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Activity not found
 */
activityRouter.patch("/:id", ActivityController.update);

/**
 * @swagger
 * /activity/{id}:
 *   delete:
 *     summary: Delete an activity
 *     description: Delete an existing activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Activity not found
 */
activityRouter.delete("/:id", ActivityController.delete);

/**
 * @swagger
 * /activity/{id}/teams:
 *   patch:
 *     summary: Update teams in an activity
 *     description: Update teams for an existing activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of team IDs
 *                 example: ["team1", "team2"]
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Activity or teams not found
 */
activityRouter.patch("/:id/teams", ActivityController.updateTeams);

/**
 * @swagger
 * /activity/{id}/players:
 *   delete:
 *     summary: Remove players from an activity
 *     description: Remove players from an existing activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               players:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of player IDs
 *                 example: ["player1", "player2"]
 *     responses:
 *       200:
 *         description: Successfully removed players
 *       404:
 *         description: Activity or players not found
 */
activityRouter.delete("/:id/players", ActivityController.removePlayers);

/**
 * @swagger
 * /activity/{id}/result:
 *   post:
 *     summary: Create a result for an activity
 *     description: Create a result for an existing activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the activity
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               result:
 *                 type: string
 *                 description: The result of the activity
 *                 example: "Team A won by 2-1"
 *     responses:
 *       201:
 *         description: Successfully created
 *       404:
 *         description: Activity not found
 */
activityRouter.post("/:id/result", ActivityController.createResult);
