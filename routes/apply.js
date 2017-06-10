const router = require('koa-router')()
const applyController = require('../controller/apply')

// router.post('/api/apply/submitTurning', applyController.submitTurning)
// router.post('/api/apply/submitTurningOnline', applyController.submitTurningOnline)
router.post('/api/apply/submitSpecial', applyController.submitSpecial)
router.post('/api/apply/submitInnovation', applyController.submitInnovation)
router.get('/api/apply/download', applyController.download)
router.get('/api/apply/test', applyController.test)

module.exports = router
