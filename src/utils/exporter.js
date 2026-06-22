import { marked } from 'marked';

const SIDEBAR_SECTIONS = ['个人简介', '教育背景', '专业技能', '语言能力'];

function buildBusinessLayout(htmlString) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div id="__root__">${htmlString}</div>`, 'text/html');
    const root = doc.getElementById('__root__');
    if (!root) return htmlString;

    const children = Array.from(root.childNodes);

    let headerHTML = '';
    let headerDone = false;
    const sections = [];
    let currentSection = null;

    for (const node of children) {
      if (!headerDone) {
        if (node.nodeName === 'HR') {
          headerDone = true;
          continue;
        }
        if (node.nodeName === 'H2') {
          headerDone = true;
          currentSection = { title: node.textContent, html: '' };
          sections.push(currentSection);
          continue;
        }
        headerHTML += node.outerHTML || node.textContent || '';
        continue;
      }

      if (node.nodeName === 'H2') {
        currentSection = { title: node.textContent, html: '' };
        sections.push(currentSection);
        continue;
      }
      if (node.nodeName === 'HR') continue;
      if (currentSection) {
        currentSection.html += node.outerHTML || node.textContent || '';
      }
    }

    const firstH1Match = headerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const nameHTML = firstH1Match ? firstH1Match[0] : '';
    let restHeader = headerHTML.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();

    const firstH2Match = restHeader.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const subtitleHTML = firstH2Match ? `<div class="biz-subtitle">${firstH2Match[1]}</div>` : '';
    restHeader = restHeader.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, '').trim();

    const contactHTML = restHeader ? `<div class="biz-contact">${restHeader}</div>` : '';

    const sidebarHTML = sections
      .filter((s) => SIDEBAR_SECTIONS.includes(s.title))
      .map((s) => `<div class="biz-section"><h2>${s.title}</h2>${s.html}</div>`)
      .join('');

    const mainHTML = sections
      .filter((s) => !SIDEBAR_SECTIONS.includes(s.title))
      .map((s) => `<div class="biz-section"><h2>${s.title}</h2>${s.html}</div>`)
      .join('');

    return `
      <div class="biz-header">
        ${nameHTML}
        ${subtitleHTML}
        ${contactHTML}
      </div>
      <div class="biz-body">
        <div class="biz-sidebar">${sidebarHTML}</div>
        <div class="biz-main">${mainHTML}</div>
      </div>
    `;
  } catch (e) {
    return htmlString;
  }
}

export const exportHTML = (markdown, templateId, templateStyles) => {
  let htmlContent = marked.parse(markdown);
  if (templateId === 'business') {
    htmlContent = buildBusinessLayout(htmlContent);
  }
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
      .template-business { padding: 0 !important; }
      .template-business .biz-header {
        margin: 0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .template-business .biz-body {
        margin: 0 !important;
      }
    }
  </style>
</head>
<body>
  <div class="resume-page template-${templateId}">
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
