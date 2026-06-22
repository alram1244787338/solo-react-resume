import {
  simpleCss,
  businessCss,
  templateStyles,
  templateNames,
} from '../src/styles/templateStyles';

describe('templateStyles.js', () => {
  test('exports simpleCss and businessCss as non-empty strings', () => {
    expect(typeof simpleCss).toBe('string');
    expect(simpleCss.length).toBeGreaterThan(0);
    expect(typeof businessCss).toBe('string');
    expect(businessCss.length).toBeGreaterThan(0);
  });

  test('businessCss contains key class selectors for business layout', () => {
    expect(businessCss).toContain('.biz-header');
    expect(businessCss).toContain('.biz-sidebar');
    expect(businessCss).toContain('.biz-body');
    expect(businessCss).toContain('.biz-main');
    expect(businessCss).toContain('.biz-section');
    expect(businessCss).toContain('.biz-subtitle');
    expect(businessCss).toContain('.biz-contact');
  });

  test('businessCss has dark gradient background for header', () => {
    expect(businessCss).toContain('background: linear-gradient');
    expect(businessCss).toContain('#1a2a4a');
  });

  test('businessCss defines two-column layout with flex', () => {
    expect(businessCss).toContain('display: flex');
    expect(businessCss).toContain('.biz-sidebar');
    expect(businessCss).toContain('.biz-main');
    expect(businessCss).toContain('width: 34%');
  });

  test('templateStyles object maps ids to css strings', () => {
    expect(templateStyles.simple).toBe(simpleCss);
    expect(templateStyles.business).toBe(businessCss);
  });

  test('templateNames maps ids to Chinese display names', () => {
    expect(templateNames.simple).toBe('简约风');
    expect(templateNames.business).toBe('商务风');
  });

  test('simpleCss has clean typography but no biz- classes', () => {
    expect(simpleCss).not.toContain('.biz-');
    expect(simpleCss).toContain('.template-simple');
    expect(simpleCss).toContain('border-bottom');
  });

  test('businessCss has larger typography than simple', () => {
    expect(businessCss).toContain('font-size: 38px');
    expect(businessCss).toContain('font-size: 15px');
    expect(simpleCss).toContain('font-size: 14px');
    expect(simpleCss).toContain('font-size: 30px');
  });
});
