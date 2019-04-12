const {
  Meetup,
  Preference,
  User,
  MeetupsPreference,
  MeetupsSubscription
} = require('../models')

class MeetupController {
  async store (req, res) {
    const meetup = await Meetup.create({
      ...req.body,
      coverPhoto: '',
      userId: req.userId
    })

    await MeetupsPreference.destroy({
      where: {
        meetupId: meetup.id
      }
    })

    await meetup.addPreferences(req.body.Preferences.map(pref => pref.id))

    return res.json(meetup)
  }

  async index (req, res) {
    return res.json(
      await Meetup.findAll({
        include: [
          { model: User, required: true },
          { model: Preference, required: false }
        ]
      })
    )
  }

  async show (req, res) {
    const { id } = req.params

    return res.json(
      await Meetup.findByPk(id, {
        include: [
          { model: User, required: false },
          { model: Preference, required: false },
          {
            model: MeetupsSubscription,
            required: false
          }
        ]
      })
    )
  }
}

module.exports = new MeetupController()
