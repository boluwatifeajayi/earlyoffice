const validation =  (schema) =>{
    return (req, res, next) => { 
        const validationResult = schema.validate(req.body)
        const {error} = validationResult;
        const valid = error == null; 
  
        if (valid)  next(); 
        else { 
          const { details } = error; 
          const message = details.map(detail => detail.message).join(',');
          console.log("error", message); 
          res.status(422).json({ error: message });
        } 
    }
  }


module.exports = validation
