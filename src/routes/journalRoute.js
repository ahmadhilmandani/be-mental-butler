const express = require('express');
const router = express.Router();


const { insertJournalController, getAllJournalController, getJournalByIdController, updateJournalController, deleteJournalController } = require('../controllers/journalController')


router.get('/:userId', getAllJournalController)

router.get('/:userId/:journalId', getJournalByIdController)

router.post('/:userId', insertJournalController)

router.put('/:userId/:journalId', updateJournalController)

router.delete('/:journalId', deleteJournalController)



module.exports = router
