const { Meetup, Preference, User } = require('../models')

class MeetupController {
  async store (req, res) {
    // const { title, description, location } = req.body
    const meetup = await Meetup.create({ ...req.body, userId: req.userId })

    await meetup.addPreferences(
      req.body.meetupsPreferences.map(pref => pref.id)
    )

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
          { model: User, required: true },
          { model: Preference, required: false }
        ]
      })
    )
  }
}

module.exports = new MeetupController()
