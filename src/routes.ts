import express from "express";
import { Router, Request, Response } from "express";

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/users/all', (req: Request, res: Response) => {
    return res.send({ message: 'ok' })
})

router.post('/users/new', (req: Request, res: Response) => {
    
})

router.put('/users/update', (req: Request, res: Response) => {

})

router.delete('/users/remove', (req: Request, res: Response) => {
    
})

app.use(router);

app.listen(3000);