const { User, Meetup, MeetupsSubscription, Sequelize } = require('../models')
const moment = require('moment')
const Queue = require('../services/Queue')
const MeetupSubscribeMail = require('../jobs/MeetupSubscribeMail')
const Op = Sequelize.Op

class SubscribeController {
  async store (req, res) {
    const { userId } = req
    const { meetups } = req.body
    const user = await User.findByPk(userId)

    const subscribes = await user.addMeetups(meetups.map(meetup => meetup.id))

    meetups.forEach(meetup =>
      Queue.create(MeetupSubscribeMail.key, {
        user,
        meetup
      }).save()
    )

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
            // where: { userId },
            required: true
          }
        ]
      }).filter(meetup =>
        meetup.MeetupsSubscriptions.find(
          subscribe => subscribe.userId === userId
        )
      )
    )
  }
}

module.exports = new SubscribeController()
