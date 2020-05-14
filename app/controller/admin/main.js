'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = {
      data: null,
      success: true,
      description: 'hello admin',
    };
  }

  // 验证登录
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT user.user_name as userName 
                FROM user WHERE 
                user_name = '${userName}' AND 
                password = '${password}'`;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      // 登录成功，进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        data: openId,
        success: true,
        description: '登录成功',
      };
    } else {
      this.ctx.body = {
        data: null,
        success: false,
        description: '登录失败',
      };
    }
  }
}

module.exports = MainController;
