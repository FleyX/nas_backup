import SqliteHelper from '../util/SqliteHelper';
import History from '../entity/History';

export default class HistoryDao {
    /**
     * 增加一个
     * @param history history
     */
    static async addOne(history: History) {
        let sql = `insert into history(planId,fileNum,fileSize,speed,startTime,endTime,comment) values(?,?,?,?,?,?,?)`;
        let res = await SqliteHelper.db.run(sql, [history.planId, history.fileNum, history.fileSize, history.speed, history.startTime, history.endTime, history.comment]);
        return res.lastID;
    }

    /**
     * 删除某个plan下所有的历史记录
     * @param planId planId
     */
    static async deleteByPlanId(planId: number) {
        await SqliteHelper.db.run("delete from history where planId=?", planId);
    }

    /**
     * 获取某个备份计划下的备份历史
     * @param planId planId
     */
    static async getByPlanId(planId:number){
        return await SqliteHelper.db.all("select * from history where planId=?",planId);
    }
}