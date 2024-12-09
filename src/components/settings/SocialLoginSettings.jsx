import React, { useState } from "react";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
 Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CustomLabel from "../CustomLabel";



const SociaLoginSettings = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Google" />
          <Tab label="Facebook" />
          <Tab label="LinkedIn" />
          <Tab label="Twitter" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} container alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isChecked}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                />

                <Typography>Status</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="googleappid" required>
                  Google App ID
                </CustomLabel>
                <CustomTextField
                  id="googleappid"
                  name="googleappid"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="googlesecret" required>
                  Google Secret
                </CustomLabel>
                <CustomTextField
                  id="googlesecret"
                  name="googlesecret"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid conatiner>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography>Callback</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "15px",
                        // mt: 2,
                      }}
                    >
                      https://creworder/callback/google
                    </Typography>
                    <Button
                      sx={{
                        ml: 2,
                        border: "2px solid #405189",
                        color: "#405189",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "lightblue",
                        },
                        height: "30px",
                      }}
                    >
                      Copy
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        color: "#405189",
                        mt: 2,
                        fontSize: "15px",
                      }}
                    >
                      (Add this callback url on your google app settings.)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                    marginLeft: "5px",
                  }}
                >
                  Send Test Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} container alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isChecked}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                />

                <Typography>Status</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="facebookappid" required>
                  Facebook App ID
                </CustomLabel>
                <CustomTextField
                  id="facebookappid"
                  name="facebookappid"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="facebooksecret" required>
                  Facebook Secret
                </CustomLabel>
                <CustomTextField
                  id="facebooksecret"
                  name="facebooksecret"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid conatiner>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography>Callback</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "15px",
                        // mt: 2,
                      }}
                    >
                      https://creworder/callback/facebook
                    </Typography>
                    <Button
                      sx={{
                        ml: 2,
                        border: "2px solid #405189",
                        color: "#405189",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "lightblue",
                        },
                        height: "30px",
                      }}
                    >
                      Copy
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        color: "#405189",
                        mt: 2,
                        fontSize: "15px",
                      }}
                    >
                      (Add this callback url on your facebook app settings.)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                    marginLeft: "5px",
                  }}
                >
                  Send Test Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} container alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={isChecked}
                    onChange={handleChange}
                    color="primary"
                  />
                }
              />

              <Typography>Status</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomLabel htmlFor="linkedinappid" required>
              Linkedin App ID
              </CustomLabel>
              <CustomTextField
                id="linkedinappid"
                name="linkedinappid"
                placeholder="e.g. creworder"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomLabel htmlFor="linkedinsecret" required>
              Linkedin Secret
              </CustomLabel>
              <CustomTextField
                id="linkedinsecret"
                name="linkedinsecret"
                placeholder="e.g. creworder"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid conatiner>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography>Callback</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      color: "gray",
                      fontSize: "15px",
                      // mt: 2,
                    }}
                  >
                    https://creworder/callback/linkedin
                  </Typography>
                  <Button
                    sx={{
                      ml: 2,
                      border: "2px solid #405189",
                      color: "#405189",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "lightblue",
                      },
                      height: "30px",
                    }}
                  >
                    Copy
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    sx={{
                      color: "#405189",
                      mt: 2,
                      fontSize: "15px",
                    }}
                  >
                    (Add this callback url on your linkedin app settings.)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                sx={{
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#405189",
                  },
                }}
              >
                Save
              </Button>
            
            </Grid>
          </Grid>
        </Box>
        )}
        {activeTab === 3 && (
          <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} container alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={isChecked}
                    onChange={handleChange}
                    color="primary"
                  />
                }
              />

              <Typography>Status</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomLabel htmlFor="twitterappid" required>
              Twitter App ID
              </CustomLabel>
              <CustomTextField
                id="twitterappid"
                name="twitterappid"
                placeholder="e.g. creworder"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomLabel htmlFor="twittersecret" required>
              Twitter Secret
              </CustomLabel>
              <CustomTextField
                id="twittersecret"
                name="twittersecret"
                placeholder="e.g. creworder"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid conatiner>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography>Callback</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      color: "gray",
                      fontSize: "15px",
                      // mt: 2,
                    }}
                  >
                    https://creworder/callback/twitter
                  </Typography>
                  <Button
                    sx={{
                      ml: 2,
                      border: "2px solid #405189",
                      color: "#405189",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "lightblue",
                      },
                      height: "30px",
                    }}
                  >
                    Copy
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    sx={{
                      color: "#405189",
                      mt: 2,
                      fontSize: "15px",
                    }}
                  >
                    (Add this callback url on your twiter app settings.)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                sx={{
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#405189",
                  },
                }}
              >
                Save
              </Button>
              
            </Grid>
          </Grid>
        </Box>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default SociaLoginSettings;
