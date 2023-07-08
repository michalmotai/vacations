import express, { Request, Response, NextFunction } from 'express';
import * as likesLogic from '../5-logic/likesLogic';
import verifyLogin from '../3-middleware/verify-logged-in';
import path from 'path';
import { parse as json2csv } from 'json2csv';

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

router.get(
  '/vacations/:vacationId/likes/:userId',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      if (isNaN(userId) || isNaN(vacationId)) {
        response.status(400).send('userId and vacationId must be numbers');
        return;
      }

      const userLikedVacation = await likesLogic.checkIfUserLikedVacation(
        userId,
        vacationId
      );

      if (userLikedVacation === undefined) {
        // The combination of user and vacation is not found
        response.status(200).send(false);
        return;
      }

      response.status(200).send(userLikedVacation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/vacations/:userId/likes/:vacationId',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      if (isNaN(userId) || isNaN(vacationId)) {
        response.status(400).send('userId and vacationId must be numbers');
        return;
      }

      await likesLogic.addVacationLikeByUserId(userId, vacationId);
      response.status(201).send(`user ${userId} liked vacation: ${vacationId}`);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/vacations/:userId/likes/:vacationId',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;

      if (isNaN(userId) || isNaN(vacationId)) {
        response.status(400).send('userId and vacationId must be numbers');
        return;
      }

      await likesLogic.deleteVacationLikeByUserId(userId, vacationId);
      response
        .status(200)
        .send(`user ${userId} unliked vacation: ${vacationId}`);
    } catch (err) {
      next(err);
    }
  }
);

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

// http://localhost:3005/api/vacations/likes/csv
router.get(
  '/vacations/likes/csv',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const likesCountPerVacation = await likesLogic.getLikesCountPerVacation();
      const fields = ['vacationId', 'destination', 'likesCount'];

      const csv = json2csv(likesCountPerVacation, { fields });

      response.setHeader(
        'Content-Disposition',
        'attachment; filename=likes.csv'
      );
      response.setHeader('Content-Type', 'text/csv');
      response.send(csv);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export default router;
