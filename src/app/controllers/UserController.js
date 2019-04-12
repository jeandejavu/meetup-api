const { User, Sequelize, UsersPreference, Preference } = require('../models')
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
    const { email, Preferences } = req.body
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

    const insertsPreferences = Preferences.map(preference => ({
      userId: userId,
      preferenceId: preference.id
    }))

    await UsersPreference.destroy({
      where: {
        userId: userId
      }
    })

    await UsersPreference.bulkCreate(insertsPreferences)

    let user = await User.findByPk(userId)
    await user.update(req.body)

    return res.json({ error: false })
  }

  async show (req, res) {
    const { userId } = req
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Preference,
          required: false
        }
      ]
    })
    return res.json(user)
  }
}

module.exports = new UserController()
