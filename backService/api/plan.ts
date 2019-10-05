import { Context } from "koa";
import planService from '../service/planService';

const router = {};

router["PUT /plan"] = async function (ctx: Context) {
    let res = await planService.addOne(ctx.request.body);
    ctx.body = res;
};

export default router;
