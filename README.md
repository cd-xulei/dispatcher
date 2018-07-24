# dispatcher
#### 实现思路
以微服务的思想
利用 hapi 创建一个 http 接口,接收 任务参数,分配任务到机器上,直到任务分配完成。

onTaskSchedule,onTaskDone 在 lib目录下。


#### 查看效果

```
npm install

npm start

// 确保 全局安装 mocha

mocha test

// 终端查看打印效果,也可 访问 http://127.0.0.1:3000/documentation 手动调用接口
```


#### todo
1. 加入 mongoose 存储任务数据和机器数据
2. 单元测试覆盖
3. 加入日志记录


