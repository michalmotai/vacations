export default {
  destination: {
    // required: { value: true, message: 'Missing destination' },
    minLength: { value: 3, message: 'Name too short' },
    maxLength: { value: 30, message: 'Name too long' },
  },
  description: {
    required: { value: true, message: 'Missing description' },
    minLength: { value: 3, message: 'Description too short' },
    maxLength: { value: 200, message: 'Description too long' },
  },
  startDate: {
    required: { value: true, message: 'Missing start date' },
    dateFormat: { value: 'YYYY-MM-DD', message: 'Invalid date format' },
  },
  endDate: {
    required: { value: true, message: 'Missing end date' },
    dateFormat: { value: 'YYYY-MM-DD', message: 'Invalid date format' },
    greaterThanStartDate: {
      value: true,
      message: 'End date must be after start date',
    },
  },
  price: {
    required: { value: true, message: 'Missing price' },
    min: { value: 0, message: 'Price cannot be negative' },
    numeric: { value: true, message: 'Invalid price format' },
    decimalPrecision: { value: 2, message: 'Invalid price precision' },
    maxPrice: { value: 10000, message: 'Maximum price exceeded' },
  },
  photoName: {
    required: { value: false, message: 'missing image' },
  },
};
