import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun
} from 'docx';

const projectRoot = path.resolve(import.meta.dirname, '..', '..');
const markdownPath = path.join(projectRoot, 'báo cáo', 'tài liệu', 'Báo cáo tuần 8.md');
const documentPath = path.join(projectRoot, 'báo cáo', 'tài liệu', 'Báo cáo tuần 8.docx');
const markdown = fs.readFileSync(markdownPath, 'utf8');

const paragraphs = [];
let inCodeBlock = false;

for (const line of markdown.split(/\r?\n/)) {
  if (line.startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    continue;
  }

  if (!line.trim()) {
    paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
    continue;
  }

  if (inCodeBlock) {
    paragraphs.push(new Paragraph({
      shading: { fill: 'F1F5F9' },
      spacing: { after: 60 },
      children: [new TextRun({ text: line, font: 'Consolas', size: 19 })]
    }));
    continue;
  }

  if (line.startsWith('# ')) {
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 280 },
      children: [new TextRun({ text: line.slice(2), bold: true })]
    }));
    continue;
  }

  if (line.startsWith('## ')) {
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text: line.slice(3), bold: true })]
    }));
    continue;
  }

  if (line.startsWith('### ')) {
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 160, after: 80 },
      children: [new TextRun({ text: line.slice(4), bold: true })]
    }));
    continue;
  }

  if (line.startsWith('- ')) {
    paragraphs.push(new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 60 },
      children: [new TextRun({ text: line.slice(2) })]
    }));
    continue;
  }

  paragraphs.push(new Paragraph({
    spacing: { after: 100, line: 280 },
    children: [new TextRun({ text: line.replaceAll('`', ''), size: 22 })]
  }));
}

const document = new Document({
  creator: 'W8 Angular Client',
  title: 'Báo cáo tuần 8',
  description: 'Báo cáo triển khai W8 Angular Client',
  styles: {
    default: {
      document: {
        run: { font: 'Times New Roman', size: 22 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1000, right: 1000, bottom: 1000, left: 1200 }
      }
    },
    children: paragraphs
  }]
});

const buffer = await Packer.toBuffer(document);
fs.writeFileSync(documentPath, buffer);
console.log(`Created: ${documentPath}`);
