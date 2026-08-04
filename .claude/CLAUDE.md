# 草莓麻薯冰淇淋 - 星露谷Mod博客

## 项目概况
Hexo 博客，用于分享星露谷物语 Mod 尾号、参数配置和优化指南。
- 框架：Hexo 7.x + Redefine 2.9.0 主题
- 部署：待定（推荐 Vercel）
- 作者：草莓麻薯冰淇淋

## 常用命令
```bash
hexo clean && hexo generate   # 清理并重新生成
hexo server -p 4000            # 本地预览
hexo new "文章标题"            # 创建新文章
```

## 关键文件
| 文件 | 用途 |
|------|------|
| `_config.yml` | Hexo 主配置 |
| `_config.redefine.yml` | 主题配置（颜色/字体/导航/Banner/APlayer） |
| `source/_posts/stardew-valley-mods-guide.md` | 主文章——mod推荐内容 |
| `source/about/index.md` | 关于我页面 |
| `source/links/index.md` | 友情链接页面 |
| `source/css/custom.css` | 自定义样式（全屏Banner+底部导航栏） |
| `source/js/random-emotes.js` | 随机表情包弹窗系统（当前未启用） |
| `source/images/emotes/` | 497个表情包GIF（80/150/220三尺寸） |
| `source/images/封面.jpg` | 首页封面图 |
| `source/images/头像.jpg` | 头像 |
| `source/images/网站图标.png` | 网站图标 |
| `source/music/` | 背景音乐文件 |

## 设计特点
- 首页全屏封面图 + 下滑进入内容区
- 底部导航栏（毛玻璃效果）
- 左下角 APlayer 音乐播放器（当前歌曲：Bittersweet Chocolate）
- ZCOOL XiaoWei 可爱标题字体
- 文章内嵌 HTML `<img>` 标签展示 kuri 表情包

## 表情包使用方法
文章中用 HTML `<img>` 标签插入，和标题同行：
```html
### 标题文字 <img src="/images/emotes/kuri_xxx_时间戳.gif" style="width:80px;display:inline;">
```
表情包路径无空格无括号，推荐用 220x220 版本（最晚时间戳）。

## 待完成
- [ ] 预留图片讲解处补充实际截图
- [ ] B站视频嵌入
- [ ] 粉丝群链接替换
- [ ] 部署到 Vercel/GitHub Pages
- [ ] 随机表情包系统启用（inject 中取消注释即可）
- [ ] 背景音乐可加更多歌曲
