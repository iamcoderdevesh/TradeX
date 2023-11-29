import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  Email: Yup.string().email().required("Email is required"),
  UserName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  Password: Yup.string()
    .required("Password is required")
    .min(8, "too short - should be 8 chars minimum"),
  ConfirmPassword: Yup.string()
    .required("You should repeat the password")
    .oneOf([Yup.ref('Password'), null], 'Type the correct password'),
});

const SignInSchema = Yup.object().shape({
  Email: Yup.string().email().required("Email is required"),
  Password: Yup.string().required("Password is required")
    .min(8, "too short - should be 8 chars minimum")
});

export { SignUpSchema, SignInSchema };