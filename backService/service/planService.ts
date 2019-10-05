import config from '../config';
import Plan from '../entity/Plan';
import PlanDao from '../dao/PlanDao';

class PlanService {
    static async addOne(plan: Plan) {
        plan.latestHistoryId = 0;
        plan.latestHistoryDetail = null;
        let id = await PlanDao.addOne(plan);
        plan.planId = id;
        return plan;
    }
}

export default PlanService;