import { Router } from 'express';
import { calculateTotalSimilarity } from '../controllers/similarity';

const router = Router();

router.post('/get-total-similarity', calculateTotalSimilarity);

export const predictRouter = router;