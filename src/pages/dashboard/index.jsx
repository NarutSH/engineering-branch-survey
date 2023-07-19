import { Box, Button, Drawer, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllVotes, postVote } from "../../api/crud";
import BranchVote from "../../components/BranchVote";
import CustomizedSnackbars from "../../components/CustomizedSnackbars";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import { optionsBranch } from "../../data/constance";

const DashboardPage = () => {
  const [drawerVoteOpen, setDrawerVoteOpen] = useState(false);
  const isVoted = window.localStorage.getItem("isVoted");
  const user = window.localStorage.getItem("user");
  const [voteValue, setVoteValue] = useState("");
  const [pointValue, setPointValue] = useState(1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDetail, setSnackbarDetail] = useState({
    message: "",
    severity: "",
  });
  const [chartData, setChartData] = useState(null);

  const getData = async () => {
    try {
      const res = await getAllVotes();
      const { data } = res;

      const newData = data.map((d) => {
        const branchData = optionsBranch.find((opt) => opt.id === d.branch_id);

        return {
          ...d,
          branchData,
        };
      });

      setChartData(data);
    } catch (error) {
      setChartData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onHandleSubmit = async () => {
    try {
      const data = {
        branch_id: +voteValue,
        point: pointValue,
      };
      const response = await postVote(data);

      setSnackbarOpen(true);
      setSnackbarDetail({
        message: "โหวตสำเร็จ",
        severity: "success",
      });

      setDrawerVoteOpen(false);

      if (user !== "admin") {
        window.localStorage.setItem("isVoted", true);
      }

      getData();
    } catch (error) {
      console.log("error", error);

      setSnackbarOpen(true);
      setSnackbarDetail({
        message: "มีข้อผิดพลาดเกิดขึ้น",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">ENGINERERING VOTE</Typography>
          {user === "admin" && (
            <Typography variant="caption" color="red">
              ADMIN MODE
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" maxWidth={800} margin="auto">
            {chartData && <HorizontalBarChart reponseData={chartData} />}
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
            onHandleSubmit={onHandleSubmit}
            pointValue={pointValue}
            setPointValue={setPointValue}
          />
        </Box>
      </Drawer>

      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarDetail.message}
        severity={snackbarDetail.severity}
      />
    </div>
  );
};

export default DashboardPage;
