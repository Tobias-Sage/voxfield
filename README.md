# Voxfield — Vercel 部署版

这是 Voxfield 网站的完整 Next.js、React 与 TypeScript 源代码，已经移除原托管平台专用配置、构建缓存和依赖目录，可作为独立项目部署到 Vercel。

## 部署到 Vercel

1. 将本文件夹中的全部文件上传到 GitHub、GitLab 或 Bitbucket 仓库。
2. 登录 Vercel，选择 **Add New → Project**。
3. 导入刚才创建的代码仓库。
4. 确认 Framework Preset 为 **Next.js**，Root Directory 保持为仓库根目录。
5. 点击 **Deploy**。

网站不需要环境变量、数据库、支付服务、邮件服务或外部 API。

## 本地运行

```bash
corepack enable
pnpm install
pnpm dev
```

然后访问 `http://localhost:3000`。

## 本地生产构建检查

```bash
pnpm build
pnpm start
```

联系表单和 Newsletter 目前提供浏览器端交互。若后续需要真实收集信息，请再接入相应的后端或表单服务。
