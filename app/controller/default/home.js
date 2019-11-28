'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello';
  }
  // 首页列表接口
  async getArticleList() {
    const sql = 'SELECT article.id as id, ' +
                'article.title as title, ' +
                'article.introduce as introduce, ' +
                'FROM_UNIXTIME(article.add_time, "%Y-%m-%d %H:%i:%s") as addTime, ' +
                'article.view_count as viewCount, ' +
                'type.type_name as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id';
    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }
  // 文章详情
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
                'article.title as title, ' +
                'article.introduce as introduce, ' +
                'article.article_content as content, ' +
                'FROM_UNIXTIME(article.add_time, "%Y-%m-%d %H:%i:%s") as addTime, ' +
                'article.view_count as viewCount, ' +
                'type.type_name as typeName, ' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 获取文章类型
  async getArticleType() {
    // 根据表名查询所有数据
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  // 根据类型id获取类型信息
  async getTypeByTypeId() {
    const id = this.ctx.params.id;
    const result = await this.app.mysql.get('type', { id });
    this.ctx.body = { typeName: result.type_name };
  }
  // 根据类型获取文章列表
  async getArticleListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
                'article.title as title, ' +
                'article.introduce as introduce, ' +
                'FROM_UNIXTIME(article.add_time, "%Y-%m-%d %H:%i:%s") as addTime, ' +
                'article.view_count as viewCount, ' +
                'type.type_name as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE type_id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
