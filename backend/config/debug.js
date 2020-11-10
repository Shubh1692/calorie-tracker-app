(function () {
	const debug = require("debug"),
		{ argv } = require("yargs"),
		{ environment = "dev" } = argv,
		serverDebugger = debug("meetsocial:server"),
		databaseDebugger = debug("meetsocial:database"),
		errorDebugger = debug("meetsocial:error");
	if (environment === "dev") {
		debug.enable("meetsocial:*");
	}
	module.exports = {
		serverDebugger,
		errorDebugger,
		databaseDebugger
	};
}());