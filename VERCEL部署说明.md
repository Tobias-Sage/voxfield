# 声场 VOXFIELD：Vercel 部署说明

此文件夹已经包含网站的完整源码、图片资源、依赖锁文件和 Vercel 配置，不需要迁移环境变量。

## 最简单：Vercel Drop

1. 打开 <https://vercel.com/drop> 并登录 Vercel。
2. 将整个 `声场-VOXFIELD-vercel` 文件夹拖入页面。
3. 选择团队和项目名称，然后点击 **Deploy**。

Vercel 会自动安装依赖并执行 `vite build`。Nitro 会在 Vercel 环境中生成官方 Build Output API 目录 `.vercel/output`，其中同时包含页面函数和静态资源。

## 使用 Vercel CLI

在此文件夹内运行：

```bash
vercel
```

确认预览版本正常后，发布正式版本：

```bash
vercel --prod
```

## 使用 Git

也可以把此文件夹提交到 GitHub、GitLab 或 Bitbucket，然后在 Vercel 控制台导入仓库。项目根目录保持为当前文件夹即可，构建设置会从 `vercel.json` 自动读取。

## 本地开发与验证

```bash
npm install
npm run dev
NITRO_PRESET=vercel npm run build
```

项目要求 Node.js `22.13.0` 或更高版本。

本地完成 Vercel 目标构建后，可检查 `.vercel/output/config.json`；该文件存在即表示 Vercel 部署结构已经生成。
