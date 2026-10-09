import * as XLSX from 'xlsx';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { watch } from 'node:fs';

const defaultSource = 'C:/Users/nguye/Downloads/danh_sach_sinh_vien.xlsx';
const inputPath = process.argv.slice(2).find(argument => !argument.startsWith('--'));
const sourcePath = resolve(inputPath || defaultSource);
const outputPath = resolve('src/assets/students.json');

function readCell(row, index) { return row[index] ?? null; }

async function importStudents() {
  if (!existsSync(sourcePath)) {
    console.error(`[students] Source file not found: ${sourcePath}`);
    return;
  }
  const workbook = XLSX.read(await readFile(sourcePath));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
  const students = rows.slice(1)
    .filter(row => readCell(row, 0))
    .map(row => ({
      studentId: String(readCell(row, 0)).trim(),
      fullName: String(readCell(row, 1) ?? '').trim(),
      gender: String(readCell(row, 2) ?? '').trim(),
      email: String(readCell(row, 3) ?? '').trim(),
      major: String(readCell(row, 4) ?? '').trim(),
      academicYear: Number(readCell(row, 5))
    }));
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(students, null, 2)}\n`, 'utf8');
  console.log(`[students] ${new Date().toLocaleTimeString()} imported ${students.length} records`);
}

await importStudents();

if (process.argv.includes('--watch')) {
  console.log(`[students] Watching ${basename(sourcePath)} for changes...`);
  let timer;
  watch(dirname(sourcePath), (_, changedFile) => {
    if (changedFile !== basename(sourcePath)) return;
    clearTimeout(timer);
    timer = setTimeout(() => importStudents(), 300);
  });
}
