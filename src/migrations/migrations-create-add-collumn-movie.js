module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Movies", "bookingTick", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  //   down: (queryInterface, Sequelize) => {
  //     return Promise.all([
  //       queryInterface.addColumn("Movie", "bookingTick", {
  //         type: Sequelize.INTEGER,
  //         allowNull: true,
  //       }),
  //     ]);
  //   },
};
