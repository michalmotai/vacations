import Joi from 'joi';

class Vacation {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public photoName: string;

  public constructor(vacation: Vacation) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.photoName = vacation.photoName;
  }

  private static validationSchema = Joi.object({
    vacationId: Joi.number().integer().positive().optional(),
    destination: Joi.string().min(3).max(45).required(),
    description: Joi.string().min(3).max(45).optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    price: Joi.number().positive().required(),
    photoName: Joi.string().optional(),
  });

  public validate(): string | undefined {
    const result = Vacation.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default Vacation;
