# CMLiussss DoH 服务状态监测页面

这是一个专业的 DoH (DNS over HTTPS) 服务状态监测页面，提供实时性能测试和纯净度检测功能。页面采用现代化设计，具有优雅的用户体验。

## ✨ 功能特点

- 🚀 **实时性能监测** - 自动测试所有 DoH 服务的响应时间和可用性
- 🎯 **DNS 纯净度检测** - 智能检测 DNS 响应是否被污染或重定向  
- 🌐 **网络信息展示** - 自动显示当前IP地址、地理位置、运营商和ASN信息
- 📱 **完美响应式设计** - 适配各种屏幕尺寸，从桌面到移动设备
- 📋 **一键复制功能** - 点击任意 DoH 地址即可复制到剪贴板
- 📊 **统计概览面板** - 实时显示服务状态和性能统计
- 🔒 **隐私保护功能** - IP地址默认隐藏后两段，点击可切换显示
- 🎨 **现代化界面设计** - 深色主题配色，渐变特效，优雅动画
- ⚡ **极速加载体验** - 纯前端实现，无需后端支持

## 🌐 DoH 服务列表

| 服务商 | 服务地址 | 特点 |
|--------|----------|------|
| **谷歌** | `https://doh.cmliussss.com/CMLiussss` | 全球覆盖，稳定可靠 |
| **Cloudflare** | `https://doh.cmliussss.net/CMLiussss` | 高性能CDN加速 | 
| **阿里云** | `https://doh.090227.xyz/Ali-query` | 国内优化线路 |
| **腾讯云** | `https://doh.090227.xyz/QQ-query` | 多节点负载均衡 |
| **360** | `https://doh.090227.xyz/360-query` | 安全防护增强 |
| **DNS.SB** | `https://doh.090227.xyz/SB-query` | 开源社区驱动 |
| **NextDNS** | `https://doh.090227.xyz/Next-query` | 可配置过滤规则 |

## 🚀 快速部署

### 部署到 Cloudflare Pages
1. Fork 本仓库到您的 GitHub 账户
2. 在 Cloudflare Pages 中连接该仓库
3. 设置构建配置（无需特殊配置，直接使用默认设置）
4. 等待部署完成

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/cmliu/CF-Workers-DoH.git

# 进入项目目录
cd CF-Workers-DoH

# 使用任意 HTTP 服务器运行，例如：
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server .

# 或者直接在浏览器中打开 index.html
```

## 🔧 技术特性

- **纯前端架构** - 无需后端支持，部署简单
- **现代化技术栈**：
  - HTML5 语义化标签
  - CSS3 Grid + Flexbox 布局
  - ES6+ JavaScript 异步编程
  - CSS 变量和自定义属性
- **性能优化**：
  - 响应式图片加载
  - CSS 动画硬件加速
  - 防抖和节流优化
- **用户体验**：
  - 骨架屏加载动画
  - 渐变色彩主题
  - 微交互反馈
  - 移动端友好手势

## 📊 监测原理

页面通过以下方式检测 DoH 服务质量：

1. **可用性测试** - 发送 DNS 查询请求检测服务是否正常响应
2. **性能测试** - 测量从请求发送到响应接收的完整时间
3. **纯净度检测** - 解析 `www.google.com` 并验证返回的 IP 是否属于 Google ASN
4. **实时统计** - 汇总在线服务数量、平均响应时间和纯净服务数

## 🌍 浏览器兼容性

| 浏览器 | 最低版本 | 支持状态 |
|--------|----------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| 移动端浏览器 | - | ✅ 响应式适配 |

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 开源协议

本项目基于 MIT 协议开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">

**Made with ❤️ by [CMLiussss](https://github.com/cmliu)**

[🌟 Star](https://github.com/cmliu/CF-Workers-DoH) | [🍴 Fork](https://github.com/cmliu/CF-Workers-DoH/fork) | [📝 Issues](https://github.com/cmliu/CF-Workers-DoH/issues)

</div>
