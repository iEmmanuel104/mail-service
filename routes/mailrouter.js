const express = require('express')
const router = express.Router()

const {
    addMailInfo,
    getAllMailInfo,
    getMailInfo,
    updateMailInfo,
    deleteMailInfo,
} = require('../controllers/contactFormService')

router.route('/').get(addMailInfo).post(getAllMailInfo)
router.route('/:id').get(getMailInfo).patch(updateMailInfo).delete(deleteMailInfo)
module.exports = router