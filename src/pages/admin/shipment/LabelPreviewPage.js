// pages/LabelPreviewPage.js
import React from "react";
import { useRouter } from "next/router";
import LabelPreview from "@/components/manage/LabelPreview";
import { Box } from "@mui/material"; // Import Box from MUI
const LabelPreviewPage = () => {
  const router = useRouter();
  const { selectedRows } = router.query; // Get selected rows from query
  // Parse selected rows from the query string
  const rows = JSON.parse(selectedRows || "[]");
  return (
    <Box 
      sx={{ 
        width: '600px', // Set the desired width
        margin: '0 auto', // Center the component
        padding: 2, // Optional padding
        boxShadow: 3 // Optional shadow for depth
      }}
    >
      <LabelPreview open={true} selectedRows={rows} />
    </Box>
  );
};

export default LabelPreviewPage;
