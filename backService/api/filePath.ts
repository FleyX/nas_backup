import { Context } from "koa";
import filePathService from '../service/filePathService';

const router = {};

router["GET /path"] = async function (ctx: Context) {
    ctx.body = await filePathService.getPath(ctx.query.path);
};

export default router;
