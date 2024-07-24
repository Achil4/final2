import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const auth = (req,res,next) =>{
    const {token} = req.cookies
    
    if(!token) return res.status(401).json({message: 'no token'})

    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403).json({message:'toke invalido'})

            req.user = user

            console.log(user)
    })

    

    next()
}