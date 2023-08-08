import Joi from 'joi';
import { UploadedFile } from 'express-fileupload';

class Vacation {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public photo?: UploadedFile;
  public photoName?: string;

  public constructor(vacation: Vacation) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.photo = vacation.photo;
    this.photoName = vacation.photoName;
  }

  private static validationSchema = Joi.object({
    vacationId: Joi.number().integer().positive().optional(),
    destination: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(500).optional(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().min(Joi.ref('startDate')),
    price: Joi.number().positive().required().max(10000),
    photo: Joi.object().optional(),
    photoName: Joi.string().optional(),
  });

  public validate(): string | undefined {
    const result = Vacation.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default Vacation;
