import { Router } from "express";
import { ActivityController } from "../controllers/activity";

export const activityRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Endpoints related to Activities
 */

/**
 * @swagger
 * /activity/{id}:
 *   get:
 *     summary: Get activity by ID
 *     description: Retrieve a single activity by its ID
 *     tags: [Activity]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
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
 *  get:
 *    summary: Get all activities
 *    description: Retrieve all Activities by params
 *    tags: [Activity]
 *    parameters:
 *    - in: query
 *      name: visibility
 *      required: false
 *      description: Visibility of the activity (if the activity is visible by the users by default)
 *      schema:
 *        type: string
 *        enum: [public, private]
 *    - in: query
 *      name: type
 *      required: false
 *      description: Type of the activity relative to the competition
 *      schema:
 *        type: string
 *        enum: [normal, competitive]
 *    - in: query
 *      name: status
 *      required: false
 *      schema:
 *        type: array
 *        items:
 *          type: string
 *          enum: [draft, pending, closed, ongoing, waitingScore, finished]
 *        description: Filtrar tareas por uno o más estados
 *    - in: query
 *      name: sports
 *      required: false
 *      schema:
 *        type: array
 *        items:
 *          type: string
 *        description: Filtrar por deporte
 *    - in: query
 *      name: userGid
 *      required: false
 *      schema:
 *        type: string
 *        items:
 *          type: string
 *        description: Filtrar por actividad donde el jugador con id {id} participa
 *    - in: query
 *      name: admin
 *      required: false
 *      schema:
 *        type: string
 *        items:
 *          type: string
 *        description: Filtrar por actividad donde el jugador con id {id} es el administrador
 *    - in: query
 *      name: price
 *      required: false
 *      description: Filter by price of the activity
 *      schema:
 *        type: string
 *        enum: [0€, 1€-5€, 5€-10€, 10€-15€, 15€]
 *    responses:
 *      200:
 *        description: Successfully retrieved
 *      404:
 *        description: Activity not found
 */
activityRouter.get("/", ActivityController.getAll);

/**
 * @swagger
 * /activity:
 *  post:
 *    summary: Create a new activity
 *    description: Create a new activity with the specified parameters
 *    tags: [Activity]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userGid:
 *                type: string
 *                description: ID of the user creating the activity
 *              sport:
 *                type: string
 *                description: Sport associated with the activity
 *              name:
 *                type: string
 *                description: Name of the activity
 *              teams:
 *                type: integer
 *                description: Number of teams
 *              playersPerTeam:
 *                type: integer
 *                description: Number of players per team
 *              access:
 *                type: string
 *                description: Access type of the activity
 *              visibility:
 *                type: string
 *                description: Visibility of the activity
 *                enum: [public, private]
 *              type:
 *                type: string
 *                description: Type of the activity relative to the competition
 *                enum: [normal, competitive]
 *              price:
 *                type: string
 *                description: Price of the activity
 *                enum: [0€, 1€-5€, 5€-10€, 10€-15€, 15€]
 *              lat:
 *                type: number
 *                format: float
 *                description: Latitude of the activity location
 *              lng:
 *                type: number
 *                format: float
 *                description: Longitude of the activity location
 *              address:
 *                type: string
 *                description: Address of the activity location
 *              dateStart:
 *                type: string
 *                format: date-time
 *                description: Start date and time of the activity
 *              duration:
 *                type: integer
 *                description: Duration of the activity in minutes
 *              description:
 *                type: string
 *                description: Description of the activity
 *            required:
 *              - userGid
 *              - sport
 *              - name
 *              - teams
 *              - playersPerTeam
 *              - access
 *              - visibility
 *              - type
 *              - price
 *              - lat
 *              - lng
 *              - dateStart
 *              - duration
 *              - description
 *    responses:
 *      200:
 *        description: Activity created successfully
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
activityRouter.post("/", ActivityController.create);

/**
 * @swagger
 * /activity/{id}:
 *  patch:
 *    summary: Update an activity
 *    description: Update the specified activity by ID with the provided parameters
 *    tags: [Activity]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the activity to update
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userGid:
 *                type: string
 *                description: ID of the user creating the activity
 *              sport:
 *                type: string
 *                description: Sport associated with the activity
 *              name:
 *                type: string
 *                description: Name of the activity
 *              teams:
 *                type: integer
 *                description: Number of teams
 *              playersPerTeam:
 *                type: integer
 *                description: Number of players per team
 *              access:
 *                type: string
 *                description: Access type of the activity
 *              visibility:
 *                type: string
 *                description: Visibility of the activity
 *                enum: [public, private]
 *              type:
 *                type: string
 *                description: Type of the activity relative to the competition
 *                enum: [normal, competitive]
 *              price:
 *                type: string
 *                description: Price of the activity
 *                enum: [0€, 1€-5€, 5€-10€, 10€-15€, 15€]
 *              lat:
 *                type: number
 *                format: float
 *                description: Latitude of the activity location
 *              lng:
 *                type: number
 *                format: float
 *                description: Longitude of the activity location
 *              address:
 *                type: string
 *                description: Address of the activity location
 *              dateStart:
 *                type: string
 *                format: date-time
 *                description: Start date and time of the activity
 *              duration:
 *                type: integer
 *                description: Duration of the activity in minutes
 *              description:
 *                type: string
 *                description: Description of the activity
 *    responses:
 *      200:
 *        description: Activity updated successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Activity not found
 *      500:
 *        description: Internal server error
 */
activityRouter.patch("/:id", ActivityController.update);

/**
 * @swagger
 * /activity/{id}:
 *  delete:
 *    summary: Delete an activity
 *    description: Delete the specified activity by ID
 *    tags: [Activity]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the activity to delete
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Activity deleted successfully
 *      404:
 *        description: Activity not found
 *      500:
 *        description: Internal server error
 */
activityRouter.delete("/:id", ActivityController.delete);

/**
 * @swagger
 * /activity/{id}/teams:
 *  patch:
 *    summary: Updates the teams of an activity
 *    description: Update the teams provided of the activity Parameters to provide gid (team ID) and players (array of player's IDs)
 *    tags: [Activity]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the activity to update its teams.
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                gid:
 *                  type: string
 *                  description: team id
 *                players:
 *                  type: array
 *                  description: array of player id's
 *                  items:
 *                    type: string
 *    responses:
 *      200:
 *        description: Activity updated successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Activity not found
 *      500:
 *        description: Internal server error
 */
activityRouter.patch("/:id/teams", ActivityController.updateTeams);

/**
 * @swagger
 * /activity/{id}/teams:
 *  patch:
 *    summary: Remove the players for the team Id provided
 *    description: remove the players inside each team
 *    tags: [Activity]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the activity to update its teams.
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                gid:
 *                  type: string
 *                  description: team id
 *                players:
 *                  type: array
 *                  description: array of player id's
 *                  items:
 *                    type: string
 *    responses:
 *      200:
 *        description: Activity updated successfully
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Activity not found
 *      500:
 *        description: Internal server error
 */
activityRouter.delete("/:id/players", ActivityController.removePlayers);

/**
 * @swagger
 * /activity/{id}/result:
 *  post:
 *    summary: Add results to an activity
 *    description: Add scores to the specified activity by ID and update the activity status to 'finished'
 *    tags: [Activity]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the activity to add results to
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              scores:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    team:
 *                      type: string
 *                      description: ID of the team
 *                    points:
 *                      type: number
 *                      format: float
 *                      description: Points scored by the team
 *                    position:
 *                      type: number
 *                      description: Position of the team in the results
 *                  required:
 *                    - team
 *                    - points
 *                    - position
 *            required:
 *              - scores
 *    responses:
 *      200:
 *        description: Results added successfully and activity status updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: ""
 *      400:
 *        description: Invalid input
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *      404:
 *        description: Activity not found or results already assigned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 */

activityRouter.post("/:id/result", ActivityController.createResult);
