'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            companyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    // User belongsTo Company 1:1
                    model: 'Companies',
                    key: 'id',
                },
            },
            company_code: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
