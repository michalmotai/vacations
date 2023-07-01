import express, { Request, Response, NextFunction } from 'express';
import * as likesLogic from '../5-logic/likesLogic';
import verifyLogin from '../3-middleware/verify-logged-in';

const router = express.Router();

// http://localhost:3005/api/vacations/:userId/likes (get vacation array)
router.get(
  '/vacations/:userId/likes',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationLikes = await likesLogic.getVacationLikedByUserId(userId);
      response.status(200).json(vacationLikes);
    } catch (err) {
      next(err);
    }
  }
);

router
  .route('/vacations/:userId/likes/:vacationId')

  .get(async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      if (isNaN(userId) || isNaN(vacationId)) {
        // Send a 400 Bad Request response or throw an error
        response.status(400).send('userId and vacationId must be numbers');
        return;
      }

      const userLikedVacation = await likesLogic.checkIfUserLikedVacation(
        userId,
        vacationId
      );
      if (!userLikedVacation) {
        response
          .status(404)
          .send(`Vacation with ID ${vacationId} does not exist`);
        return;
      }

      response.status(200).json({ userLikedVacation });
    } catch (error) {
      next(error);
    }
  })

  .post(async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      if (isNaN(userId) || isNaN(vacationId)) {
        // Send a 400 Bad Request response or throw an error
        response.status(400).send('userId and vacationId must be numbers');
        return;
      }

      const vacationLikes = await likesLogic.addVacatopmLikeByUserId(
        userId,
        vacationId
      );
      response.status(201).send(`user ${userId} liked vacation:${vacationId} `);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      const vacationLikes = await likesLogic.deleteVacationLikeByUserId(
        userId,
        vacationId
      );
      response
        .status(201)
        .send(`user ${userId}disliked vacation: ${vacationId} `);
    } catch (err) {
      next(err);
    }
  });

// http://localhost:3005/api/vacations/likes
router.get(
  '/vacations/likes',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const likesCountPerVacation = await likesLogic.getLikesCountPerVacation();
      response.status(200).json(likesCountPerVacation);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
