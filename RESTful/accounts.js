/**
 * @param {MainRouter} context - Context for response function
 *
 */
function setUp(context){

    context.router.get('/paccounts', async (ctx, next) => {
        try{
            const username = ctx.request.query['username'];
            const password = ctx.request.query['password'];
            const result = await context.pgPool.query(
                `SELECT paccounts.id, paccounts.password
                 FROM paccounts
                 WHERE paccounts.username = $1`,
                [username]
            );
            const correctPassword = result.rows[0]['password'];
            if(result.rowCount === 1 && correctPassword === password){
                ctx.body = result.rows[0].id;
                ctx.status = 200;
            } else {
                ctx.body = "incorrect username and password";
                ctx.status = 401;
            }
        } catch (e) {
            console.log(e);
            ctx.status = 500;
        }
    })

    context.router.post('/paccounts', async (ctx, next) => {
        try{
            const content = ctx.request.body;
            const client = await context.pgPool.connect();
            try{
                await client.query('BEGIN');
                const ids = await client.query(
                    `INSERT INTO patients (name, gender, birthday)
                     VALUES ($1, $2, $3)
                     RETURNING id;
                    `,
                    [content.name, content.gender, content.birthday]
                );
                console.log(ids);
                const id = ids.rows[0]['id'];
                const row = await client.query(
                    `INSERT INTO paccounts
                     VALUES ($1, $2, $3);
                    `,
                    [id, content.username, content.password]
                );
                await client.query('COMMIT');
                ctx.status = 200;
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (e) {
            console.log(e);
            ctx.status = 500;
        }
    })



    context.router.get('/daccounts', async (ctx, next) => {
        try{
            const username = ctx.request.query['username'];
            const result = await context.pgPool.query(
                'SELECT daccounts.id FROM daccounts WHERE daccounts.username = $1',
                [username]
            );
            if(result.rowCount === 1){
                ctx.body = result.rows[0].id;
                ctx.status = 200;
            } else {
                ctx.body = "can't find username in database";
                ctx.status = 401;
            }

        } catch (e) {
            console.log(e);
            ctx.status = 500;
        }


    })





}

exports.setUp = setUp;

