<template>

  <div class="hello">
    <div class="v-center">
      <span>当前路径:</span>
      <el-link
        v-for="(item, index) in pathList"
        :key="index"
        type="primary"
        :disabled="index === pathList.length - 1"
        class="path-item"
        @click="back(index)"
        >{{ item.length == 0 ? "根/" : item }}</el-link
      >
    </div>
    <div>
      <el-link
        @click="openFolder(item)"
        v-for="(item, index) in folderList"
        :key="index"
        type="primary"
        style="display:block"
      >
        {{ item }}
      </el-link>
      <div v-if="folderList.length === 0" class="empty">此路径下无目录文件</div>
    </div>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >新建目录</el-button
    >
    <div></div>
    <div class="btns">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="warning" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PathSelect",
  data() {
    return {
      pathList: [],
      isWindows: false,
      folderList: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    axios.get("/config/isWindows").then(res => {
      this.isWindows = res;
      if (this.isWindows) {
        this.pathList.push("");
      } else {
        this.pathList.push("/");
      }
      this.getFolders();
    });
  },
  methods: {
    back(index) {
      this.pathList.splice(index + 1);
      this.getFolders();
    },
    openFolder(item) {
      this.pathList.push(item + "/");
      this.getFolders();
    },
    getFolders() {
      let url = `/path?path=${encodeURIComponent(this.pathList.join(""))}`;
      axios.get(url).then(res => {
        this.folderList = res;
      });
    },
    submit() {
      this.$emit("submit", this.pathList.join(""));
    },
    close() {
      this.$emit("close");
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
        let url = `/path?path=${encodeURIComponent(
          this.pathList.join("") + inputValue
        )}`;
        axios.put(url).then(() => {
          this.folderList.push(inputValue);
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.inputVisible = false;
          this.inputValue = "";
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.v-center {
  vertical-align: middle;
}
.path-item {
  display: inline-block;
  padding-right: 0.2em;
}
.empty {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
}
.btns {
  display: flex;
  justify-content: space-around;
}
</style>
