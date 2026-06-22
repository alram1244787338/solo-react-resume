import React from 'react';
import { templateNames } from '../styles/templateStyles';

function Toolbar({ templateId, onTemplateChange, onExportHTML, onExportPDF }) {
  const templates = Object.entries(templateNames);

  return (
    <div className="toolbar">
      <div className="toolbar__group">
        <span className="toolbar__label">模板：</span>
        <div className="toolbar__tabs">
          {templates.map(([id, name]) => (
            <button
              key={id}
              className={`toolbar__tab ${templateId === id ? 'is-active' : ''}`}
              onClick={() => onTemplateChange(id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="toolbar__group toolbar__group--right">
        <button className="toolbar__btn" onClick={onExportHTML}>
          导出 HTML
        </button>
        <button className="toolbar__btn toolbar__btn--primary" onClick={onExportPDF}>
          导出 PDF
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
