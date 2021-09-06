"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _fs = require("fs");

var _commander = _interopRequireDefault(require("commander"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _chalk = require("chalk");

var _shelljs = require("shelljs");

var _common = require("./utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 11:31:35
 * @LastEditTime: 2021-09-06 17:45:58
 * @LastEditors: @Xin (834529118@qq.com)
 */
var nameOption = _commander["default"].parse(process.argv).args[1];

var defaultName = 'dfsj-auth-web';
var spinner = (0, _ora["default"])('模板下载中，请稍后...'); // const loading = ora('模板下载中，请稍后……')

var questions = [{
  type: 'input',
  name: 'name',
  message: '项目名称',
  "default": typeof nameOption === 'string' ? nameOption : defaultName,
  filter: function filter(value) {
    return value.trim();
  },
  validate: function validate(value) {
    var validate = value.trim().split(' ').length === 1;
    return validate || '项目名称不允许有空格！';
  },
  transformer: function transformer(value) {
    return "\uFF1A".concat(value);
  }
}, {
  type: 'input',
  name: 'origin',
  message: '项目git地址',
  "default": '',
  filter: function filter(value) {
    return value.trim();
  },
  validate: function validate(value) {
    var validate = value.trim().split(' ').length === 1;
    return validate || '项目名称不允许有空格！';
  },
  transformer: function transformer(value) {
    return "\uFF1A".concat(value);
  }
}, {
  type: 'input',
  name: 'description',
  message: '项目描述',
  "default": 'a admincraft project',
  validate: function validate() {
    return true;
  },
  transformer: function transformer(value) {
    return "\uFF1A".concat(value);
  }
}, {
  type: 'input',
  name: 'author',
  message: '项目作者',
  "default": 'unnamed',
  validate: function validate(val) {
    return true;
  },
  transformer: function transformer(value) {
    return "\uFF1A".concat(value);
  }
}];
/**
 * @description:  检测文件是否存在
 * @param {*}
 * @return {*}
 */

var isFileExist = function isFileExist(fileName) {
  var file = (0, _common.getProjectPath)(fileName); // 验证文件是否已经存在，存在退出进程

  if ((0, _fs.existsSync)(file)) {
    console.log((0, _chalk.red)("".concat(file, " \u5DF2\u7ECF\u5B58\u5728")));
    process.exit(1);
  }
};

var create = function create() {
  _inquirer["default"].prompt(questions).then(function (_ref) {
    var name = _ref.name,
        description = _ref.description,
        author = _ref.author,
        origin = _ref.origin;
    isFileExist(name);
    spinner.start();
    (0, _downloadGitRepo["default"])('wzx-3015/auth-vue-next', "./".concat(name), function (err) {
      if (err) {
        spinner.fail('模板下载失败！');
        console.log((0, _chalk.red)(err));
        process.exit();
      } else {
        spinner.succeed('模板准备就绪！请进一步操作。');

        if (!(0, _shelljs.which)('git')) {
          console.log('git 命令不可用');
          (0, _shelljs.exit)(1);
        }

        (0, _shelljs.cd)("./".concat(name));
        var gitChange = false;

        if (origin && origin !== '') {
          if ((0, _shelljs.exec)('git remote -v').stdout) {
            (0, _shelljs.exec)("git remote set-url origin ".concat(origin));
          } else {
            (0, _shelljs.exec)("git remote add origin ".concat(origin));
          }
        } else {
          gitChange = true;
          console.log((0, _chalk.yellow)("\u8BF7\u8C03\u6574git\u4ED3\u5E93\u5730\u5740"));
        }

        console.log("".concat(_chalk.bgWhite.black('  下一步操作  ')));
        gitChange && console.log((0, _chalk.yellow)("\u8BF7\u8C03\u6574git\u4ED3\u5E93\u5730\u5740"));
        console.log((0, _chalk.yellow)("cd ".concat(name)));
        console.log((0, _chalk.yellow)("yarn \u6216 npm install"));
        console.log((0, _chalk.yellow)("yarn serve \u6216 npm run serve"));
        (0, _shelljs.exit)(1);
      }
    });
  });
};

var _default = create;
exports["default"] = _default;