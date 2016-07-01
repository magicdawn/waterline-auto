/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('TB_TRADE_ACCOUNT', {
		uid: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		chName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		pyFirstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		pyLastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		gender: {
			type: DataTypes.ENUM('男','女'),
			allowNull: true
		},
		idNum: {
			type: DataTypes.STRING,
			allowNull: true
		},
		idAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		marriage: {
			type: DataTypes.ENUM('未婚','已婚','丧偶','离异'),
			allowNull: true
		},
		work: {
			type: DataTypes.ENUM('无业','受雇','创业','学生'),
			allowNull: true
		}
	}, {
		tableName: 'TB_TRADE_ACCOUNT'
	});
};
