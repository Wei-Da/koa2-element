const Router = require('koa-router');

const router = new Router();

router.get('/profiles', async (ctx) => {
  ctx.body = 'profiles'
})

module.exports = router