import Joi from 'joi';

export enum Role {
  admin = 'admin',
  user = 'user',
}
class User {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public birthday: Date;
  public role: Role;

  public constructor(user: User) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.birthday = user.birthday;
    this.role = user.role;
  }

  private static validationSchema = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(45),
    lastName: Joi.string().required().min(2).max(45),
    email: Joi.string().email().required().min(7).max(45),
    password: Joi.string().required().min(8).max(45),
    birthday: Joi.date().min('1900-01-01').iso(),
    role: Joi.string().required(),
  });

  public validate(): string | undefined {
    const result = User.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default User;
