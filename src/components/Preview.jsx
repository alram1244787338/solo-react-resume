import React, { useMemo } from 'react';
import { marked } from 'marked';
import { templateStyles } from '../styles/templateStyles';

const SIDEBAR_SECTIONS = ['个人简介', '教育背景', '专业技能', '语言能力'];

function buildBusinessLayout(htmlString) {
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
}

function Preview({ markdown, templateId }) {
  const htmlContent = useMemo(() => {
    try {
      return marked.parse(markdown);
    } catch (e) {
      return '<p>Markdown 解析出错</p>';
    }
  }, [markdown]);

  const finalHTML = useMemo(() => {
    if (templateId === 'business') {
      try {
        return buildBusinessLayout(htmlContent);
      } catch (e) {
        return htmlContent;
      }
    }
    return htmlContent;
  }, [htmlContent, templateId]);

  const cssText = templateStyles[templateId] || '';

  return (
    <div className="preview">
      <div className="preview__header">
        <span className="preview__title">实时预览</span>
      </div>
      <div className="preview__paper">
        <div className={`resume-page template-${templateId}`}>
          <style dangerouslySetInnerHTML={{ __html: cssText }} />
          <div dangerouslySetInnerHTML={{ __html: finalHTML }} />
        </div>
      </div>
    </div>
  );
}

export default Preview;
