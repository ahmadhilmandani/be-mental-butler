const express = require('express');
const router = express.Router();

const { checkToken } = require('../middleware/authMiddleware')
const { insertJournalController, getAllJournalController, getJournalByIdController, updateJournalController, deleteJournalController } = require('../controllers/journalController')


router.get('/:userId', checkToken, getAllJournalController)

router.get('/:userId/:journalId', checkToken, getJournalByIdController)

router.post('/:userId', checkToken, insertJournalController)

// router.put('/:userId/:journalId', checkToken, updateJournalController)

// router.delete('/:journalId', checkToken, deleteJournalController)


module.exports = router
