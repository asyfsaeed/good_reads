module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('Library', {
      finished: { type : DataTypes.BOOLEAN, default: false },
      rating: { type: DataTypes.INTEGER },
      collection: { type: DataTypes.ENUM, values: ['WANT_TO_READ', 'READING', 'READ', 'FINISHED']},
    }, {});

    Library.associate = function (models) {
      // associations can be defined here
      Library.belongsTo(models.User);
      Library.belongsTo(models.Book);
    };

    return Library;
};