module.exports = (sequelize, DataTypes) => {
  const MeetupsPreference = sequelize.define('MeetupsPreference', {})

  MeetupsPreference.associate = models => {
    MeetupsPreference.belongsTo(models.Meetup, { foreignKey: 'meetupId' })
    MeetupsPreference.belongsTo(models.Preference, {
      foreignKey: 'preferenceId'
    })
  }

  return MeetupsPreference
}
