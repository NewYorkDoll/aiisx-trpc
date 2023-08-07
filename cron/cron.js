const workerpool = require('workerpool');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;

function start() {
  console.log('开始定时任务');

  exec('go run ./cmd/main.go');

  // 定时任务 三十分钟获取一次数据
  console.log('开始获取GitHub Events');
  execSync('go run ./cmd/main.go');
  console.log('获取Github Events完成');

  const output = execSync('python3 ./cmd/SwitchDA.py');
  console.log(output.toString());
}
workerpool.worker({
  start,
});
