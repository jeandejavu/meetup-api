const Mail = require('../services/Mail')

class MeetupSubscribeMail {
  get key () {
    return 'MeetupSubscribeMail'
  }

  async handle (job, done) {
    const { user, meetup } = job.data

    const from = `"${process.env.MAIL_FROM_NAME}" <${
      process.env.MAIL_FROM_EMAIL
    }>`

    await Mail.sendMail({
      from: from,
      to: user.email,
      subject: `Meetup : ${meetup.title}`,
      template: 'subscribe',
      context: { user, meetup }
    })

    return done()
  }
}

module.exports = new MeetupSubscribeMail()
