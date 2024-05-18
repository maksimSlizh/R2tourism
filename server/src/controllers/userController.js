const db = require('../db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'The user with this email has already been registered' });
        }
        await db.createUser({ username, email, password });
        res.status(201).json({ message: 'The user has been successfully registered' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Error during user registration' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'The login was completed successfully', user });
    } catch (error) {
        console.error('User login error:', error);
        res.status(500).json({ message: 'User login error' });
    }
};

exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await db.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'The user was not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error when getting the user profile:', error);
        res.status(500).json({ message: 'Error when getting the user profile' });
    }
};

// Variant how to work with models but your code is good

// const User = require('../models/user')

// class UserController {
//     async registerUser(req, res) {
//         const { username, email, password } = req.body;
//         console.log(User)
//         try {
//             const existingUser = await User.findOne({ where: { email } });
//             if (existingUser) {
//                 return res.status(400).json({ message: 'The user with this email has already been registered' });
//             }
//             await User.create({ username, email, password });
//             res.status(201).json({ message: 'The user has been successfully registered' });
//         } catch (error) {
//             console.error('Error during user registration:', error);
//             res.status(500).json({ message: 'Error during user registration' });
//         }
//     }

//     async loginUser(req, res) {
//         const { email, password } = req.body;
//         try {
//             const user = await User.findOne({ where: { email } });
//             if (!user || user.password !== password) {
//                 return res.status(401).json({ message: 'Invalid email or password' });
//             }
//             res.status(200).json({ message: 'The login was completed successfully', user });
//         } catch (error) {
//             console.error('User login error:', error);
//             res.status(500).json({ message: 'User login error' });
//         }
//     }
// }

// module.exports = new UserController();
