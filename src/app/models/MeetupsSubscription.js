module.exports = (sequelize, DataTypes) => {
  const MeetupsSubscription = sequelize.define('MeetupsSubscription', {})

  MeetupsSubscription.associate = models => {
    MeetupsSubscription.belongsTo(models.Meetup, { foreignKey: 'id' })
    MeetupsSubscription.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  }

  return MeetupsSubscription
}
