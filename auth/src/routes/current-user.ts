import express from 'express';
import { User } from '../model/user-model';

const router = express.Router();

router.get('/api/users/currentuser', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        console.log(error)
    }
});

export { router as currentUserRouter };
