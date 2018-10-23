import { isEmpty } from "lodash";
import Validator from "is_js";

export function validateSignup(user) {
  let errors = {};
  if (Validator.empty(user.email)) {
    errors.email = "Please Enter Email";
  }
  if (Validator.empty(user.phone)) {
    errors.phone = "Please Enter Phone Number ";
  }

  if (user.password !== user.confirmpassword) {
    errors.confirmpassword = "Password Not Match";
  }

  if (!Validator.empty(user.email) && !Validator.email(user.email)) {
    errors.email = "Email Format is invalid ";
  }

  if (Validator.empty(user.password)) {
    errors.password = "Please Enter Password";
  }
  if (user.password.length <= 7) {
    errors.password = "Password Length Should Be greater than 7";
  }

  if (Validator.empty(user.name)) {
    errors.name = "Please Enter Name";
  }

  if (Validator.empty(user.confirmpassword)) {
    errors.confirmpassword = "Please Enter Password";
  }

  if (!Validator.empty(user.email) && !Validator.email(user.email)) {
    errors.email = "Email Format is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export function validateLogin(user) {
  let errors = {};
  console.log(user);
  if (Validator.empty(user.email)) {
    errors.email = "Please Enter Email";
  }

  if (!Validator.empty(user.email) && !Validator.email(user.email)) {
    errors.email = "Email Format is invalid ";
  }

  if (Validator.empty(user.password)) {
    errors.password = "Please Enter Password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
