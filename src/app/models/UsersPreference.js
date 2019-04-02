module.exports = (sequelize, DataTypes) => {
  const UserPreference = sequelize.define('UsersPreference', {})

  UserPreference.associate = models => {
    UserPreference.belongsTo(models.User, { foreignKey: 'user_id' })
    UserPreference.belongsTo(models.Preference, { foreignKey: 'preference_id' })
  }

  return UserPreference
}
