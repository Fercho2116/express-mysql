'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('fotoetiquetas', {
      fields: ['foto_id'],
      name: 'foto_id_fk',
      type: 'foreign key',
      references: {
      table: 'fotos',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
      });

      await queryInterface.addConstraint('fotoetiquetas', {
        fields: ['etiqueta_id'],
        name: 'etiqueta_id_fk',
        type: 'foreign key',
        references: {
        table: 'etiquetas',
        field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'set null'
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('fotoetiquetas', 'foto_id_fk')
    await queryInterface.removeConstraint('fotoetiquetas', 'etiqueta_id_fk')
  }
};
