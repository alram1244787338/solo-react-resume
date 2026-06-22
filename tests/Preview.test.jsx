import React from 'react';
import { render, screen } from '@testing-library/react';
import Preview from '../src/components/Preview';

const mockMarkdown = `# 测试用户
## 测试工程师

📧 test@example.com

---

## 个人简介
这是个人简介内容

## 工作经历
### 测试公司
**测试职位** | 2023 - 至今

- 测试工作内容 1
- 测试工作内容 2
`;

describe('Preview.jsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with templateId="simple" and contains resume-page class', () => {
    const { container } = render(
      <Preview markdown={mockMarkdown} templateId="simple" />
    );

    const resumePage = container.querySelector('.resume-page');
    expect(resumePage).toBeInTheDocument();
    expect(resumePage).toHaveClass('template-simple');
    expect(resumePage).not.toHaveClass('template-business');
  });

  test('simple template renders markdown content as HTML', () => {
    render(<Preview markdown={mockMarkdown} templateId="simple" />);

    expect(screen.getByRole('heading', { level: 1, name: '测试用户' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '测试工程师' })).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('这是个人简介内容')).toBeInTheDocument();
    expect(screen.getByText('测试工作内容 1')).toBeInTheDocument();
    expect(screen.getByText('测试工作内容 2')).toBeInTheDocument();
  });

  test('renders with templateId="business" and contains biz-sidebar class', () => {
    const { container } = render(
      <Preview markdown={mockMarkdown} templateId="business" />
    );

    const resumePage = container.querySelector('.resume-page');
    expect(resumePage).toBeInTheDocument();
    expect(resumePage).toHaveClass('template-business');

    const sidebar = container.querySelector('.biz-sidebar');
    expect(sidebar).toBeInTheDocument();

    const main = container.querySelector('.biz-main');
    expect(main).toBeInTheDocument();

    const header = container.querySelector('.biz-header');
    expect(header).toBeInTheDocument();
  });

  test('business template puts personal info in sidebar and work experience in main', () => {
    const { container } = render(
      <Preview markdown={mockMarkdown} templateId="business" />
    );

    const sidebar = container.querySelector('.biz-sidebar');
    expect(sidebar).toHaveTextContent('个人简介');
    expect(sidebar).toHaveTextContent('这是个人简介内容');

    const main = container.querySelector('.biz-main');
    expect(main).toHaveTextContent('工作经历');
    expect(main).toHaveTextContent('测试公司');
    expect(main).toHaveTextContent('测试工作内容 1');
    expect(main).toHaveTextContent('测试工作内容 2');
  });

  test('business header contains name and contact info', () => {
    const { container } = render(
      <Preview markdown={mockMarkdown} templateId="business" />
    );

    const header = container.querySelector('.biz-header');
    expect(header).toHaveTextContent('测试用户');
    expect(header).toHaveTextContent('测试工程师');
    expect(header).toHaveTextContent('test@example.com');
  });

  test('handles empty markdown gracefully', () => {
    const { container } = render(<Preview markdown="" templateId="simple" />);
    expect(container.querySelector('.resume-page')).toBeInTheDocument();
  });

  test('switches template classes when templateId changes', () => {
    const { container, rerender } = render(
      <Preview markdown={mockMarkdown} templateId="simple" />
    );
    expect(container.querySelector('.resume-page')).toHaveClass('template-simple');

    rerender(<Preview markdown={mockMarkdown} templateId="business" />);
    expect(container.querySelector('.resume-page')).toHaveClass('template-business');
    expect(container.querySelector('.biz-sidebar')).toBeInTheDocument();
  });

  test('contains style tag with template CSS', () => {
    const { container } = render(
      <Preview markdown={mockMarkdown} templateId="business" />
    );
    const styleTag = container.querySelector('.resume-page style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag.innerHTML).toContain('.biz-header');
  });

  test('displays preview header title', () => {
    render(<Preview markdown={mockMarkdown} templateId="simple" />);
    expect(screen.getByText('实时预览')).toBeInTheDocument();
  });
});
