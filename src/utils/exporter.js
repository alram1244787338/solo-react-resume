import { marked } from 'marked';

export const exportHTML = (markdown, templateId, templateStyles) => {
  const htmlContent = marked.parse(markdown);
  const templateStyle = templateStyles[templateId] || '';

  const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>我的简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #f5f5f5;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    }
    .resume-page {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 48px 56px;
      min-height: 297mm;
    }
    ${templateStyle}
    @media print {
      body { background: #fff; padding: 0; }
      .resume-page {
        box-shadow: none;
        padding: 0;
        margin: 0;
        max-width: none;
      }
    }
  </style>
</head>
<body>
  <div class="resume-page">
    ${htmlContent}
  </div>
</body>
</html>`;

  const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '我的简历.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportPDF = () => {
  window.print();
};
