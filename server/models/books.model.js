module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Book', {
      title: { type: DataTypes.STRING },
      author: { type: DataTypes.STRING },
      date: { type: DataTypes.STRING },
      cover_image: { type: DataTypes.STRING },
      rating: { type: DataTypes.STRING, min: 1, max: 5 }
    }, {});

    Books.associate = function (models) {
      // associations can be defined here
      Books.hasMany(models.Library);
    };

    return Books;
};