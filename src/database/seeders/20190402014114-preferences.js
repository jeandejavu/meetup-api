'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'preferences',
      [
        {
          description: 'Front-end',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Back-end',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Mobile',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'DevOps',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Gestão',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Marketing',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Preference', null, {})
  }
}
