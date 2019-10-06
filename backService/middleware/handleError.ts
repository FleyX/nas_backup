let f = async (ctx, next) => {
    try {
        await next();
        if (ctx.body === undefined || ctx.body === null) {
            ctx.body = "";
        }
    } catch (error) {
        if (error.status != undefined) {
            ctx.status = error.status;
        } else {
            ctx.status = 500;
        }
        ctx.body = error.message;
        console.error(error);
    }
}

export default f;