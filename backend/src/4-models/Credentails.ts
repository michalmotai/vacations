import Joi from 'joi';

class Credientials {
  public email: string;
  public password: string;

  public constructor(credientials: Credientials) {
    this.email = credientials.email;
    this.password = credientials.password;
  }

  private static validationSchema = Joi.object({
    email: Joi.string().email().required().min(7).max(45),
    password: Joi.string().required().min(8).max(45),
  });

  public validate(): string | undefined {
    const result = Credientials.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default Credientials;
