import { Box, Button, Drawer, Grid } from "@mui/material";
import React, { useState } from "react";
import BranchVote from "../../components/BranchVote";
import SurveyChart from "../../components/SurveyChart";

const DashboardPage = () => {
  const [drawerVoteOpen, setDrawerVoteOpen] = useState(false);
  const [voteValue, setVoteValue] = useState("");
  const isVoted = window.localStorage.getItem("isVoted");

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Box width="100%" maxWidth={600} margin="auto">
            <SurveyChart />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              color="info"
              onClick={() => setDrawerVoteOpen(true)}
              disabled={!!isVoted}
            >
              {!!isVoted ? "โหวตแล้ว ✔" : "โหวตสาขาที่ชอบ"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Drawer
        open={drawerVoteOpen}
        onClose={() => {
          setDrawerVoteOpen(false);
        }}
        anchor="right"
      >
        <Box width="70vw" maxWidth="500px" p={2}>
          <BranchVote
            voteValue={voteValue}
            setVoteValue={setVoteValue}
            setDrawerVoteOpen={setDrawerVoteOpen}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default DashboardPage;
