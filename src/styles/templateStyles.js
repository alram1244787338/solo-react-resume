export const simpleCss = `
.template-simple {
  color: #222;
  line-height: 1.65;
  font-size: 14px;
}
.template-simple h1 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #111;
}
.template-simple h2 {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin: 24px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1.5px solid #333;
}
.template-simple h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 14px 0 6px;
}
.template-simple p { margin: 4px 0; }
.template-simple ul {
  padding-left: 20px;
  margin: 6px 0;
}
.template-simple li {
  margin: 4px 0;
  line-height: 1.6;
}
.template-simple hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 16px 0;
}
.template-simple strong {
  color: #000;
  font-weight: 600;
}
.template-simple a { color: #1e6bd6; }
`;

export const businessCss = `
.template-business {
  color: #2c3e50;
  line-height: 1.7;
  font-size: 15px;
  padding: 0 !important;
}
.template-business .biz-header {
  background: linear-gradient(135deg, #1a2a4a 0%, #2c3e68 100%);
  color: #ffffff;
  padding: 44px 56px 36px;
  margin: -48px -56px 0;
}
.template-business .biz-header h1 {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 6px;
  color: #ffffff;
}
.template-business .biz-header .biz-subtitle {
  font-size: 18px;
  font-weight: 400;
  color: #a8bcdc;
  margin-bottom: 14px;
}
.template-business .biz-header .biz-contact {
  color: #d4dff2;
  font-size: 14px;
  line-height: 1.8;
}
.template-business .biz-body {
  display: flex;
  gap: 36px;
  padding: 36px 56px 48px;
  margin: 0 -56px -48px;
}
.template-business .biz-sidebar {
  width: 34%;
  flex-shrink: 0;
  padding-right: 28px;
  border-right: 2px solid #e1e7f1;
}
.template-business .biz-main {
  flex: 1;
  min-width: 0;
}
.template-business h2 {
  font-size: 15px;
  font-weight: 800;
  color: #1a2a4a;
  margin: 0 0 14px;
  padding: 0 0 8px 12px;
  border-left: 4px solid #1a2a4a;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.template-business .biz-sidebar h2:first-child {
  margin-top: 0;
}
.template-business h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a2a4a;
  margin: 18px 0 4px;
}
.template-business p { margin: 4px 0; }
.template-business ul {
  padding-left: 20px;
  margin: 6px 0;
}
.template-business li {
  margin: 5px 0;
  line-height: 1.7;
}
.template-business hr { display: none; }
.template-business strong {
  color: #1a2a4a;
  font-weight: 700;
}
.template-business a { color: #2c7be5; }
.template-business .biz-section { margin-bottom: 26px; }
.template-business .biz-sidebar .biz-section p {
  font-size: 14px;
  line-height: 1.8;
}
@media print {
  .template-business { padding: 0 !important; }
  .template-business .biz-header {
    margin: 0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .template-business .biz-body {
    margin: 0 !important;
  }
}
`;

export const templateStyles = {
  simple: simpleCss,
  business: businessCss,
};

export const templateNames = {
  simple: '简约风',
  business: '商务风',
};
