const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const authController = require('../controllers/AuthController')
const auth = require('../middleware/auth.middleware')

// /api/auth/register


router.post(
    '/register',
    [
        check('email','Wrong email!').isEmail(),
        check('password','Min password length is 6 characters').isLength({min: 6})
    ], authController.registerUser)



router.get('/profile', auth, authController.getUser)

// /api/auth/login
router.post(
    '/login',
    [
        check('email','Wrong email!').normalizeEmail().isEmail(),
        check('password','Wrong password!').exists()
    ], authController.loginUser)

module.exports = router
