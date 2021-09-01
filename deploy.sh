# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f "https://github.com/Taxpolat/taxpolat_vuepress.git" master:gh-pages
# git@github.com:Taxpolat/taxpolat_vuepress.git master:gh-pages
# https://github.com/Taxpolat/taxpolat_vuepress.git
# https://github.com/Taxpolat/taxpolat_vuepress

cd -