'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/index', controller.admin.main.index);
  router.get('/admin/checkLogin', controller.admin.main.checkLogin);
};
