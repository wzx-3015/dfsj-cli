/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 13:44:32
 * @LastEditTime: 2021-09-06 17:05:44
 * @LastEditors: @Xin (834529118@qq.com)
 */
const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const del = require('del')

const entryJS = () => {
  return src('command/*.js')
    .pipe(babel({
      "presets": ["@babel/preset-env"]
    }))
    .pipe(dest('lib'));
}

const utilsJS = () => {
  return src('command/utils/*.js')
    .pipe(babel({
      "presets": ["@babel/preset-env"]
    }))
    .pipe(dest('lib/utils'));
}

const clean = () => {
  return del(['lib/*'])
}

const myWatch = () => {
  watch('./command/utils/*.js', series(utilsJS))
  watch('./command/*.js', series(entryJS))
}

const build = series(clean, entryJS, utilsJS)

exports.start = series(myWatch)
exports.build = build
exports.default = build
