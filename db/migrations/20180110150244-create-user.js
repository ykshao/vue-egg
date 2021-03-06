'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    const {INTEGER, STRING, DATE, TEXT, BOOLEAN} = Sequelize
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      login: {
        type: STRING
      },
      name: {
        type: STRING
      },
      password: {
        type: STRING
      },
      email: {
        type: STRING
      },
      permissions: {
        type: TEXT,
        defaultValue: ''
      },
      is_activated: {
        type: BOOLEAN,
        defaultValue: 1
      },
      last_login: {
        type: DATE,
        allowNull: true        
      },
      is_admin: {
        type: BOOLEAN,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: DATE
      },
      updated_at: {
        allowNull: false,
        type: DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};