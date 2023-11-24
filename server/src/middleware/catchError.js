export const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const HandleAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
  // Promise.resolve(fn(req, res, next))
  //   .catch(err => {
  //     // log the error
  //     res.status(500).send({ message: 'Internal Server Error' }); 
  //   });//Uncomment For Deployment
};  