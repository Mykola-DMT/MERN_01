const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require('../models/User')
const config = require('config')


exports.registerUser = async function(req, res){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data!'
            })
        }

        const {email,password} = req.body

        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message:'This email is already registered.'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email, password: hashedPassword })

        await user.save()

        res.status(201).json({message: 'User Created'})
    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}

exports.getUser = async function(req, res){
    try{
        const user = await User.findById(req.user.userId)

        res.json(user)
    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}


exports.loginUser = async function(req, res){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong login data'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({message: 'User not found!'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid password'})
        }

        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn: '7d'}
        )

        res.json({ token, userId: user.id })

    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}
