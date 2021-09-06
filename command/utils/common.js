/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 16:26:43
 * @LastEditTime: 2021-09-06 16:31:08
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { resolve } from 'path';
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
export function getProjectPath(projectName) {
  return resolve(process.cwd(), projectName);
}
