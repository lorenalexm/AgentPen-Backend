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
				host: 'localhost',
				port: 1025,
				ignoreTLS: true,
			},
			settings: {
				defaultFrom: 'hello@agentpen.app',
				defaultReplyTo: 'hello@agentpen.app'
			}
		}
	}
});
