module.exports = (sequelize, DataTypes) => {
  const UserPreference = sequelize.define('UsersPreference', {})

  UserPreference.associate = models => {
    UserPreference.belongsTo(models.User, { foreignKey: 'userId' })
    UserPreference.belongsTo(models.Preference, { foreignKey: 'preferenceId' })
  }

  return UserPreference
}
