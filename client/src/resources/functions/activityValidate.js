const validate = (input, countries) => {
  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  const durationRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  const errorsObject = {};

  Object.keys(input).forEach((field) => {
    const value = input[field];
    switch (field) {
      case "name":
        if (value.length < 5 || value.length > 30)
          errorsObject[field] = "Activity name must have 5-30 characters";
        else if (!nameRegex.test(value))
          errorsObject[field] = "Name must contain valid characters";
        break;
      case "duration":
        if (value.length < 1) errorsObject[field] = "Duration can't be empty";
        else if (!durationRegex.test(value))
          errorsObject[field] = "Duration must follow HH:mm format";
        break;
      case "countriesSearchbar":
        if (!countries.length)
          errorsObject[field] = "You must select at least one country";
        break;
      default:
        break;
    }
  });

  return errorsObject;
};

export default validate;
