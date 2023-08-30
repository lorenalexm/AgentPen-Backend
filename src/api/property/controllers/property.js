'use strict';

/**
 * property controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { UnauthorizedError, NotFoundError } = require('@strapi/utils').errors;

module.exports = createCoreController('api::property.property', ({ strapi }) => ({
	async find(ctx) {
		const { user } = ctx.state;
		const { meta } = await super.find(ctx, { populate: true });

		var properties = await strapi.entityService.findMany('api::property.property', {
			populate: ['owner', 'generations']
		});

		let filtered = properties.filter(property => property.owner.id == user.id);
		if(!filtered) {
			throw new NotFoundError("Unable to find the requested content!");
		}
		let sanitized = await this.sanitizeOutput(filtered, ctx);
		return this.transformResponse(sanitized, meta);
	},

	async findOne(ctx) {
		const { user } = ctx.state;
		const { meta } = await super.findOne(ctx, { populate: true });
		const { id } = ctx.params;

		var property = await strapi.entityService.findOne('api::property.property', id, {
			populate: ['owner', 'generations']
		});
		if(!property) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(property.owner.id == user.id) {
			let sanitized = await this.sanitizeOutput(property, ctx);
			return this.transformResponse(sanitized, meta);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},

	async update(ctx) {
		const { user } = ctx.state;
		const { id } = ctx.params;

		var property = await strapi.entityService.findOne('api::property.property', id, {
			populate: ['owner', 'generations'],
		});
		if(!property) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(property.owner.id == user.id) {
			let updated = await strapi.entityService.update('api::property.property', id, ctx.request.body);
			let sanitized = await this.sanitizeOutput(updated, ctx);
			return this.transformResponse(sanitized);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},

	async delete(ctx) {
		const { user } = ctx.state;
		const { id } = ctx.params;

		var property = await strapi.entityService.findOne('api::property.property', id, {
			populate: ['owner', 'generations']
		});
		if(!property) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(property.owner.id == user.id) {
			let deleted = await strapi.entityService.delete('api::property.property', id);
			let sanitized = await this.sanitizeOutput(deleted, ctx);
			return this.transformResponse(sanitized);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},
}));
