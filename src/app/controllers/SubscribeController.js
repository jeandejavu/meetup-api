const { User } = require('../models')

class SubscribeController {
  async store (req, res) {
    const { userId } = req
    const { meetups } = req.body
    const user = await User.findByPk(userId)

    const subscribes = await user.addMeetups(meetups.map(pref => pref.id))

    return res.json(subscribes)
  }
}

module.exports = new SubscribeController()
