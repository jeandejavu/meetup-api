const { Meetup } = require('../models')

class MeetupUploadController {
  async store (req, res) {
    const { filename: coverPhoto } = req.file
    const { id } = req.body
    let meetup = await Meetup.findByPk(id)
    const result = await meetup.update({ coverPhoto })

    return res.json(result)
  }
}

module.exports = new MeetupUploadController()
