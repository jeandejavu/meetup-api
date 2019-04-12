const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          console.log(user)
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.passwordHash
    return values
  }

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  User.associate = models => {
    User.belongsToMany(models.Preference, {
      through: models.UsersPreference,
      foreignKey: 'userId'
    })
    User.belongsToMany(models.Meetup, {
      through: models.MeetupsSubscription,
      foreignKey: 'userId'
    })
  }

  return User
}
