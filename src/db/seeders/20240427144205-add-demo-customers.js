module.exports = {
	up: (queryInterface /* , Sequelize */) => {
		return queryInterface.bulkInsert('customer', [
			{
				name: 'Loyal Customer 1',
				email: 'loyal.customer1@example.com',
				created_date_time: new Date(),
				modified_date_time: new Date(),
				birthday: new Date(),
			},
		]);
	},
	down: (queryInterface /* , Sequelize */) => {
		return queryInterface.bulkDelete('customer', null, {});
	},
};
