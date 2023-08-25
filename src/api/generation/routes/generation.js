'use strict';

/**
 * generation router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const uid = 'api::generation.generation';
const field = 'owner';

const SetOwner = {
	name: 'global::SetOwner',
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
		update: {
			middlewares: [SetOwner],
		},
	},
});
