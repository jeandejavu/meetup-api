const { Meetup, MeetupsSubscription, Sequelize } = require('../models')
const moment = require('moment')
const Op = Sequelize.Op

class UnregisteredController {
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
            // where: { userId },
            required: false
          }
        ]
      }).filter(
        meetup =>
          !meetup.MeetupsSubscriptions.find(
            subscribe => subscribe.userId === userId
          )
      )
    )
  }
}

module.exports = new UnregisteredController()
