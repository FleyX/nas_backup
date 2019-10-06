import config from '../config';
import Plan from '../entity/Plan';
import PlanDao from '../dao/PlanDao';

class PlanService {
    /**
     * 增加一个备份计划
     * @param plan plan
     */
    static async addOne(plan: Plan) {
        plan.latestHistoryId = 0;
        plan.latestHistoryDetail = null;
        let id = await PlanDao.addOne(plan);
        plan.planId = id;
        return plan;
    }

    /**
     * 删除一个备份计划
     * @param planId planId
     */
    static async deleteOne(planId: number) {
        await PlanDao.deleteByPlanId(planId);
    }
}

export default PlanService;