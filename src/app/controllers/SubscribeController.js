const { User, Meetup, MeetupsSubscription, Sequelize } = require('../models')
const moment = require('moment')
const Op = Sequelize.Op

class SubscribeController {
  async store (req, res) {
    const { userId } = req
    const { meetups } = req.body
    const user = await User.findByPk(userId)

    const subscribes = await user.addMeetups(meetups.map(pref => pref.id))

    return res.json(subscribes)
  }

  async index (req, res) {
    const dateTime = moment()
      .utc('pt-BR')
      .format()

    const { userId } = req
    return res.json(
      await Meetup.findAll({
        where: {
          eventDate: {
            [Op.gte]: dateTime
          }
        },
        include: [
          {
            model: MeetupsSubscription,
            where: { userId },
            required: true
          }
        ]
      })
    )
  }
}

module.exports = new SubscribeController()
