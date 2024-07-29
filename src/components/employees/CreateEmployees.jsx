import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { Typography, Button, Grid, Divider, CardContent } from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("preview").src = e.target.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

const CreateEmployees = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/superadmin/employees");
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  Add Employee
                </Typography>
              </Grid>

              <Divider sx={{ my: 2 }} />
              <Grid item p={2} md={12} xs={12} sm={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="username" required>
                      Username
                    </CustomLabel>
                    <CustomTextField
                      id="username"
                      name="username"
                      placeholder="username"
                      type="text"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="first_name" required>
                      First Name
                    </CustomLabel>
                    <CustomTextField
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="last_name" required>
                      Last Name
                    </CustomLabel>
                    <CustomTextField
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="contact_no" required>
                      Phone Number
                    </CustomLabel>
                    <CustomTextField
                      id="contact_no"
                      name="contact_no"
                      placeholder="contact_no"
                      type="text"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="email" required>
                      Email
                    </CustomLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      placeholder="email"
                      type="email"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="company_image" required>
                      Upload
                    </CustomLabel>
                    <input
                      type="file"
                      id="company_image"
                      onChange={handleFileChange}
                      style={{
                        marginTop: "8px",
                        display: "block",
                        width: "100%",
                      }}
                    />
                    <Grid
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <img
                        id="preview"
                        src="https://placehold.co/600x400/EEE/31343C"
                        alt="Preview"
                        width="35%"
                        style={{ objectFit: "contain" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid
                  item
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "#405189",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#334a6c",
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>

    //<Grid container sx={{ padding: 3 }}>
    //   <Grid item xs={12}>
    //     <CustomCard>
    //       <CardContent>
    //       <Grid item>
    //           <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
    //             Add Employee
    //           </Typography>
    //         </Grid>
    //         <Divider sx={{ my: 2 }} />
    //         <Grid
    //           item
    //           sx={{
    //             display: "flex",
    //             flexDirection: { xs: "column", sm: "row" },
    //             gap: 2,
    //             marginTop: 2,
    //           }}
    //         >

    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="username" required>
    //                Username
    //             </CustomLabel>
    //             <CustomTextField
    //               id="username"
    //               name="username"
    //               placeholder="username"
    //               type="text"
    //               required
    //               fullWidth
    //             />
    //           </Grid>
    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="first_name" required>
    //                First Name
    //             </CustomLabel>
    //             <CustomTextField
    //               id="first_name"
    //               name="first_name"
    //               placeholder="first_name"
    //               type="text"
    //               required
    //               fullWidth
    //             />
    //           </Grid>
    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="last_name" required>
    //                Last Name
    //             </CustomLabel>
    //             <CustomTextField
    //               id="last_name"
    //               name="last_name"
    //               placeholder="last_name"
    //               type="text"
    //               required
    //               fullWidth
    //             />
    //           </Grid>
    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="phone" required>
    //               Phone Number
    //             </CustomLabel>
    //             <CustomTextField
    //               id="phone"
    //               name="phone"
    //               type="number"
    //               placeholder="(+91)"
    //               required
    //               fullWidth
    //             />
    //           </Grid>
    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="email" required>
    //               Email
    //             </CustomLabel>
    //             <CustomTextField
    //               id="email"
    //               name="email"
    //               type="email"
    //               placeholder="e.g. test@creworder.com"
    //               required
    //               fullWidth
    //             />
    //           </Grid>

    //         </Grid>

    //         <Grid
    //           item
    //           sx={{
    //             display: "flex",
    //             flexDirection: { xs: "column", sm: "row" },
    //             gap: 2,
    //             marginTop: 2,
    //           }}
    //         >
    //           <Grid item sx={{ flex: 1 }}>
    //             <CustomLabel htmlFor="password" required>
    //             Password
    //             </CustomLabel>
    //             <CustomTextField
    //               id="password"
    //               name="password"
    //               placeholder="XXXXX"
    //               type="text"
    //               required
    //               fullWidth
    //             />

    //           </Grid>
    //           <Grid item sx={{ flex: 1 }}>
    //           <CustomLabel htmlFor="Confirm Password" required>
    //               Confirm Password
    //             </CustomLabel>
    //             <CustomTextField
    //               id="password"
    //               name="password"
    //               type="password"
    //               placeholder="e.g. XXXXX"
    //               required
    //               fullWidth
    //             />
    //           </Grid>

    //         </Grid>

    //         <Grid
    //           item
    //           sx={{
    //             display: "flex",
    //             flexDirection: { xs: "column", sm: "row" },
    //             gap: 2,
    //             marginTop: 2,
    //           }}
    //         >

    //           <Grid item xs={6} sm={6}>
    //             <CustomLabel htmlFor="companyLogo" required>
    //               Upload Company Logo
    //             </CustomLabel>
    //             <input
    //               type="file"
    //               id="companyLogo"
    //               onChange={handleFileChange}
    //               style={{ marginTop: "8px", display: "block", width: "100%" }}
    //             />
    //             <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
    //               <img
    //                 id="preview"
    //                 src="https://placehold.co/600x400/EEE/31343C"
    //                 alt="Preview"
    //                 width="35%"
    //                 style={{ objectFit: "contain" }}
    //               />
    //             </Grid>
    //           </Grid>

    //         </Grid>

    //         <Grid
    //           item
    //           sx={{
    //             marginTop: 3,
    //             display: "flex",
    //             justifyContent: "flex-end",
    //           }}
    //         >
    //           <Button
    //             sx={{
    //               padding: "8px 16px",
    //               fontSize: "14px",
    //               fontWeight: "bold",
    //               backgroundColor: "#405189",
    //               color: "white",
    //               "&:hover": {
    //                 backgroundColor: "#334a6c",
    //               },
    //             }}
    //             onClick={handleSubmit}
    //           >
    //             Submit
    //           </Button>
    //         </Grid>
    //       </CardContent>

    //     </CustomCard>
    //   </Grid>
    // </Grid>
  );
};

export default CreateEmployees;
