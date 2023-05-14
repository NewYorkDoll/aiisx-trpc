// @ts-check

const schedule = require('node-schedule');
const execSync = require('child_process').execSync;

function start() {
  console.log('开始获取GitHub Events');
  const githubOutput = execSync('go run ./cmd/main.go');
  console.log('go-sync: ' + githubOutput.toString());

  const switchOutput = execSync('python3 ./cmd/SwitchDA.py');
  console.log('py-sync: ' + switchOutput.toString());

  // 定时任务 三十分钟获取一次数据
  schedule.scheduleJob('*/30  * * * *', function () {
    console.log('开始获取GitHub Events');
    const output = execSync('go run ./cmd/main.go');
    console.log('go-sync: ' + output.toString());
  });

  schedule.scheduleJob('0 0 6,20,23 * * ? *', function () {
    const output = execSync('python3 ./cmd/SwitchDA.py');
    console.log('py-sync: ' + output.toString());
  });
}

module.exports.start = start;
