"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectPath = getProjectPath;

var _path = require("path");

/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 16:26:43
 * @LastEditTime: 2021-09-06 16:31:08
 * @LastEditors: @Xin (834529118@qq.com)
 */

/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
function getProjectPath(projectName) {
  return (0, _path.resolve)(process.cwd(), projectName);
}