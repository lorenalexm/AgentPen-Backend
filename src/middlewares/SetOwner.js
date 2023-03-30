'use strict';
const { yup } = require('@strapi/utils');

const SetOwnerConfigSchema = yup.object({
	field: yup.string().required('SetOwner middleware needs a "field" key in the configurations.'),
	uid: yup.string().required('SetOwner middleware requires a "uid" key in the configurations.'),
});

module.exports = (config, { strapi }) => {
	return async (ctx, next) => {
		try {
			await SetOwnerConfigSchema.validate(config);
			const { field, uid } = config;
			const { id: userId } = ctx.state.user;
			ctx.request.body.data[field] = userId;
			await next();
			if(ctx.response.status == 200) {
				const { id } = ctx.response.body.data;
				await strapi.entityService.update(uid, id, { data: { [field]: userId }});
			}
		} catch(error) {
			await ctx.forbidden(error);
		}
	};
};
