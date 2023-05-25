/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const schedule = require('node-schedule');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;

function start() {
  exec('go run ./cmd/main.go');

  const output = execSync('python3 ./cmd/SwitchDA.py');
  console.log(output.toString());

  // 定时任务 三十分钟获取一次数据
  schedule.scheduleJob('*/30  * * * *', function () {
    console.log('开始获取GitHub Events');
    execSync('go run ./cmd/main.go');
    console.log('获取Github Events完成');
  });

  schedule.scheduleJob('0 0 6,20,23 * * ? *', function () {
    const output = execSync('python3 ./cmd/SwitchDA.py');
    console.log(output.toString());
  });
}

module.exports.start = start;
