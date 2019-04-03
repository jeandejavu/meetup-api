module.exports = (sequelize, DataTypes) => {
  const Meetup = sequelize.define('Meetup', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    coverPhoto: DataTypes.STRING,
    eventDate: DataTypes.DATE
  })

  Meetup.associate = models => {
    Meetup.belongsTo(models.User, { foreignKey: 'userId' })
    Meetup.belongsToMany(models.Preference, {
      through: models.MeetupsPreference,
      foreignKey: 'meetupId'
    })
    Meetup.belongsToMany(models.User, {
      through: models.MeetupsSubscription,
      foreignKey: 'meetupId'
    })
    Meetup.hasMany(models.MeetupsSubscription)
  }

  return Meetup
}
