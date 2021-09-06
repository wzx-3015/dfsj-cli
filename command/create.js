/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-06 11:31:35
 * @LastEditTime: 2021-09-06 18:46:15
 * @LastEditors: @Xin (834529118@qq.com)
 */
import ora from 'ora'
import { existsSync } from 'fs'
import program from 'commander'
import inquirer from 'inquirer'
import download from 'download-git-repo'
import { red, yellow, bgWhite } from 'chalk'
import { cd, exec, which, exit } from 'shelljs'
import { getProjectPath } from './utils/common'

const nameOption = program.parse(process.argv).args[1]
const defaultName = 'dfsj-auth-web'

const spinner = ora('模板下载中，请稍后...')

// const loading = ora('模板下载中，请稍后……')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '项目名称',
    default: typeof nameOption === 'string' ? nameOption : defaultName,
    filter: (value) => value.trim(),
    validate: (value) => {
      const validate = value.trim().split(' ').length === 1
      return validate || '项目名称不允许有空格！'
    },
    transformer: (value) => `：${value}`,
  },
  {
    type: 'input',
    name: 'origin',
    message: '项目git地址',
    default: '',
    filter: (value) => value.trim(),
    validate: (value) => {
      const validate = value.trim().split(' ').length === 1
      return validate || '项目名称不允许有空格！'
    },
    transformer: (value) => `：${value}`,
  },
  {
    type: 'input',
    name: 'description',
    message: '项目描述',
    default: 'a admincraft project',
    validate: () => {
      return true
    },
    transformer: (value) => `：${value}`,
  },
  {
    type: 'input',
    name: 'author',
    message: '项目作者',
    default: 'unnamed',
    validate(val) {
      return true
    },
    transformer: (value) => `：${value}`,
  },
]


/**
 * @description:  检测文件是否存在
 * @param {*}
 * @return {*}
 */
const isFileExist = fileName => {
  const file = getProjectPath(fileName);
  // 验证文件是否已经存在，存在退出进程
  if (existsSync(file)) {
    console.log(red(`${file} 已经存在`));
    process.exit(1);
  }
}

const create = () => {  
  inquirer
  .prompt(questions)
  .then(({ name, description, author, origin }) => {
    isFileExist(name)
    spinner.start()
    download('wzx-3015/auth-vue-next#main', `./${name}`, err => {
      if (err) {
        spinner.fail('模板下载失败！')
        console.log(red(err))
        process.exit()
      } else {
        spinner.succeed('模板准备就绪！请进一步操作。')

        let gitChange = false
        if (!which('git')) {
          console.log('git 命令不可用')
        } else {
          cd(`./${name}`)
  
          if (origin && origin !== '') {
            if (exec('git remote -v').stdout) {
              exec(`git remote set-url origin ${origin}`)
            } else {
              exec(`git remote add origin ${origin}`)
            }
          } else {
            gitChange = true
          }
        }

        console.log(`${bgWhite.black('  下一步操作  ')}`)
        gitChange && console.log(yellow(`请调整git仓库地址`))
        console.log(yellow(`cd ${name}`))
        console.log(yellow(`yarn 或 npm install`))
        console.log(yellow(`yarn serve 或 npm run serve`))
        
        exit(1)
      }
    })
  })
}

export default create
