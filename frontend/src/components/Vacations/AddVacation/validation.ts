const isAfterStartDate = (value: Date, values: any) => {
  const startDate = values.startDate;
  if (!startDate || !value) return true; // If either field is empty, consider it valid
  return new Date(value) > new Date(startDate);
};

export default {
  destination: {
    // required: { value: true, message: 'Missing destination' },
    minLength: { value: 3, message: 'Name too short' },
    maxLength: { value: 30, message: 'Name too long' },
  },
  description: {
    required: { value: true, message: 'Missing description' },
    minLength: { value: 3, message: 'Description too short' },
    maxLength: { value: 500, message: 'Description too long' },
  },
  startDate: {
    required: { value: true, message: 'Missing start date' },
    dateFormat: { value: 'YYYY-MM-DD', message: 'Invalid date format' },
  },
  endDate: {
    required: { value: true, message: 'Missing end date' },
    dateFormat: { value: 'YYYY-MM-DD', message: 'Invalid date format' },
    isAfterStartDate: {
      value: true,
      message: 'end date must be after start date',
    },
  },
  price: {
    required: { value: true, message: 'Missing price' },
    min: { value: 0, message: 'Price cannot be negative' },
    max: { value: 10000, message: 'Price cannot exceed 10,000' },
    numeric: { value: true, message: 'Invalid price format' },
  },
  photoName: {
    validate: (value: any) => {
      return value !== null && value !== undefined && value !== ''
        ? true
        : 'Missing image';
    },
  },
};
