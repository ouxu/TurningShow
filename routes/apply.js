const router = require('koa-router')()
const applyController = require('../controller/apply')

router.post('/api/apply/submitTurning', applyController.submitTurning)
router.post('/api/apply/submitInnovation', applyController.submitInnovation)
router.get('/api/apply/download', applyController.download)
// router.post('/api/apply/update', applyController.update)
// router.post('/api/apply/delete', applyController.delete)
router.get('/api/apply/test', applyController.test)

module.exports = router
