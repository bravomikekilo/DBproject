
function setUp(context){

    // query for records
    context.router.get('/records', async(ctx, next) => {
        try{
            ctx.status = 200;
            const query = ctx.request.query;
            if(query.id !== undefined) {
                const result = context.pgPool.query(
                    `SELECT records.medicine, records.description
                     FROM records
                     WHERE records.id = $1; `,
                    [query.id]
                );
                ctx.body = JSON.stringify(result.rows);
            } else {
                ctx.status = 500;
                ctx.body = 'you must specify code'
            }
        } catch(e) {
            console.log(e);
            ctx.status = 500;
        }
    });

    // add new records

    context.router.post('/records', async(ctx, next) => {
        try{
            ctx.status = 200;
            const content = ctx.request.body;
            const result = await context.pgPool.query(
                `INSERT INTO records (id, medicine, description)
                 VALUES ($1, $2, $3); `,
                [content.id, content.medicine, content.description]
            );
            console.log(result);
        } catch(e) {
            console.log(e);
            ctx.status = 500;
        }
    });

}

exports.setUp = setUp;