const catways = require('../models/catways');
const jwt = require('jsonwebtoken');

exports.getCatways = async (req, res, next) => {
    const id = req.params.id;
    try {
        let catway = await catways.findById(id);
        if (catway) {
            return res.status(200).json(catway.reservations);
        }
        return res.status(404).json('voie_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getReservation = async (req, res, next) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;
    try {
        let catway = await catways.findById(id);
        if (catway) {
            let reservation = catway.reservations.find(reservation => reservation._id == idReservation);
            if (reservation) {
                return res.status(200).json(reservation);
            }
            return res.status(404).json('reservation_introuvable');
        }
        return res.status(404).json('voie_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.addReservation = async (req, res, next) => {
    const id = req.params.id;
    const temp = ({
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        user: req.body.user
    });

    try {
        let catway = await catways.findById(id);
        if (catway) {
            catway.reservations.push(temp);
            await catway.save();
            return res.status(201).json(catway);
        }
        return res.status(404).json('voie_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.updateReservation = async (req, res, next) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;
    const temp = ({
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        user: req.body.user
    });

    try {
        let catway = await catways.findById(id);
        if (catway) {
            let reservation = catway.reservations.find(reservation => reservation._id == idReservation);
            if (reservation) {
                Object.keys(temp).forEach((key) => {
                    if (!!temp[key]) {
                        reservation[key] = temp[key];
                    }
                });
                await catway.save();
                return res.status(201).json(catway);
            }
            return res.status(404).json('reservation_introuvable');
        }
        return res.status(404).json('voie_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.deleteReservation = async (req, res, next) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;

    try {
        let catway = await catways.findById(id);
        if (catway) {
            let reservation = catway.reservations.find(reservation => reservation._id == idReservation);
            if (reservation) {
                catway.reservations.pull(reservation);
                await catway.save();
                return res.status(201).json(catway);
            }
            return res.status(404).json('reservation_introuvable');
        }
        return res.status(404).json('voie_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.checkJWT = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json('token_manquant');
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json('token_invalide');
        }
        next();
    });
};

