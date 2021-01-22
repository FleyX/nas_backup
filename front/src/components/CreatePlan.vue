<template>
  <!-- 新增备份计划 -->
  <div>
    <el-form label-width="5em">
      <el-form-item label="计划名称">
        <el-input v-model="form.planName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="计划描述">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.description"
          ></el-input>
        </el-form-item> -->
      <el-form-item label="开始时间">
        <el-time-picker v-model="nextLaunchTime"></el-time-picker>
      </el-form-item>
      <el-form-item label="间隔时间">
        <el-input-number v-model="form.lanuchInterval" :min="1" :max="30"></el-input-number>天
      </el-form-item>
      <el-form-item label="保留历史">
        <el-input-number v-model="form.holdHistory" :min="1" :max="5"></el-input-number>份
      </el-form-item>
      <el-form-item label="备份路径">
        <span>{{ form.sourcePath }}&emsp;</span>
        <el-button type="primary" size="mini" @click="chosePath('sourcePath')">选择</el-button>
      </el-form-item>
      <el-form-item label="存储路径">
        <span>{{ form.targetPath }}&emsp;</span>
        <el-button type="primary" size="mini" @click="chosePath('targetPath')">选择</el-button>
      </el-form-item>
      <el-form-item label="忽略列表">
        <el-tag v-for="tag in form.ignoreList" :key="tag" closable @close="closeTag(tag)" type="success">{{ tag }}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>

    <!-- 路径选择-->
    <el-dialog title="选择路径" :visible.sync="showDialog">
      <PathSelect @submit="pathChange" @close="showDialog = false" />
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import PathSelect from "@/components/PathSelect.vue";
import axios from "axios";
import { isEmpty } from "../util/StringUtil";
export default {
  name: "CreatePlan",
  components: {
    PathSelect,
  },
  data() {
    return {
      form: {
        nextLaunchTime: null,
        planName: "",
        description: "",
        sourcePath: "",
        targetPath: "",
        holdHistory: 1,
        lanuchInterval: 1,
        ignoreList: ["node_modules", ".git"],
      },
      nextLaunchTime: new Date(),
      showDialog: false,
      type: "",
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    chosePath(type) {
      this.type = type;
      this.showDialog = true;
    },
    closeTag(tag) {
      this.form.ignoreList.splice(this.form.ignoreList.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.ignoreList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    pathChange(path) {
      if (this.type === "sourcePath") {
        this.form.sourcePath = path;
      } else {
        this.form.targetPath = path;
      }
      this.showDialog = false;
    },
    nextLaunchTimeChange(val, e) {
      console.log(val, e);
    },
    submit() {
      if (
        isEmpty(this.form.planName) ||
        this.nextLaunchTime === null ||
        isEmpty(this.form.sourcePath) ||
        isEmpty(this.form.targetPath)
      ) {
        this.$message({
          message: "存在空值",
          type: "error",
        });
        return;
      }
      if (this.form.sourcePath === this.form.targetPath) {
        this.$message({
          message: "源路径，目标路径相同",
          type: "error",
        });
        return;
      }
      this.form.lanuchInterval = this.lanuchIntervalDays * 24 * 60 * 60 * 1000;
      this.form.nextLaunchTime = this.nextLaunchTime.getTime();
      axios.put("/plan", this.form).then(() => {
        this.$message({
          message: "新增成功",
          type: "success",
        });
      });
    },
  },
};
</script>
<style scoped lang="less">
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
