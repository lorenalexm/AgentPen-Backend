'use strict';

/**
 * property router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const uid = 'api::property.property';
const field = 'owner';

const SetOwner = {
	name: 'global::SetOwner',
	config: {
		field,
		uid,
	},
};

const IsOwner = {
	name: 'global::IsOwner',
	config: {
		field,
		uid,
	},
};

module.exports = createCoreRouter(uid, {
	config: {
		create: {
			middlewares: [SetOwner],
		},
		find: {
			policies: [IsOwner],
		},
		findOne: {
			policies: [IsOwner],
		},
		delete: {
			policies: [IsOwner],
		},
		update: {
			policies: [IsOwner],
			middlewares: [SetOwner],
		},
	},
});
