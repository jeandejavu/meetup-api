const { User, Sequelize } = require('../models')
const Op = Sequelize.Op

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({
        status: 400,
        statusText: 'Bad Request',
        errors: [
          {
            field: ['email'],
            location: 'body',
            messages: ['"email" already exists'],
            types: ['string.email']
          }
        ]
      })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async update (req, res) {
    const { email } = req.body
    const { userId } = req

    if (
      await User.findOne({
        where: {
          email,
          id: {
            [Op.ne]: [userId]
          }
        }
      })
    ) {
      return res.status(400).json({
        status: 400,
        statusText: 'Bad Request',
        errors: [
          {
            field: ['email'],
            location: 'body',
            messages: ['"email" already exists'],
            types: ['string.email']
          }
        ]
      })
    }

    const affected = await User.update(req.body, {
      where: {
        id: userId
      }
    })

    if (affected.length > 0) {
      return res.json({ error: false })
    }
    return res.status(400).json({ error: true })
  }

  async show (req, res) {
    const user = await User.findByPk(req.params.id)

    return res.json(user)
  }
}

module.exports = new UserController()
