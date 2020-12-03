const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

const mongoose = require('mongoose');
const users = require('./routers/api/users')
const profiles = require('./routers/api/profiles')
const { mongoURI } = require('./config/key')

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
})

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('成功连接到MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })


app.use(users.routes()).use(users.allowedMethods())
app.use(profiles.routes()).use(profiles.allowedMethods())

app.listen(3000, () => {
  console.log('server is starting at port 3000')
});