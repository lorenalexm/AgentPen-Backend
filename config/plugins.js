module.exports = ({ env }) => ({
	'transformer': {
		enabled: true,
		config: {
			responseTransforms: {
				removeAttributesKey: true,
				removeDataKey: true,
			},
			requestTransforms: {
				wrapBodyWithDataKey: true
			}
		},
	},
	'random-sort': {
		enabled: true,
	},
	'email': {
		config: {
			provider: 'nodemailer',
			providerOptions: {
				host: env('SMTP_HOST'),
				port: env('SMTP_PORT'),
				auth: {
					user: env('SMTP_USERNAME'),
					pass: env('SMTP_PASSWORD')
				}
			},
			settings: {
				defaultFrom: 'hello@agentpen.app',
				defaultReplyTo: 'hello@agentpen.app'
			}
		}
	}
});
