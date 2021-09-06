###
 # @Description: 请输入当前文件描述
 # @Author: @Xin (834529118@qq.com)
 # @Date: 2021-09-06 18:00:47
 # @LastEditTime: 2021-09-06 18:07:29
 # @LastEditors: @Xin (834529118@qq.com)
### 
echo '开始构建脚手架'

npm run build

echo '脚手架构建完成，现在发布'

npm publish --access public
