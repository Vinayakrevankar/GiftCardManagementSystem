const sql = require('./sql');

exports.getAllFav = async(SQLConnection, idUser) => SQLConnection.execute(sql.GET_ALL_FAV, {idUser});

exports.addFav = async (SQLConnection, obj) =>  SQLConnection.execute(sql.INSERT_FAV, obj, true);

exports.deleteFavByID = async(SQLConnection, idUser, idProduct) => SQLConnection.execute(sql.DELETE_FAV_BYPRODUCT, {idUser, idProduct}, true);