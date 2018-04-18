
/**
 * @param {MainRouter} context - Context for response function
 */
function setUp(context){

    // GET /doctors return all doctors
    context.router.get('/doctors', async (ctx, next) => {
        try {
            const result = await context.pgPool.query(
                'SELECT doctors.name, doctors.office FROM doctors;'
            );
            ctx.status = 200;
            ctx.body = JSON.stringify(result.rows);
        } catch (e) { ctx.status = 500; }
    });

    // GET /office return all office
    context.router.get('/office', async (ctx, next) => {
        try {
            const result = await context.pgPool.query(
                'SELECT doctors.office FROM doctors GROUP BY doctors.office;'
            );
            ctx.status = 200;
            ctx.body = JSON.stringify(result.rows);
        } catch (e) {ctx.status = 500; }
    });

}

exports.setUp = setUp

