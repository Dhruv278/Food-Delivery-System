const ErrorHandler=require('../errorHandling/ErrorFormate');


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || 'Internal Server Error ';

    if(process.env.NODE_ENV==='DEVELOPMENT'){

        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV==='PRODUCTION'){
        let error={...err}
        

        error.message=err.message;

        // wrong mongose Object Id error
        if(err.name=='CastError'){
            const message=`Resource not found. Invalid :${err.path}`
            error=new ErrorHandler(message,400);
        }

     
        // Handling Mongoose VAlidation error 
        if(err.name=='ValidationError'){

            const message=Object.values(err.errors).map(value=>value.message);
            error=new ErrorHandler(message,400)
            
        }

        // Handling Mongoose duplicate key Error
        if(err.code===11000){
            
            const message=`Duplicate ${Object.keys(err.keyValue)} entered`
            error=new ErrorHandler(message,400)
        }

        // Wrong JWT
        if(err.name==='JsonWebTokenError'){
            const message='JSON Web Token is invalid. Try Again!!!'
            error=new ErrorHandler(message,400)
        }

        // Expire Token
        if(err.name=='TokenExpiredError'){
            const message='JSON Web Token is expired. Try Again!!!'
            error=new ErrorHandler(message,400)

        }

        res.status(error.statusCode).json({
            success:false,
            message:error.message||'Internal Server Error'
        })


    }

}