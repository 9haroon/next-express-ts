import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/hello', function(req:any, res:any) {
  res.send('Hello API!!');
});

router.post('/contact', 
	[
		check('email').isEmail(),
		check('name').isString(),
		check('message').isString(),
		check('phone').optional(),
	], 
	async(req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { email, name, message, phone } = req.body
		res.json({message: 'success', ...req.body});

	}
)

export default router