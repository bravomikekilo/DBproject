
function setUp(context){

    context.router.get('/patients/:pid', async(ctx, next) => {
        try{
            ctx.status = 200;
            const result = await context.pgPool.query(
                `SELECT patients.name, patients.birthday, patients.gender
                 FROM patients
                 WHERE patients.id = $1;`,
                [parseInt(ctx.params.pid)]
            )
            ctx.body = JSON.stringify(result.rows);
        } catch(e) {
            console.log(e);
            ctx.status = 500;
        }
    });
}


exports.setUp = setUp