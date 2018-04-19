const {Pool, Client} = require('pg');
const Router = require('koa-router');

// require all RESTful api in RESTful folder
const Doctors = require('./RESTful/doctors');
const Accounts = require('./RESTful/accounts');
const Reservation = require('./RESTful/reservations');


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

        // deploy RESTful api on main router
        Accounts.setUp(this)
        Doctors.setUp(this)
        Reservation.setUp(this)

    }
}

exports.MainRouter = MainRouter


