import React from 'react';

function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">简历生成器</h1>
      </header>
      <main className="layout__main">
        <div className="layout__placeholder">
          <p>项目框架已搭建完成</p>
          <p className="layout__hint">
            后续功能：Markdown 编辑 · 多模板预览 · 导出 PDF/HTML
          </p>
        </div>
      </main>
      <footer className="layout__footer">
        <span>Resume Generator</span>
      </footer>
    </div>
  );
}

export default Layout;
