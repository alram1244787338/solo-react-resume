import React, { useMemo } from 'react';
import { marked } from 'marked';
import { templateStyles } from '../styles/templateStyles';

function Preview({ markdown, templateId }) {
  const htmlContent = useMemo(() => {
    try {
      return marked.parse(markdown);
    } catch (e) {
      return '<p>Markdown 解析出错</p>';
    }
  }, [markdown]);

  const cssText = templateStyles[templateId] || '';

  return (
    <div className="preview">
      <div className="preview__header">
        <span className="preview__title">实时预览</span>
      </div>
      <div className="preview__paper">
        <div className={`resume-page template-${templateId}`}>
          <style dangerouslySetInnerHTML={{ __html: cssText }} />
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}

export default Preview;
