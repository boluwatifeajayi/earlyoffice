const customValidation = (schema, data) => {
  console.log("inside custom validation!!!!");
  return (req, res, next) => {
    const requestData = ["body", "params", "query"];
    // const requestData = [{label:"body", value:req.body},{label:"query", value:req.query},{label:"params", value:req.params} ];
    // const validData = data == "body" ? req.body  : data == "query" ? req.query  : data == "param" ? req.params : data
    const validData = requestData.includes(data) ? req[data] : data;
    console.log(validData);

    const validationResult = schema.validate(validData);
    const { error } = validationResult;

    const valid = error == null;

    if (requestData.includes(data)) {
      if (valid) return next();
      else {
        const { details } = error;
        const message = details.map((detail) => detail.message).join(",");
        console.log("error", message);
        return { status: 422, error: message };
      }
    } else if (valid) return true;
  };
};

module.exports = customValidation;
