import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    res.json("this is User page");
})

router.get('/:id', (req, res) => {
    res.json(`this is page of user ${req.params.id}`);
})

export default router;
