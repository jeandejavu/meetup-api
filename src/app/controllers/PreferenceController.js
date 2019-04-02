const { Preference } = require('../models')

class PreferenceController {
  async index (req, res) {
    return res.json(await Preference.findAll())
  }
}

module.exports = new PreferenceController()
