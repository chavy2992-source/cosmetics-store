
export const validateBody = (schema) => {
    const mdl = (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if(error){
            res.status(409).json(error);

        }else{
            req.body=value;
            //תקין אז תמשיך
            next();
        }
    }
    return mdl;
}