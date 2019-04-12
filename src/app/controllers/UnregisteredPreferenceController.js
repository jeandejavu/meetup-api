const {
  Meetup,
  Preference,
  MeetupsSubscription,
  Sequelize,
  UsersPreference
} = require('../models')
const moment = require('moment')
const Op = Sequelize.Op

class UnregisteredPreferenceController {
  async index (req, res) {
    const { userId } = req
    const preferences = await UsersPreference.findAll({
      where: { userId }
    }).map(preference => preference.preferenceId)

    const dateTime = moment()
      .utc('pt-BR')
      .format()

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
          },
          {
            model: Preference,
            required: true,
            where: {
              id: {
                [Op.in]: preferences
              }
            }
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

module.exports = new UnregisteredPreferenceController()
