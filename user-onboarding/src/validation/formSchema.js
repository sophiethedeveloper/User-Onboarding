import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be 3 chars or longer"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),
  terms: yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});
