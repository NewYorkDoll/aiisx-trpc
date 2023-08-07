const workerpool = require('workerpool');
const path = require('path');
const pool = workerpool.pool(path.join(__dirname, '../cron/cron.js'));
const schedule = require('node-schedule');
const jobs = async () => {
  schedule.scheduleJob('*/30  * * * *', async function () {
    const proxy = await pool.proxy();
    await proxy.start();
  });
};

module.exports = jobs;
