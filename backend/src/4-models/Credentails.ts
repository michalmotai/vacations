import Joi from 'joi';

class Credentials {
  public email: string;
  public password: string;

  public constructor(Credentials: Credentials) {
    this.email = Credentials.email;
    this.password = Credentials.password;
  }

  private static validationSchema = Joi.object({
    email: Joi.string().email().required().min(7).max(45),
    password: Joi.string().required().min(8).max(45),
  });

  public validate(): string | undefined {
    const result = Credentials.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default Credentials;
