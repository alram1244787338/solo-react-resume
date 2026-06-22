import React, { useState, useCallback } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import Toolbar from './Toolbar';
import mockResume from '../data/mockResume';
import { templateStyles } from '../styles/templateStyles';
import { exportHTML, exportPDF } from '../utils/exporter';

function Layout() {
  const [markdown, setMarkdown] = useState(mockResume);
  const [templateId, setTemplateId] = useState('simple');

  const handleExportHTML = useCallback(() => {
    exportHTML(markdown, templateId, templateStyles);
  }, [markdown, templateId]);

  const handleExportPDF = useCallback(() => {
    exportPDF();
  }, []);

  return (
    <div className={`layout layout--template-${templateId}`}>
      <header className="layout__header">
        <h1 className="layout__title">简历生成器</h1>
        <Toolbar
          templateId={templateId}
          onTemplateChange={setTemplateId}
          onExportHTML={handleExportHTML}
          onExportPDF={handleExportPDF}
        />
      </header>
      <main className="layout__body">
        <section className="layout__editor">
          <Editor value={markdown} onChange={setMarkdown} />
        </section>
        <section className="layout__preview">
          <Preview markdown={markdown} templateId={templateId} />
        </section>
      </main>
    </div>
  );
}

export default Layout;
