const requestLoggerMiddleware = ((req,res,next)=>{
    req.requestTime = new Date().toLocaleString()
    console.log(`${req.method}`)
    console.log(`${req.url}`)
    console.log(`${req.requestTime}`)
    next()
})

module.exports = requestLoggerMiddleware;