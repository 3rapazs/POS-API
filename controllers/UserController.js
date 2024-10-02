const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    signIn : async(req,res) => {
        try {
            const u = req.body.username;
            const p = req.body.password;
            
            const user = await prisma.user.findFirst({
                select: {
                    id: true,
                    name: true,
                    level: true
                },
                where :{
                    username :u,
                    password: p,
                    status: 'use'
                }
            })

            if (user != null)
            {
            const key = process.env.TOKEN_SECRET;
            const token = jwt.sign(user,key, {expiresIn : '30d'});
            
            return res.send({token: token,name: user.name,id: user.id});

            }
            else    
            {
                return res.send(401).send();
            }

        } catch (e) {
            return res.status(500).send({error : e.message})
        }
    }
}