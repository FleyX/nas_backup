<template>
  <div class="home">
    <el-menu default-active="1" mode="horizontal" @select="menuSelect">
      <el-menu-item index="1">新增备份计划</el-menu-item>
      <el-menu-item index="2">我的备份计划</el-menu-item>
      <el-menu-item index="3">磁盘状态</el-menu-item>
    </el-menu>
    <!-- 新增备份计划 -->
    <CreatePlan v-if="currentIndex == '1'" />
    <!-- 我的备份计划 -->
    <PlanList v-if="currentIndex == '2'" />
    <!-- 磁盘健康 -->
    <DiskInfo v-if="currentIndex == '3'" />

  </div>
</template>

<script>
// @ is an alias to /src
import CreatePlan from "../components/CreatePlan";
import PlanList from "../components/PlanList";
import DiskInfo from "../components/DiskInfo";
export default {
  name: "home",
  components: {
    CreatePlan,
    PlanList,
    DiskInfo,
  },
  data() {
    return {
      currentIndex: "1",
    };
  },
  methods: {
    menuSelect(key) {
      this.currentIndex = key;
    },
  },
};
</script>
<style scoped lang="less"></style>
