import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    // Simulation de données (remplacez par votre DB)
    const mockData = {
      name: `Élève ${studentId}`,
      course: "Permis B",
      amount: "2500 DH"
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(`
      <h1 style="font-family: Arial; color: #3730a3;">Attestation de Paiement</h1>
      <p>Nom: ${mockData.name}</p>
      <p>Formation: ${mockData.course}</p>
      <p>Montant: ${mockData.amount}</p>
    `);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=attestation.pdf'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Échec de génération' },
      { status: 500 }
    );
  }
}