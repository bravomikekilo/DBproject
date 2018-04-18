const {Pool, Client} = require('pg');
const Router = require('koa-router');
const Doctors = require('./doctors');


/**
 * MainRouter 主路由及响应函数所需的全局上下文
 * @constructor
 * @param {object} dbConfig - a JSON contains Database config for pgPool
 * @member {Pool} pgPool - a PostgreSQL connection pool config with dbConfig
 * @member {Router} router - a Koa router work as application main router
 */
class MainRouter {

    constructor(dbConfig) {
        this.pgPool = new Pool(dbConfig);
        this.router = new Router();

        this.router.get('/', async (ctx, next) => {
            ctx.redirect('/index.html');
        });

        this.router.get('/test/items', async (ctx, next) => {
            try{
                const result = await this.pgPool.query('SELECT items.content FROM items');
                ctx.status = 200;
                ctx.body = JSON.stringify(result.rows);
            } catch (e) { ctx.status = 500; }
        });

        this.router.post('/test/items', async (ctx, next) => {
            try {
                ctx.status = 200;
                const content = ctx.request.body;
                await this.pgPool.query('INSERT INTO items (content) VALUES ($1)', [content]);
            }
            catch (e) { ctx.status = 500; }
        });

        Doctors.setUp(this)

    }
}

exports.MainRouter = MainRouter


