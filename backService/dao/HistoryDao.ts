import { MysqlUtil } from '../util/MysqlHelper';
import History from '../entity/History';

export default class HistoryDao {
    static async addOne(history: History) {
        let sql = `insert into history(planId,fileNum,fileSize,speed,startTime,endTime,comment) value(?,?,?,?,?,?,?)`;
        let res = await MysqlUtil.execute(sql, [history.planId, history.fileNum, history.fileSize, history.speed, history.startTime, history.endTime, history.comment]);
        return res.fields.insertId;
    }
}