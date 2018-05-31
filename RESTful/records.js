
function setUp(context){

    // query for records
    context.router.get('/records', async(ctx, next) => {
        try{
            ctx.status = 200;
            const query = ctx.request.query;
            if(query.id !== undefined) {
                const result = await context.pgPool.query(
                    `SELECT records.medicine, records.description
                     FROM records
                     WHERE records.id = $1; `,
                    [query.id]
                );
                ctx.body = JSON.stringify(result.rows);
            } else if(query.from !== undefined || query.to !== undefined){
                const fromDate = query.from === undefined ? new Date('1970-1-1') : new Date(query.from);
                const toDate = query.to === undefined ? new Date() : new Date(query.to);
                const result = await context.pgPool.query(
                    `SELECT records.medicine, records.description, reservations.commitdate as date
                    FROM records INNER JOIN reservations
                    ON records.id = reservations.id
                    WHERE reservations.commitdate
                    BETWEEN $1 and $2; `,
                    [fromDate, toDate]
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

    context.router.get('/records/:pid', async(ctx, next) => {
        try{
            ctx.status = 200;
            const query = ctx.request.query;
            if(query.from !== undefined || query.to !== undefined){
                const fromDate = query.from === undefined ? new Date('1970-1-1') : new Date(query.from);
                const toDate = query.to === undefined ? new Date() : new Date(query.to);
                const result = await context.pgPool.query(
                    `SELECT records.medicine, records.description, reservations.commitdate as date
                     FROM records INNER JOIN reservations
                     ON records.id = reservations.id
                     WHERE reservations.commitdate
                     BETWEEN $1 and $2
                     AND reservations.pid = $3;`,
                     [fromDate, toDate, ctx.params.pid]
                );
                ctx.body = JSON.stringify(result.rows);
            } else {
                const result = await context.pgPool.query(
                    `SELECT records.id, records.medicine, records.description, reservations.commitdate as date
                    FROM records INNER JOIN reservations
                    ON records.id = reservations.id
                    WHERE reservations.pid = $1;`,
                    [ctx.params.pid]
                );
                ctx.body = JSON.stringify(result.rows);
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
            console.log(content)
            console.log(content.medicine)
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