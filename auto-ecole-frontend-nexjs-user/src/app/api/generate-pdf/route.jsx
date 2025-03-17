// app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '') || '';

  try {
    // Validation des paramètres
    if (!token || !studentId) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Récupération des données
    const studentRes = await axios.get(`http://localhost:8000/api/students/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = studentRes.data.student;
    
    const trainingRes = await axios.get(`http://localhost:8000/api/trainings/${data.training_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Données:', data, trainingRes.data);

    if (!data || !trainingRes.data) {
      throw new Error('Données manquantes');
    }

    // Template HTML simplifié
    const html = `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 40px;
              }
              .header {
                  color: #9e4aff;
                  text-align: center;
                  margin-bottom: 20px;
              }
              .content {
                  border: 1px solid #ccc;
                  padding: 20px;
                  border-radius: 8px;
              }
              .content p {
                  line-height: 1.6;
              }
              .footer {
                  margin-top: 20px;
                  text-align: right;
                  font-style: italic;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>DriveVision</h1>
              <h2>Attestation d'Adhésion</h2>
          </div>

          <div class="content">
              <p>Je soussigné(e), <div>RAHARISOA Hangonirina</div>, administrateur de DriveVision, certifie que :</p>
              <p><strong>${data.first_name}' ' ${data.last_name}</strong>, né(e) le <strong>${data.birth_date}</strong>,</p>
              <p>a adhéré à la formation ${trainingRes.data.title} (${trainingRes.data.description}) d'auto-école de DriveVision et a payé le droit d'adhésion de <strong>${data.price}</strong>.</p>
              <p>Cette attestation est délivrée pour servir et valoir ce que de droit.</p>
          </div>

          <div class="footer">
              <p>Fait à Antananarivo, le ${data.created_at}</p>
              <p className="text-sm" >RAHARISOA Hangonirina</p>
              <p>Administrateur</p>
          </div>
      </body>
      </html>
    `;

    // Configuration Puppeteer pour Windows
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.CHROME_PATH || 
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=attestation-${studentId}.pdf`
      }
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur technique' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';
// import axios from 'axios';

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const studentId = searchParams.get('studentId');
//     const authHeader = request.headers.get('Authorization');
//     const token = authHeader?.replace('Bearer ', '');

//     // Validation basique
//     if (!token || !studentId) {
//       return NextResponse.json(
//         { error: 'Paramètres manquants' },
//         { status: 400 }
//       );
//     }

//     // Récupération des données
//     const response = await axios.get(
//       `http://localhost:8000/api/students/${studentId}`,
//       { 
//         headers: { 
//           Authorization: `Bearer ${token}` 
//         } 
//       }
//     );

//     let data = response.data.student;
//     const trainingResponse = await axios.get("http://localhost:8000/api/trainings/" + data.training_id, {
//       headers: {  Authorization: `Bearer ${token}` }
//     });
//     data.training = trainingResponse.data;

//     // Validation des données
//     if (!data || !data.training) {
//       console.log("data: " + data + " data.training: " + data.training);
//       throw new Error('Données de formation manquantes');
//     }

//     // Formatage des dates
//     const birthDate = new Date(data.birth_date).toLocaleDateString('fr-FR') || 'Non spécifiée';
//     const currentDate = new Date().toLocaleDateString('fr-FR', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });

//     // Template HTML avec fallbacks
//     const htmlContent = `
// <!DOCTYPE html>
//       <html>
//       <head>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   margin: 40px;
//               }
//               .header {
//                   color: #9e4aff;
//                   text-align: center;
//                   margin-bottom: 20px;
//               }
//               .content {
//                   border: 1px solid #ccc;
//                   padding: 20px;
//                   border-radius: 8px;
//               }
//               .content p {
//                   line-height: 1.6;
//               }
//               .footer {
//                   margin-top: 20px;
//                   text-align: right;
//                   font-style: italic;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="header">
//               <h1>DriveVision</h1>
//               <h2>Attestation d'Adhésion</h2>
//           </div>

//           <div class="content">
//               <p>Je soussigné(e), <div>RAHARISOA Hangonirina</div>, administrateur de DriveVision, certifie que :</p>
//               <p><strong>${data.first_name}' ' ${data.last_name}</strong>, né(e) le <strong>${data.birth_date}</strong>,</p>
//               <p>a adhéré à la formation ${data.title} (${data.description}) d'auto-école de DriveVision et a payé le droit d'adhésion de <strong>${data.price}</strong>.</p>
//               <p>Cette attestation est délivrée pour servir et valoir ce que de droit.</p>
//           </div>

//           <div class="footer">
//               <p>Fait à Antananarivo, le ${data.created_at}</p>
//               <p className="text-sm" >RAHARISOA Hangonirina</p>
//               <p>Administrateur</p>
//           </div>
//       </body>
//       </html>
//     `;

//     // Génération PDF
//     const browser = await puppeteer.launch({
//       headless: 'new', // Utiliser le nouveau mode headless
//       args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         '--single-process'
//       ],
//       timeout: 1000000, // Augmenter le timeout à 60s
//       userDataDir: './tmp' // Dossier temporaire personnalisé
//     });
    
//     try {
//       const page = await browser.newPage();
//       await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
//       // Ajouter un délai si nécessaire
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const pdfBuffer = await page.pdf({ 
//         format: 'A4',
//         printBackground: true
//       });
      
//       return new NextResponse(pdfBuffer, {
//         headers: {
//           'Content-Type': 'application/pdf',
//           'Content-Disposition': 'attachment; filename=attestation.pdf'
//         }
//       });
//     } finally {
//       // Fermer le navigateur de manière sécurisée
//       await browser.close().catch(e => console.error('Erreur fermeture browser:', e));
//     }

//   } catch (error) {
//     console.error('Erreur PDF:', error.message);
//     return NextResponse.json(
//       { 
//         error: error.message.includes('Données') 
//           ? error.message 
//           : 'Erreur technique'
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const studentId = searchParams.get('studentId');
//     const token = localStorage.getItem('laravel_session');

//     //Simulation de données (remplacez par votre DB)


//     const mockData = {
//       name: `Élève ${studentId}`,
//       course: "Permis B",
//       amount: "2500 DH"
//     };

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
    
//     await page.setContent(`<!DOCTYPE html>
//       <html lang="fr">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Attestation d'Adhésion - DriveVision</title>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   margin: 40px;
//               }
//               .header {
//                   color: #9e4aff;
//                   text-align: center;
//                   margin-bottom: 20px;
//               }
//               .content {
//                   border: 1px solid #ccc;
//                   padding: 20px;
//                   border-radius: 8px;
//               }
//               .content p {
//                   line-height: 1.6;
//               }
//               .footer {
//                   margin-top: 20px;
//                   text-align: right;
//                   font-style: italic;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="header">
//               <h1>DriveVision</h1>
//               <h2>Attestation d'Adhésion</h2>
//           </div>

//           <div class="content">
//               <p>Je soussigné(e), <strong>RAHARISOA Hangonirina</strong>, administrateur de DriveVision, certifie que :</p>
//               <p><strong>{{student_first_name}} {{student_last_name}}</strong>, né(e) le <strong>{{student_birth_date}}</strong>,</p>
//               <p>a adhéré à la formation d'auto-école de DriveVision et a payé le droit d'adhésion de <strong>40 000 Ar</strong>.</p>
//               <p>Cette attestation est délivrée pour servir et valoir ce que de droit.</p>
//           </div>

//           <div class="footer">
//               <p>Fait à Antananarivo, le {{current_date}}</p>
//               <p>RAHARISOA Hangonirina</p>
//               <p>Administrateur</p>
//           </div>
//       </body>
//       </html>
//     `);

//     const pdfBuffer = await page.pdf({ format: 'A4' });
//     await browser.close();

//     return new NextResponse(pdfBuffer, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename=attestation.pdf'
//       }
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Échec de génération' },
//       { status: 500 }
//     );
//   }
// }