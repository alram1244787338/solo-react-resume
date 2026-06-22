# 简历生成器

> Markdown 写简历，简约/商务双模板实时预览，一键导出 HTML/PDF

## 技术栈

- **React 19** — 用户界面
- **Webpack 5** — 构建工具（dev-server / HMR）
- **marked** — Markdown 渲染
- **Jest + @testing-library/react** — 单元测试 / 组件测试

## 目录结构

```
repos/27/work/
├── public/
│   └── index.html              # HTML 模板
├── src/
│   ├── components/
│   │   ├── Editor.jsx          # 左侧 Markdown 编辑区（深色主题）
│   │   ├── Layout.jsx          # 整体布局 + 状态管理
│   │   ├── Preview.jsx         # 右侧实时预览（A4 纸 + 分栏）
│   │   └── Toolbar.jsx         # 顶部工具栏（模板切换 + 导出）
│   ├── data/
│   │   └── mockResume.js       # 预设示例简历
│   ├── styles/
│   │   ├── app.css             # 布局与组件样式
│   │   ├── global.css          # 全局基础样式 + reset
│   │   └── templateStyles.js   # 两套模板 CSS（simple / business）
│   ├── utils/
│   │   └── exporter.js         # 导出 HTML（Blob 下载） + PDF（print）
│   ├── App.jsx                 # 根组件
│   └── index.jsx               # React 入口
├── tests/
│   ├── __mocks__/styleMock.js  # CSS mock
│   ├── setup.js                # jest-dom setup + 全局 mock
│   ├── Preview.test.jsx        # Preview 组件渲染测试
│   ├── Toolbar.test.jsx        # Toolbar 交互回调测试
│   ├── exporter.test.js        # HTML/PDF 导出逻辑测试
│   └── templateStyles.test.js  # 模板 CSS 字符串校验
├── babel.config.json
├── jest.config.js
├── package.json
├── webpack.common.js
└── webpack.dev.js
```

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动后浏览器自动打开 **http://localhost:9527/**

## 使用说明

1. **左侧编辑**：在深灰色 textarea 中用 Markdown 语法撰写简历，内容会实时同步到右侧。
2. **右侧预览**：以 A4 纸尺寸模拟简历排版效果，所见即所得。
3. **切换模板**：顶部工具栏点击「简约风」或「商务风」即可实时切换样式：
   - **简约风**：单栏线性流、浅色干净、下划线条目分隔
   - **商务风**：深色渐变 header、左右分栏（个人信息左栏 / 经历右栏）、大字号
4. **导出 HTML**：点击「导出 HTML」下载独立可打开的 `.html` 文件，含完整样式。
5. **导出 PDF**：点击「导出 PDF」调用浏览器打印对话框，选择「另存为 PDF」即可，打印时会自动隐藏工具栏和编辑区。

> 建议简历 Markdown 结构：`# 姓名` → `## 职位` → `---` → `## 个人简介 / 教育 / 技能` → `## 工作经历 / 项目经历`（左/右栏自动分流）

## 测试

```bash
# 运行全部测试
npm test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage
```

测试套件包含 **4 个测试文件 · 37 个测试用例**，覆盖：

| 模块 | 覆盖内容 |
|------|---------|
| templateStyles.js | simple/business CSS 字符串存在性、关键 class、布局属性、字号差异、中英文名称映射 |
| exporter.js | `<meta charset="UTF-8">`、Blob MIME `text/html;charset=utf-8`、文件名、HTML 结构完整性、Markdown 渲染、business 分栏、window.print() |
| Preview.jsx | simple/business 模板 class、Markdown 内容渲染、business 左/右栏内容分流、header 信息、空内容容错、模板切换 rerender |
| Toolbar.jsx | 按钮渲染、active 状态、onTemplateChange 传参、onExportHTML / onExportPDF 回调独立触发 |

## 替换默认内容

预设简历数据位于 `src/data/mockResume.js`，包含完整的 6 年前端工程师示例。替换方式：

1. **临时替换**：启动后直接在左侧编辑区修改，所见即所得；
2. **永久替换**：编辑 `src/data/mockResume.js` 中的字符串，下次启动即为新内容；
3. **添加新模板**：在 `src/styles/templateStyles.js` 中新增 CSS 字符串，在 `templateStyles` / `templateNames` 对象中注册 id，并在 `Preview.jsx` 里添加对应 DOM 结构逻辑即可。
