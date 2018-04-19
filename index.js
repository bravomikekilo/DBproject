'use strict'
const argparse = require('argparse');
const Koa = require('koa');
const fs = require('fs');
const BodyParser = require('koa-body-parser')
const Router = require('koa-router');
const Serve = require('koa-static');
const Logic = require('./logic');

const parser = argparse.ArgumentParser({
    description: 'a project for database class'
});

parser.addArgument('--config_file');
parser.addArgument('--db_config');

const args = parser.parseArgs();
console.log('argument parsed');
console.log(args);

let configContent = fs.readFileSync(args.config_file, 'utf-8')
const config = JSON.parse(configContent)
console.log('config loaded');
console.log(config);

let dbContent = fs.readFileSync(args.db_config, 'utf-8')
const dbConfig = JSON.parse(dbContent)

const staticRoot = __dirname + '/dist'

const app = new Koa();
const serve = new Serve(staticRoot);
const bodyparser = new BodyParser();

const router = new Logic.MainRouter(dbConfig).router;
app.use(serve);
app.use(bodyparser);
app.use(router.routes()).use(router.allowedMethods());




app.listen(config.port, config.base_url);



