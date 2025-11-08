import { User } from "../models/user.model.js";
export const login = (req, res , next) => {
    res.send('User Login');
    next();
}
