   
export const printMsg=(req,res,next)=>{
    req.myDate=new Date();
    req.userName="admin";
    console.log (`hello to ${req.url} ${req.method}`);
    next();
};

//הפונקציה מתעדת בטרמינל את כתובת הנתיב וסוג הבקשה שנכנסה, ומוסיפה לאובייקט הבקשה תאריך עדכני ושם משתמש.