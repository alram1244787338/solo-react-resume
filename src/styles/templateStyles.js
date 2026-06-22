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
  font-size: 14px;
}
.template-business h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #1a3c6e;
  letter-spacing: 1px;
}
.template-business h1 + h2 {
  margin-top: -2px;
  font-size: 15px;
  font-weight: 400;
  color: #5a7db8;
  border: none;
  padding: 0;
}
.template-business h2 {
  font-size: 15px;
  font-weight: 700;
  color: #1a3c6e;
  margin: 26px 0 12px;
  padding: 0 0 8px 12px;
  border-left: 4px solid #1a3c6e;
  border-bottom: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.template-business h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1a3c6e;
  margin: 16px 0 4px;
}
.template-business p { margin: 4px 0; }
.template-business ul {
  padding-left: 20px;
  margin: 6px 0;
}
.template-business li {
  margin: 4px 0;
  line-height: 1.65;
}
.template-business hr {
  border: none;
  border-top: 1px dashed #bccde2;
  margin: 18px 0;
}
.template-business strong {
  color: #1a3c6e;
  font-weight: 700;
}
.template-business a { color: #2c7be5; }
`;

export const templateStyles = {
  simple: simpleCss,
  business: businessCss,
};

export const templateNames = {
  simple: '简约风',
  business: '商务风',
};
