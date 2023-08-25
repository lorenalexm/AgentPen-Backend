'use strict';

/**
 * generation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { UnauthorizedError, NotFoundError } = require('@strapi/utils').errors;

module.exports = createCoreController('api::generation.generation', ({strapi}) => ({
	async find(ctx) {
		const { user } = ctx.state;
		const { meta } = await super.find(ctx, { populate: true });

		var generations = await strapi.entityService.findMany('api::generation.generation', {
			populate: ['owner', 'property']
		});

		let filtered = generations.filter(generation => generation.owner.id == user.id);
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

		var generation = await strapi.entityService.findOne('api::generation.generation', id, {
			populate: ['owner', 'property']
		});
		if(!generation) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(generation.owner.id == user.id) {
			let sanitized = await this.sanitizeOutput(generation, ctx);
			return this.transformResponse(sanitized, meta);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},

	async update(ctx) {
		const { user } = ctx.state;
		const { id } = ctx.params;

		var generation = await strapi.entityService.findOne('api::generation.generation', id, {
			populate: ['owner', 'property'],
		});
		if(!generation) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(generation.owner.id == user.id) {
			let updated = await strapi.entityService.update('api::generation.generation', id, ctx.request.body);
			let sanitized = await this.sanitizeOutput(updated, ctx);
			return this.transformResponse(sanitized);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},

	async delete(ctx) {
		const { user } = ctx.state;
		const { id } = ctx.params;

		var generation = await strapi.entityService.findOne('api::generation.generation', id, {
			populate: ['owner', 'property']
		});
		if(!generation) {
			throw new NotFoundError("Unable to find the requested content!");
		}

		if(generation.owner.id == user.id) {
			let deleted = await strapi.entityService.delete('api::generation.generation', id);
			let sanitized = await this.sanitizeOutput(deleted, ctx);
			return this.transformResponse(sanitized);
		}
		throw new UnauthorizedError("Unauthorized for this content!");
	},
}))
