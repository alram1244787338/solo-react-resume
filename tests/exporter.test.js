import { exportHTML, exportPDF } from '../src/utils/exporter';
import { templateStyles } from '../src/styles/templateStyles';

describe('exporter.js', () => {
  const mockMarkdown = '# 测试简历\n## 前端工程师\n\n内容';
  const mockTemplateId = 'simple';

  beforeEach(() => {
    jest.clearAllMocks();

    global.Blob = jest.fn(function (content, options) {
      this.content = content;
      this.options = options;
    });

    const mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
    };
    document.createElement = jest.fn(() => mockAnchor);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    global.URL.createObjectURL = jest.fn(() => 'blob:http://test/123');
    global.URL.revokeObjectURL = jest.fn();

    window.print = jest.fn();
  });

  describe('exportHTML', () => {
    test('generated HTML includes <meta charset="UTF-8">', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      expect(global.Blob).toHaveBeenCalledTimes(1);
      const htmlContent = global.Blob.mock.calls[0][0][0];
      expect(htmlContent).toContain('<meta charset="UTF-8" />');
    });

    test('Blob type is text/html;charset=utf-8', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      expect(global.Blob).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ type: 'text/html;charset=utf-8' })
      );
    });

    test('downloaded file name ends with .html', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      const anchor = document.createElement.mock.results[0].value;
      expect(anchor.download).toMatch(/\.html$/);
      expect(anchor.download).toBe('我的简历.html');
    });

    test('generated HTML includes proper DOCTYPE and html structure', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      const htmlContent = global.Blob.mock.calls[0][0][0];
      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('<html lang="zh-CN">');
      expect(htmlContent).toContain('<title>我的简历</title>');
      expect(htmlContent).toContain('resume-page');
    });

    test('generated HTML contains the rendered markdown content', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      const htmlContent = global.Blob.mock.calls[0][0][0];
      expect(htmlContent).toContain('<h1>测试简历</h1>');
      expect(htmlContent).toContain('<h2>前端工程师</h2>');
      expect(htmlContent).toContain('内容');
    });

    test('generated HTML includes template styles', () => {
      exportHTML(mockMarkdown, 'business', templateStyles);

      const htmlContent = global.Blob.mock.calls[0][0][0];
      expect(htmlContent).toContain('.biz-header');
      expect(htmlContent).toContain('.biz-sidebar');
      expect(htmlContent).toContain('template-business');
    });

    test('triggers download by clicking anchor and cleaning up', () => {
      exportHTML(mockMarkdown, mockTemplateId, templateStyles);

      const anchor = document.createElement.mock.results[0].value;
      expect(document.body.appendChild).toHaveBeenCalledWith(anchor);
      expect(anchor.click).toHaveBeenCalled();
      expect(document.body.removeChild).toHaveBeenCalledWith(anchor);
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    test('business template in exportHTML produces biz-sidebar layout', () => {
      const md = `# 张三
## 前端

---

## 个人简介
测试

## 工作经历
测试`;

      exportHTML(md, 'business', templateStyles);
      const htmlContent = global.Blob.mock.calls[0][0][0];
      expect(htmlContent).toContain('class="biz-sidebar"');
      expect(htmlContent).toContain('class="biz-main"');
      expect(htmlContent).toContain('class="biz-header"');
    });
  });

  describe('exportPDF', () => {
    test('calls window.print()', () => {
      exportPDF();
      expect(window.print).toHaveBeenCalledTimes(1);
    });
  });
});
