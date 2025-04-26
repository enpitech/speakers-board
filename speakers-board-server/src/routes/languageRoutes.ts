import { Router } from 'express';
import LanguageController from '../controllers/languageController';

const router = Router();
const languageController = new LanguageController();

router.get('/', languageController.getAllLanguages.bind(languageController));
router.post('/', languageController.addLanguage.bind(languageController));
router.delete('/:language', languageController.deleteLanguage.bind(languageController));

export default router;
