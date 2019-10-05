import { MysqlUtil } from '../util/MysqlHelper';
import Plan from '../entity/Plan';

export default class PlanDao {
    static async addOne(plan: Plan): Promise<Number> {
        let res = await MysqlUtil.execute("insert into plan(planName,description,sourcePath,targetPath,nextLaunchTime,launchInterval,latestHistoryId,ignoreList) value(?,?,?,?,?,?,?,?)"
            , [plan.planName, plan.description, plan.sourcePath, plan.targetPath, plan.nextLaunchTime, plan.lanuchInterval, plan.latestHistoryId, JSON.stringify(plan.ignoreList)]);
        return res.fields.insertId;
    }
}