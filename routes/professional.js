const express = require('express');

const router = express.Router();

const { createProfessional, getProfessionals, getProfessional, deleteProfessional, updateProfessional } = require('../controllers/professionalController');
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth);

router.post('/', createProfessional)
router.get('/', getProfessionals)
router.get('/:id', getProfessional)
router.delete('/:id', deleteProfessional)
router.patch('/:id', updateProfessional)


module.exports = router;