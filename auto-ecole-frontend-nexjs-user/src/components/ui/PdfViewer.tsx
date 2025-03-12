import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Définir le workerSrc (à adapter selon ton projet)
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const PdfViewer = ({ fileUrl }) => {
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const renderPdf = async () => {
      const pdf = await getDocument(fileUrl).promise;
      if (!isMounted) return;

      setNumPages(pdf.numPages);

      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Nettoyer les anciennes pages
      }

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (!isMounted) return;

        const page = await pdf.getPage(pageNum);
        const scale = 1.2; // 🔹 Ajuste cette valeur pour réduire ou agrandir les pages
        const viewport = page.getViewport({ scale });

        // Création d'un conteneur pour chaque page
        const pageContainer = document.createElement("div");
        pageContainer.style.display = "flex";
        pageContainer.style.flexDirection = "column";
        pageContainer.style.alignItems = "center";
        pageContainer.style.marginBottom = "40px"; // 🔹 Ajoute un espace entre les pages
        pageContainer.style.borderBlock = "20px solid #00e498";
        pageContainer.style.borderBottom = "none";
        pageContainer.style.borderTopLeftRadius = "20px";
        pageContainer.style.borderTopRightRadius = "20px";
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Création du texte personnalisé pour chaque page
        const pageText = document.createElement("p");
        pageText.innerText = pageNum === 1 ? "Page 1" : `Page ${pageNum}`;
        pageText.style.fontSize = "14px";
        pageText.style.color = "#00e498";
        pageText.style.marginTop = "10px"; // 🔹 Espace entre le canvas et le texte
        pageText.style.borderBlock = "5px solid #00e498";
        pageText.style.borderTop = "none";
        pageText.style.borderBottomLeftRadius = "20px";
        pageText.style.borderBottomRightRadius = "20px";
        pageText.style.padding = "5px";
        

        // Ajout des éléments au conteneur
        pageContainer.appendChild(canvas);
        pageContainer.appendChild(pageText);
        if (containerRef.current) {
          containerRef.current.appendChild(pageContainer);
        }

        await page.render({ canvasContext: context, viewport }).promise;
      }
    };

    renderPdf();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [fileUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    />
  );
};

export default PdfViewer;
