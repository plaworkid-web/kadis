import "server-only";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "ucapan.json");

export interface Ucapan {
  id: number;
  nama: string;
  jabatan: string;
  pesan: string;
  created_at: string;
}

function readData(): Ucapan[] {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
      return [];
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw) as Ucapan[];
  } catch {
    return [];
  }
}

function writeData(data: Ucapan[]) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export function getAllUcapan(): Ucapan[] {
  return readData().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function addUcapan(nama: string, jabatan: string, pesan: string): Ucapan {
  const data = readData();
  const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
  const ucapan: Ucapan = {
    id: newId,
    nama,
    jabatan,
    pesan,
    created_at: new Date().toISOString(),
  };
  data.push(ucapan);
  writeData(data);
  return ucapan;
}
