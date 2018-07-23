# 试题 #

## 题目描述 ##

现有多个机器, 每个机器有多个 CPU 核心, 要求实现一个函数, 参数为一个任务结构, 返回当前可以执行该任务的机器.

机器的数据结构属性:

```
Machine: {
    "cpus": 0,       // CPU 数量
    "usedCpus": 0,   // 当前使用中的 CPU 数量
    "id": 0,         // 机器 id, 不会重复
    "group": "",     // 机器分组标签(字符串, 可为空), 当该属性为空字符串时代表可以执行任意分组的任务, 不为空时则只能执行该分组的任务.
}
```

任务的数据结构属性:

```
Task: {
    "id": 0,        // 任务 id, 不会重复
    "group": "",    // 任务分组标签(字符串, 不会为空), 某个分组的任务只会分配给分组相同的 Machine 或者分组为空字符串的 Machine
    "cpus": 1,      // 任务需求的 cpu 数量, 固定为 1
    "times": 0,     // 任务处理所需时长(秒), 必定大于 0
    "machineId": 0  // 被分配给的 Machine Id, 当被分配后该值有意义
}
```

需实现的函数如下:

```
// 当任务完成时调用, 当任务被分配到机器上 Task.times 之后调用
function onTaskDone(Task) {

}

// 当需要任务开始执行时调用, 返回当前可执行该任务的 Machine, 如没有满足条件的 Machine 则返回 null
function onTaskSchedule(Task) (Machine) {

}
```

## 要求 ##

1. 每个机器上同时执行的任务所需的 cpus 数量不能超过该 Machine 的 cpu 总数
2. 优先使用 group 能匹配上的 Machine
3. 如果有多个 Machine 同时满足, 优先使用 id 更小的 Machine

## 评分要点 ##

1. 使用 git 并保留 git commit 历史加分
2. 有单元测试加分
3. 使用 eslint 进行代码规范检查加分
4. 代码可读性, 扩展性好加分
5. 使用 mongodb 持久化 Machine, Task 数据加分

## 示例 ##

Machine 列表如下:

```
machines: [
    {
        "cpus": 2,
        "usedCpus": 0,
        "id": 0,
        "group": "",
    },
    {
       "cpus": 1,
        "usedCpus": 0,
        "id": 1,
        "group": "group1",
    },
    {
        "cpus": 1,
        "usedCpus": 0,
        "id": 2,
        "group": "group1",
    }
]
```

需依次执行的任务如下:

```
tasks: [
    {
        "id": 0,
        "group": "group2",
        "cpus": 1,
        "times": 10,
    },
    {
        "id": 1,
        "group": "group1",
        "cpus": 1,
        "times": 11,
    },
    {
        "id": 2,
        "group": "group1",
        "cpus": 1,
        "times": 10,
    },
    {
        "id": 3,
        "group": "group2",
        "cpus": 1,
        "times": 10,
    },
    {
        "id": 4,
        "group": "group2",
        "cpus": 1,
        "times": 10,
    },
    {
        "id": 5,
        "group": "group1",
        "cpus": 1,
        "times": 10,
    },
]
```

第一轮分配的结果如下:

```
task  -->  machine
0     -->  0
1     -->  1
2     -->  2
3     -->  0
4     -->  null
5     -->  null
```

10 秒后进行第二轮分配, 分配结果如下(0-3号任务已完成, 不再参与分配):

```
task  -->  machine
4     -->  0
5     -->  2
```

所有任务已分配完成, 不再进行分配.
