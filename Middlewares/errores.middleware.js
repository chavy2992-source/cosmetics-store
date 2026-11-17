//טיפול בשגיאות
export const errorHandler = (err, req, res, next) => {

    const { message = "", status = 500, type = "Server Error" } = err;
    return res.status(status).json({error:{msg:message,type}});

}