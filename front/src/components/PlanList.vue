<template>
  <div>
    <el-table :data="planList" style="width:100%" :show-header="true">
      <el-table-column prop="createdDate" label="创建时间" width="120" />
      <el-table-column prop="planName" label="名称" width="120" />
      <el-table-column prop="sourcePath" label="备份路径" width="200" />
      <el-table-column prop="targetPath" label="存储路径" width="200" />
      <el-table-column prop="nextLaunchTime" label="下次执行时间" width="160" />
      <el-table-column prop="launchInterval" label="间隔(天)" width="100" />
      <el-table-column prop="ignoreList" label="忽略文件" show-overflow-tooltip />>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="showHistory(scope.row)">查看历史</el-button>
          <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="选择路径" :visible.sync="showDialog">
      <BackupHistory :planId="currentPlanId" />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import BackupHistory from "./BackupHistory";
export default {
  name: "PlanList",
  components: {
    BackupHistory,
  },
  data() {
    return {
      planList: [],
      showDialog: false,
      currentPlanId: -1,
    };
  },
  created() {
    axios.get("/plan").then((res) => {
      res.forEach((item) => {
        item.launchInterval = item.launchInterval / (24 * 60 * 60 * 1000);
        item.ignoreList = item.ignoreList.join("，");
        item.createdDate = moment(item.createdDate).format("YYYY-MM-DD");
        item.nextLaunchTime = moment(item.nextLaunchTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
      this.planList = res;
    });
  },
  methods: {
    edit(row) {},
    deleteOne(row) {
      axios.delete("/plan/" + row.planId).then(() => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.planList.splice(this.planList.indexOf(row), 1);
      });
    },
    showHistory(row) {
      this.currentPlanId = row.planId;
      this.showDialog = true;
    },
  },
};
</script>

<style></style>
