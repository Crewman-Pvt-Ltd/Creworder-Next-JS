import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Grid,
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
const EditPackage = ({ packageData }) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push("/superadmin/package");
  };
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
                Update Package
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
                  <CustomLabel htmlFor="packagename" required>
                    Package Name
                  </CustomLabel>
                  <CustomTextField
                    id="packagename"
                    name="packagename"
                    placeholder="e.g. creworder"
                    type="text"
                    required
                    fullWidth
                    value={packageData?.packagename || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="maxemployees" required>
                    Max Employees
                  </CustomLabel>
                  <CustomTextField
                    id="maxemployees"
                    name="maxemployees"
                    type="number"
                    placeholder="e.g. 100"
                    required
                    fullWidth
                    value={packageData?.maxemployees || ''}
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
                          value={packageData?.monthlyplanprice || ''}
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
                          value={packageData?.annualplanprice || ''}
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
              container
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditPackage;