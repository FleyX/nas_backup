<template>
  <div>
    <el-table :data="dataList" style="width:100%" :show-header="true">
      <el-table-column prop="name" label="路径" />
      <el-table-column prop="isOk" label="健康状态" />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详情" :visible.sync="showDialog">
      <div class="detailText">{{showText}}</div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "DiskInfo",
  components: {},
  data() {
    return {
      dataList: [],
      showDialog: false,
      showText: "",
    };
  },
  created() {
    axios.get("/disk/info").then((res) => {
      res.forEach((item) => (item.isOk = item.isOk ? "正常" : "损坏"));
      this.dataList = res;
    });
  },
  methods: {
    detail(row) {
      this.showText = row.detail;
      this.showDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.detailText {
  white-space: pre-line;
}
</style>