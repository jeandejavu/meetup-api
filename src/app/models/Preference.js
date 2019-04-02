module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    description: DataTypes.STRING
  })

  Preference.associate = models => {
    Preference.belongsToMany(models.User, { through: models.UsersPreference })
  }

  return Preference
}
