<template>
  <div>
    <el-table
      :data="historyList"
      style="width:100%"
      :show-header="true"
      size="mini"
    >
      <el-table-column prop="fileNum" label="文件数目" />
      <el-table-column prop="fileSize" label="总大小(MB)" />
      <el-table-column prop="speed" label="备份速度(MB/s)" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="duration" label="耗时(s)" />
      <el-table-column
        prop="comment"
        label="失败原因(空表示成功)"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "BackupHistory",
  props: {
    planId: Number
  },
  watch: {
    planId() {
      this.historyList = [];
      this.getHistory();
    }
  },
  data() {
    return {
      historyList: []
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      axios.get(`/plan/${this.planId}/history`).then(res => {
        res.forEach(item => {
          item.duration =
            item.fileNum == 0
              ? 0
              : Math.round((item.endTime - item.startTime) / 60) / 1000;
          item.startTime = moment(item.startTime).format("YYYY-MM-DD HH:mm:ss");
        });
        this.historyList = res;
      });
    }
  }
};
</script>
