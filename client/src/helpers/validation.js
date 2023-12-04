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

const AccountSchema = Yup.object().shape({
  AccountName: Yup.string().required("Account Name is required"),
  Market: Yup.string().required("Select Market"),
  Broker: Yup.string().required("Select Broker"),
  InitialBalance: Yup.number().positive().integer().required("Initial Balance is required"),
  Currency: Yup.string().required("Select Currency")
});

const TagSchema = Yup.object().shape({
  TagName: Yup.string().required("Tag Name is required"),
  TagType: Yup.string().required("Select Tag Type"),
  TagDesc: Yup.string().required("Tag Description is required")
});

const TradeSchema = Yup.object().shape({
  Account: Yup.string().required("Select Account"),
  Market: Yup.string().required("Select Market"),
  Broker: Yup.string().required("Select Broker"),
  Setup: Yup.string().required("Select Setup"),
  Symbol: Yup.string().required("Symbol is required"),
  EntryDate: Yup.date().required("Entry Date is required"),
  ExitDate: Yup.date().required("Exit Date is required").min(Yup.ref('EntryDate')),
  EntryPrice: Yup.number().positive().integer().required("Entry Price is required"),
  ExitPrice: Yup.number().positive().integer().required("Initial Balance is required"),
  StopLoss: Yup.number().positive().integer().required("Stop Loss is required"),
  Quantity: Yup.number().positive().integer().required("Quantity is required")
});


export { SignUpSchema, SignInSchema, AccountSchema, TagSchema, TradeSchema };