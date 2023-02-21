const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const routers = [];
const sessionManager = require('./modules/sessionManager');
const app = express();
const port = 3050; 

app.use(session(sessionManager.sess));
app.use(express.static('./public'));
nunjucks.configure('./public', {
    autoescape: false,
    express: app,
	noCache: true
});

// Routing
function mountRouters() {
	console.log("\n==== Mounting Routers ===");
	let routerfolder = fs.readdirSync(path.join(__dirname, "routers"));
    console.log(`Found ${routerfolder.length} router(s). Mounting..`);
	routerfolder.forEach(element => {
		let router = require(`./routers/${element}`);
		console.log(`Loaded Router: '${element}' on '${router.mount}'`);
		app.use(router.mount, router.router);
		routers.push(router);
	});
	console.log("==== Routers Mounted ===\n");
}

// Startup
mountRouters();
// Startup
app.listen(port, () => console.log(`${process.env.SERVER_NAME} running on ${port}!`))
