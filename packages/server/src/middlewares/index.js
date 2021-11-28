import jwt from 'jsonwebtoken';

export const jwtAuthCall = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'super-secret-word');

        if (Date.now() < decoded.until) {
            next();
        } else {
            res.status(404).send('Unauthorized user');
        }
    } catch (e) {
        res.status(404).send('Unauthorized user');
    }
};
