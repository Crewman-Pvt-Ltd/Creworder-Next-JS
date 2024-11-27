import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";
import LabelPreview from "@/components/manage/LabelPreview";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LabelPreviewPage = () => {
  const router = useRouter();
  const { selectedRows } = router.query;
  const rows = JSON.parse(selectedRows || "[]");
  const printRef = useRef();

  // Download PDF with exact dimensions
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(printRef.current, {
      scale: 2, // Increase resolution
      useCORS: true,
    });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
  
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Full A4 size
  
    // Generate filename with current date and time
    const now = new Date();
    const formattedDate = now
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[\s:/]/g, "-"); // Replace spaces and colons for filename safety
  
    pdf.save(`Labels_${formattedDate}.pdf`);
  };
  

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Labels",
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        
        <Button variant="contained" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Box>
      <Box ref={printRef} sx={{ padding: 2 }}>
        <LabelPreview selectedOrders={rows} />
      </Box>
    </Box>
  );
};

export default LabelPreviewPage;