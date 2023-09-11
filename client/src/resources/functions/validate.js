const validate = ({ oldData, input, password, isRegister }) => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPassword = /^.*[0-9].*/;
  let dataObject = {
    email: {},
    password: {},
    confirmPassword: {},
    other: {},
  };
  Object.keys(input).forEach((field) => {
    const value = input[field];
    dataObject = { ...oldData, [field]: { data: value } };
    switch (field) {
      case "email":
        if (!value) dataObject.email.error = "Email must not be empty";
        else if (value.length > 24)
          dataObject.email.error =
            "Email can't contain more than 24 characters";
        else if (!regexEmail.test(value))
          dataObject.email.error = "Email must be valid";
        else dataObject.email.error = "";
        break;

      case "password":
        if (value.length < 6 || value.length > 10)
          dataObject.password.error = "Password must contain 6-10 characters";
        else if (!regexPassword.test(value))
          dataObject.password.error = "Password must contain a number";
        else dataObject.password.error = "";
        break;

      case "confirmPassword":
        if (isRegister && value !== password)
          dataObject.confirmPassword.error = "You must use the same password";
        else dataObject.confirmPassword.error = "";
        break;

      default:
        dataObject.other.error =
          "Error encountered while validating data, please report to the dev";
        break;
    }
  });
  return dataObject;
};

export default validate;
