/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = (config) => {
	// Let Babel compile outside of src/.
	const tsRule = config.module.rules[1].oneOf[2];
	tsRule.include = undefined;
	tsRule.exclude = /node_modules/;

	config.module.rules.push({
		test: /\.mjs$/,
		include: /node_modules/,
		type: "javascript/auto"
	})

	return config;
};