export default {
  firstName: {
    required: { value: true, message: 'Missing first name' },
    minLength: { value: 3, message: 'Name too short' },
    maxLength: { value: 30, message: 'Name too long' },
  },
  lastName: {
    required: { value: true, message: 'Missing last name' },
    minLength: { value: 3, message: 'Name too short' },
    maxLength: { value: 30, message: 'Name too long' },
  },
  email: {
    required: { value: true, message: 'Missing email' },
  },
  password: {
    required: { value: true, message: 'Missing password' },
    minLength: { value: 4, message: 'password too short' },
  },
  birthday: {
    required: { value: true, message: 'Missing birthday' },
  },
};
