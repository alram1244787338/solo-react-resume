import React from 'react';

function Editor({ value, onChange }) {
  return (
    <div className="editor">
      <div className="editor__header">
        <span className="editor__title">Markdown 编辑</span>
        <span className="editor__status">{value.length} 字符</span>
      </div>
      <textarea
        className="editor__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在此输入 Markdown 格式的简历内容..."
        spellCheck={false}
      />
    </div>
  );
}

export default Editor;
