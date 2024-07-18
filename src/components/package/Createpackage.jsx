import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import useGetPackage from "@/api-manage/useGetpackage";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  FormGroup,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CustomCard from "../CustomCard";

const modules = [
  "Clients",
  "Invoices",
  "Leaves",
  "Reports",
  "Zoom",
  "Webhooks",
  "Employees",
  "Payments",
  "Leads",
  "Orders",
  "SMS",
  "QR Code",
  "Projects",
  "Time Logs",
  "Holidays",
  "Knowledge Base",
  "Recruit",
  "Biolinks",
  "Attendance",
  "Tickets",
  "Products",
  "Bank Account",
  "Payroll",
  "Tasks",
  "Events",
  "Expenses",
  "Messages",
  "Purchase",
  "Estimates",
  "Notices",
  "Contracts",
  "Assets",
  "Letter",
];
const Createpackage = ({ onPackageList }) => {
  const [checked, setChecked] = React.useState([]);

  const handleCheck = (event) => {
    const name = event.target.name;
    setChecked((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleSelectAll = (event) => {
    setChecked(event.target.checked ? modules : []);
  };
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Package
              </Typography>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid item sx={{ marginTop: 3 }}>
              <Typography sx={{ fontSize: "15px" }}>
                Choose Package Type
              </Typography>
              <Grid item sx={{ marginTop: 3 }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="package-type"
                    name="row-radio-buttons-group"
                    value={selectedPlan}
                    onChange={handlePlanChange}
                  >
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "3px 5px",
                        display: "flex",
                        alignItems: "center",
                        marginRight: 2,
                      }}
                    >
                      <FormControlLabel
                        value="free"
                        control={
                          <Radio
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 12 } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "16px" }}>
                            Free Plan
                          </Typography>
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "3px 5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value="paid"
                        control={
                          <Radio
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 12 } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "16px" }}>
                            Paid Plan
                          </Typography>
                        }
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="packageName" required>
                    Package Name
                  </CustomLabel>
                  <CustomTextField
                    id="packageName"
                    name="packageName"
                    placeholder="e.g. creworder"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="maxEmployees" required>
                    Max Employees
                  </CustomLabel>
                  <CustomTextField
                    id="maxEmployees"
                    name="maxEmployees"
                    type="number"
                    placeholder="e.g. 100"
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            {selectedPlan === "paid" && (
              <>
                <Divider sx={{ my: 2 }} />
                <Grid item sx={{ marginTop: 3 }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    Payment Gateway Plans
                  </Typography>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      marginTop: 2,
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <CustomLabel htmlFor="monthlyplanprice" required>
                          Monthly Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="monthlyplanprice"
                          name="monthlyplanprice"
                          placeholder=""
                          type="number"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomLabel htmlFor="annualplanprice" required>
                          Annual Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="annualplanprice"
                          name="annualplanprice"
                          type="number"
                          placeholder=""
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            <Divider sx={{ my: 2 }} />

            <Grid item>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Select Modules for this package
                </Typography>
              </Grid>
              
              <Grid container xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={checked.length === modules.length}
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                {modules.map((module, index) => (
                  <Grid key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={module}
                          checked={checked.includes(module)}
                          onChange={handleCheck}
                        />
                      }
                      label={module}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid item xs={12} sm={12} md={12}>
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <CustomTextField
                id="description"
                name="description"
                placeholder="e.g. description"
                type="text"
                required
                fullWidth
              />
            </Grid>
            
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
                onClick={onPackageList}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Createpackage;
