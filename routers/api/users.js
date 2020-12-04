const { secretOrKey } = require('../../config/key')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt')({secret: secretOrKey});
const Router = require('koa-router');
const User = require('../../models/Users');

const router = new Router();
router.prefix('/api/users')

router.get('/', async (ctx) => {
  try {
    const data = await User.find()
    ctx.body = {
      code: 1,
      data
    };
  } catch (e) {
    ctx.body = {
      code: 0
    };
  }

})

router.post('/register', async (ctx) => {
  const user = await User.findOne({ email: ctx.request.body.email });
  if (user) {
    ctx.body = {
      code: 0,
      message: '邮箱已注册'
    }
  } else {
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      identity: ctx.request.body.identity
    });
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(ctx.request.body.password, salt)
      newUser.password = hash;
      const user = await newUser.save()
      ctx.body = {
        code: 1,
        data: user
      }
    } catch (e) {
      ctx.body = {
        code: 0
      }
    }
  }
})

router.post('/login', async (ctx) => {
  const password = ctx.request.body.password;
  const email = ctx.request.body.email;
  const user = await User.findOne({ email })

  if(!user) {
    ctx.status = 405
    ctx.body = {
      code: 0,
      message: '请先注册'
    }
  } else {
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      const rule = {
        id: user.id,
        name: user.name,
        identity: user.identity
      };

      const token = await jwt.sign(rule, secretOrKey, { expiresIn: '1d' })
      ctx.body = {
        success: true,
        token: 'Bearer ' + token
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: '密码错误'
      }
    }
  }
})

router.get('/current', koajwt, async (ctx) => {
  const name = ctx.query.name;
  if(name) {
    const user = await User.findOne({ name })
    user ? data = user : data = '用户名不存在'
    ctx.body = {
      code: 1,
      data
    }
  } else {
    ctx.body = {
      code: 0
    }
  }
})

module.exports = router