import React from "react";
import { useRouter } from "next/router";
import ManifestPreview from "@/components/manage/ManifestPreview";
import { Box } from "@mui/material";
const manifestlabelpage = () => {
  const router = useRouter();
  const { selectedRows } = router.query;
  const rows = JSON.parse(selectedRows || "[]");
  return (
    <Box 
      sx={{ 
        // width: '1200px',
        margin: '0 auto',
        padding: 2,
        boxShadow: 3
      }}>
      <ManifestPreview open={true} selectedRows={rows} />
    </Box>
  );
};

export default manifestlabelpage;
