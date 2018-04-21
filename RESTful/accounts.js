/**
 * @param {MainRouter} context - Context for response function
 *
 */
function setUp(context){

    context.router.get('/paccounts', async (ctx, next) => {
        try{
            const username = ctx.request.query['username'];
            const result = await context.pgPool.query(
                'SELECT paccounts.id FROM paccounts WHERE paccounts.username = $1',
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

