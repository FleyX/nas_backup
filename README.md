# nas_backup
跨平台文件备份系统，支持windows/linux

# 说明

主要用于nas异盘备份，防止一块硬盘损坏后重要数据丢失。

界面如下：

- 新增备份计划

![主界面](https://raw.githubusercontent.com/FleyX/files/master/blog/20191013120920.png)

- 管理备份计划/查看备份历史

![](https://raw.githubusercontent.com/FleyX/files/master/blog/20191013121035.png)

# 部署方法

首先需要机器拥有node,并安装cnpm环境，没有的自行百度安装。

需要在root/管理员权限下运行，否则部分文件会由于缺少读写权限无法备份。

## 命令如下

```bash
# 安装编译、运行环境
cnpm install -g typescript pm2
# 安装依赖,在backService文件夹下执行
cnpm install
# 编译
tsc
# 运行
pm2 start backup.json
```

**未做开机自启动，重启后需手动启动**
