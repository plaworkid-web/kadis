import { NextRequest, NextResponse } from "next/server";
import { getAllUcapan, addUcapan } from "@/lib/db";

export async function GET() {
  try {
    const ucapan = getAllUcapan();
    return NextResponse.json(ucapan);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data ucapan" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, jabatan, pesan } = body;

    if (!nama || !pesan) {
      return NextResponse.json(
        { error: "Nama dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    const ucapan = addUcapan(nama, jabatan || "", pesan);
    return NextResponse.json(ucapan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan ucapan" }, { status: 500 });
  }
}
