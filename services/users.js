const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email: email}, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: expireIn
                    }
                );

                res.header('Authorization', 'Bearer ' + token);
                res.cookie('token', 'Bearer ' + token, {httpOnly: true});
                return res.redirect('/dashboard');
                // return res.status(200).json({
                //     message: 'authentification_reussie',
                //     token: 'Bearer ' + token,
                // })
                
                }
                
                console.log('Mot de passe incorrect');
                return res.status(403).json('Mot de passe incorrect');
            });
        } else {
            return res.status(404).json('Utilisateur introuvable');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getByEmail = async (req, res, next) => {
    const email = req.params.email;

    try {
        let user = await User.find(email);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('utilisateur_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({_id: id});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }
        return res.status(404).json('utilisateur_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await User.deleteOne({_id: id});

        return res.status(204).json('suppression_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie('token');
    console.log('deconnexion_ok');
    return res.redirect('/');
}