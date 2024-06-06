const sendToken=(user,statusCode,res)=>{
    const token =user.getJwtToken();

    const option ={
        expire:new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,option).json({
        status:true,
        constent:{
            user_data:{
               id:user.id,
               name:user.name,
               email:user.email,
               created_at:user.created_at,
               city:user.city
            },
            meta:{
                access_token:token
            }
        },
    })
}

module.exports=sendToken