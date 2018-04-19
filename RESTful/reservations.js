/**
 * @param {MainRouter} context - context for response function
 */

function setUp(context){

    context.router.get('/reservations', async(ctx, next) => {
        try{
            ctx.status = 200;
            if(ctx.params.pid !== undefined){
                const result = await context.pgPool.query(
                    `SELECT doctors.id, doctors.name
                     FROM today_reservations INNER JOIN doctors USING(doctors.id)
                     WHERE pid = $1`,
                    [ctx.params.pid]
                );
                ctx.body = JSON.stringify(result.rows);
            } else if(ctx.params.did !== undefined) {
                const result = await context.pgPool.query(
                    `SELECT patients.id, patients.name
                     FROM today_reservations INNER JOIN patients USING(patients.id)
                     WHERE did = $1`,
                    [ctx.params.did]
                );
                ctx.body = JSON.stringify(result.rows);
            } else {
                ctx.body = 'must specify your code';
                ctx.status = 401;
            }
        } catch(e) {
            console.log(e);
            ctx.status = 500;
        }
    })

    context.router.post('/reservations', async(ctx, next) => {
        const client = context.pgPool.connect();
        try{
            ctx.status = 200;
            const content = ctx.request.body;
            const result = await client.query(
                "INSERT INTO reservations (commitdate, did, pid, section) VALUES (currentdate, $1, $2, $3) ",
                [content.pid, content.did, content.section]
            );
            console.log(result);
            if(result.rowCount !== 1){
                ctx.status = 500;
                ctx.body = 'reservation failed';
            }
        } catch(e) {
            console.log(e);
            ctx.status = 500;
        } finally {
            client.release();
        }
    })

    context.router.delete('/reservations', async(ctx, next) => {
        const client = context.pgPool.connect();
        try{
            ctx.status = 200;
            const content = ctx.request.body;
            const result = await client.query(

            );
        } catch (e) {
            console.log(e);
            ctx.status = 500;
        } finally {
            client.release();
        }
    })

}


exports.setUp = setUp
