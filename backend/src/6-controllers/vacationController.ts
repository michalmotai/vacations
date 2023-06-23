import express, { Request, Response, NextFunction } from 'express';
import * as vacationLogic from '../5-logic/vacationLogic';
import Vacation from '../4-models/Vacation';
import path from 'path';
import verifyLogin from '../3-middleware/verify-logged-in';

const router = express.Router();

// http://localhost:3005/api/vacations
router
  .route('/vacations')
  .get(async (request: Request, response: Response, next: NextFunction) => {
    try {
      //***delete || 1  */
      const pageNumber = +(request.query.pageNumber || 1);
      const vacations = await vacationLogic.getAllVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  })
  .post(
    verifyLogin,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        request.body.photo = request.files?.photo;

        const vacation = new Vacation(request.body);
        console.log('controllerLog:', vacation);
        const addedVacation = await vacationLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
      } catch (error) {
        next(error);
      }
    }
  );

// http://localhost:3005/api/vacations/:id
router
  .route('/vacations/:id([0-9]+)')
  .get(async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.id;
      const vacation = await vacationLogic.getVacation(vacationId);
      response.json(vacation).send('vacation was added successfully');
    } catch (error) {
      next(error);
    }
  })
  .delete(
    verifyLogin,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const vacationId = +request.params.id;
        await vacationLogic.deleteVacation(vacationId);
        response.status(204).send('The selected vacation was deleted');
      } catch (error) {
        next(error);
      }
    }
  )
  .put(
    verifyLogin,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const id = +request.params.id;
        request.body.photo = request.files?.photo;
        const vacation = new Vacation(request.body);
        vacation.vacationId = id;
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        response.json(updatedVacation);
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(
    verifyLogin,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const id = +request.params.id;
        request.body.photo = request.files?.photo;
        const vacation = new Vacation(request.body);
        vacation.vacationId = id;
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        response.json(updatedVacation);
      } catch (error) {
        next(error);
      }
    }
  );

// http://localhost:3005/api/vacations/images/:photoName
router
  .route('/vacations/images/:photoName')
  .get(async (request: Request, response: Response, next: NextFunction) => {
    try {
      const photoName = request.params.photoName;
      console.log(photoName);
      const imagesAbseloutePath = path.join(
        __dirname,
        '..',
        '1-assets',
        'images',
        photoName
      );
      console.log(imagesAbseloutePath);
      response.sendFile(imagesAbseloutePath);
    } catch (error) {
      next(error);
    }
  });

export default router;
