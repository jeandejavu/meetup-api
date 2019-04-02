const { UsersPreference } = require('../models')

class UserPreferenceController {
  async index (req, res) {
    const { userId } = req
    return res.json(
      await UsersPreference.findAll({ where: { user_id: userId } })
    )
  }

  async store (req, res) {
    const { userId, body } = req
    const insertsPreferences = body.preferences.map(preference => ({
      user_id: userId,
      preference_id: preference.id
    }))

    await UsersPreference.destroy({
      where: {
        user_id: userId
      }
    })

    const userPreferences = await UsersPreference.bulkCreate(insertsPreferences)
    return res.json(userPreferences)
  }
}

module.exports = new UserPreferenceController()
