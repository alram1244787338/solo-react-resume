import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from '../src/components/Toolbar';

describe('Toolbar.jsx', () => {
  const mockOnTemplateChange = jest.fn();
  const mockOnExportHTML = jest.fn();
  const mockOnExportPDF = jest.fn();

  const defaultProps = {
    templateId: 'simple',
    onTemplateChange: mockOnTemplateChange,
    onExportHTML: mockOnExportHTML,
    onExportPDF: mockOnExportPDF,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders template switch buttons with correct labels', () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByRole('button', { name: '简约风' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '商务风' })).toBeInTheDocument();
  });

  test('renders export buttons', () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByRole('button', { name: '导出 HTML' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '导出 PDF' })).toBeInTheDocument();
  });

  test('active template button has is-active class when templateId matches', () => {
    render(<Toolbar {...defaultProps} templateId="simple" />);

    const simpleBtn = screen.getByRole('button', { name: '简约风' });
    const businessBtn = screen.getByRole('button', { name: '商务风' });

    expect(simpleBtn).toHaveClass('is-active');
    expect(businessBtn).not.toHaveClass('is-active');
  });

  test('business button is active when templateId="business"', () => {
    render(<Toolbar {...defaultProps} templateId="business" />);

    const simpleBtn = screen.getByRole('button', { name: '简约风' });
    const businessBtn = screen.getByRole('button', { name: '商务风' });

    expect(simpleBtn).not.toHaveClass('is-active');
    expect(businessBtn).toHaveClass('is-active');
  });

  test('clicking 简约风 button triggers onTemplateChange with "simple"', () => {
    render(<Toolbar {...defaultProps} />);

    const simpleBtn = screen.getByRole('button', { name: '简约风' });
    fireEvent.click(simpleBtn);

    expect(mockOnTemplateChange).toHaveBeenCalledTimes(1);
    expect(mockOnTemplateChange).toHaveBeenCalledWith('simple');
  });

  test('clicking 商务风 button triggers onTemplateChange with "business"', () => {
    render(<Toolbar {...defaultProps} />);

    const businessBtn = screen.getByRole('button', { name: '商务风' });
    fireEvent.click(businessBtn);

    expect(mockOnTemplateChange).toHaveBeenCalledTimes(1);
    expect(mockOnTemplateChange).toHaveBeenCalledWith('business');
  });

  test('clicking 导出 HTML triggers onExportHTML callback', () => {
    render(<Toolbar {...defaultProps} />);

    const exportHTMLBtn = screen.getByRole('button', { name: '导出 HTML' });
    fireEvent.click(exportHTMLBtn);

    expect(mockOnExportHTML).toHaveBeenCalledTimes(1);
    expect(mockOnTemplateChange).not.toHaveBeenCalled();
    expect(mockOnExportPDF).not.toHaveBeenCalled();
  });

  test('clicking 导出 PDF triggers onExportPDF callback', () => {
    render(<Toolbar {...defaultProps} />);

    const exportPDFBtn = screen.getByRole('button', { name: '导出 PDF' });
    fireEvent.click(exportPDFBtn);

    expect(mockOnExportPDF).toHaveBeenCalledTimes(1);
    expect(mockOnTemplateChange).not.toHaveBeenCalled();
    expect(mockOnExportHTML).not.toHaveBeenCalled();
  });

  test('all callbacks work independently', () => {
    render(<Toolbar {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '商务风' }));
    fireEvent.click(screen.getByRole('button', { name: '导出 HTML' }));
    fireEvent.click(screen.getByRole('button', { name: '导出 PDF' }));

    expect(mockOnTemplateChange).toHaveBeenCalledTimes(1);
    expect(mockOnExportHTML).toHaveBeenCalledTimes(1);
    expect(mockOnExportPDF).toHaveBeenCalledTimes(1);
  });

  test('shows template label text', () => {
    render(<Toolbar {...defaultProps} />);
    expect(screen.getByText('模板：')).toBeInTheDocument();
  });

  test('export PDF button has primary styling class', () => {
    render(<Toolbar {...defaultProps} />);
    const exportPDFBtn = screen.getByRole('button', { name: '导出 PDF' });
    expect(exportPDFBtn).toHaveClass('toolbar__btn--primary');
  });
});
