module.exports = {
	project_name: 'Asistiva',

	db: {
		name: 'asistiva'
	},

	envs: {
		development: {
			port: 3000,
			db: {
				host: 'localhost',
				port: 27017,
				name: 'asistiva'
			}
		}
	}
};
