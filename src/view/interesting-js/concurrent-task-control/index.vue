<template>并发任务控制</template>
<script setup lang="ts">
// 并发任务控制
function timeout(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

class SuperTask {
  parallelCount: number;
  tasks: {
    task: Function,
    resolve: Function,
    reject: Function,
  }[];
  runningCount: number;
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount
    this.tasks = []  
    this.runningCount = 0; // 正在执行的任务数量
  }
  add(task: Function) {
    return new Promise((resolve, reject) => {
        this.tasks.push({
            task,
            resolve,
            reject
        })
        this._run()
    }) 
  }
  _run() {
      while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
          const taskItem = this.tasks.shift()
          if(!taskItem) return
          const { task, resolve, reject } = taskItem
          this.runningCount++;
          task().then(resolve, reject).finally(() => {
            this.runningCount--;
            this._run()
          })
      }
  }
}

const superTask = new SuperTask();
function addTask(time: number, name: string) {
    superTask.add(() => timeout(time)).then(() => {
        console.log(`任务${name}完成`);
    })
}
addTask(10000, '1'); // 10000ms 后输出: 任务1完成
addTask(5000, '2'); // 5000ms 后输出: 任务2完成
addTask(3000, '3'); // 8000ms 后输出: 任务3完成
addTask(4000, '4'); // 12000ms 后输出: 任务4完成
addTask(5000, '5'); // 15000ms 后输出: 任务5完成
</script>
