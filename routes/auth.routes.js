const {Router} = require('express');
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router();
const bcrypt = require('bcryptjs')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальныя длина пароля 6 символов')
            .isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email: email[0]})
            console.log(candidate)
            if (candidate) {
                console.log(true)
                res.status(400).json({message: 'Такой пользователь уже существует'})
            }
            console.log(false)
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save();

            res.status(200).json({message: 'Пользователь создан}'})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    });

// /api/auth/login
router.post(
    '/login',
    [check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne(email)

            if(!user){
                res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password. user.password)

            if(!isMatch){
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
                )
            res.json({token, userId: user.Id})

        } catch (e) {
            res.status(500).json({massage: 'Что-то пошло не так'})
        }
    })

module.exports = router