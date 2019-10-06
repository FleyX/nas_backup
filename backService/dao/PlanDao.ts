import { MysqlUtil } from '../util/MysqlHelper';
import Plan from '../entity/Plan';

export default class PlanDao {
    /**
     * 新增一个备份计划
     * @param plan plan
     */
    static async addOne(plan: Plan): Promise<number> {
        let res = await MysqlUtil.execute("insert into plan(planName,description,sourcePath,targetPath,nextLaunchTime,launchInterval,latestHistoryId,ignoreList) value(?,?,?,?,?,?,?,?)"
            , [plan.planName, plan.description, plan.sourcePath, plan.targetPath, plan.nextLaunchTime, plan.lanuchInterval, plan.latestHistoryId, JSON.stringify(plan.ignoreList)]);
        return res.fields.insertId;
    }

    /**
     * 获取所有待执行的plan
     */
    static async getNeedActionPlan(): Promise<Array<Plan>> {
        let sql = `select * from plan where nextLaunchTime < ${Date.now()} order by nextLaunchTime`;
        return await MysqlUtil.getRows(sql, []);
    }

    /**
     * 更新某个计划的下次执行时间
     * @param id planId
     */
    static async updateNextlaunchTimeAndLatestHistoryId(planId: number, historyId: number) {
        await MysqlUtil.execute(`update plan set nextLaunchTime = nextLaunchTime+launchInterval,latestHistoryId=? where planId=?`
            , [historyId, planId]);
    }

    static async deleteByPlanId(planId: number) {
        await MysqlUtil.execute(`delete from plan where planid=?`, [planId]);
    }
}