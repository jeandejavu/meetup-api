const { UsersPreference } = require('../models')

class UserPreferenceController {
  async index (req, res) {
    const { userId } = req
    return res.json(await UsersPreference.findAll({ where: { userId } }))
  }

  async store (req, res) {
    const { userId, body } = req
    const insertsPreferences = body.preferences.map(preference => ({
      userId,
      preferenceId: preference.id
    }))

    await UsersPreference.destroy({
      where: {
        userId
      }
    })

    const userPreferences = await UsersPreference.bulkCreate(insertsPreferences)
    return res.json(userPreferences)
  }
}

module.exports = new UserPreferenceController()
