'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getArticleType', controller.default.home.getArticleType);
  router.get('/default/getArticleListById/:id', controller.default.home.getArticleListById);
  router.get('/default/getTypeByTypeId/:id', controller.default.home.getTypeByTypeId);
};
