
/**
 * @param {MainRouter} context - Context for response function
 */
function setUp(context){

    // GET /doctors return all doctors
    context.router.get('/doctors', async (ctx, next) => {
        try {
            const result = await context.pgPool.query(
                'SELECT doctors.name, doctors.office FROM doctors'
            );
            ctx.status = 200;
            ctx.body = JSON.stringify(result.rows);
        } catch (e) {
            console.log(e)
            ctx.status = 500;
        }
    });

    // GET /office return all office
    context.router.get('/offices', async (ctx, next) => {
        try {
            const result = await context.pgPool.query(
                'SELECT doctors.office FROM doctors GROUP BY doctors.office'
            );
            ctx.status = 200;
            ctx.body = JSON.stringify(result.rows);
        } catch (e) {
            console.log(e)
            ctx.status = 500;
        }
    });

    context.router.get('/offices/:office', async(ctx, next) => {
        try{
            const result = await context.pgPool.query(
                'SELECT doctors.id, doctors.name FROM doctors WHERE doctors.office = $1',
                [ctx.params.office]
            );
            ctx.status = 200;
            ctx.body = JSON.stringify(result.rows);
        } catch (e) {
            console.log(e)
            ctx.status = 500;
        }
    })

}

exports.setUp = setUp

