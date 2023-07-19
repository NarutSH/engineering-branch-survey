import { useState } from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { optionsBranch } from "../data/constance";
import { Button, Stack } from "@mui/material";

export default function BranchVote({
  voteValue,
  setVoteValue,
  setDrawerVoteOpen,
}) {
  const onHandleSubmit = async () => {
    setDrawerVoteOpen(false);
    window.localStorage.setItem("isVoted", true);
  };

  return (
    <Box>
      <FormLabel
        id="branch-label"
        sx={{
          mb: 2,
          fontWeight: "xl",
          textTransform: "uppercase",
          fontSize: "xs",
          letterSpacing: "0.15rem",
        }}
      >
        เลือกสาขา
      </FormLabel>
      <RadioGroup
        onChange={(ev) => {
          setVoteValue(ev.target.value);
        }}
        aria-labelledby="branch-label"
        defaultValue=""
        size="lg"
        sx={{ gap: 1.5 }}
      >
        {optionsBranch.map((opt) => (
          <Sheet
            key={opt.id}
            sx={{
              p: 2,
              borderRadius: "md",
              boxShadow: "sm",
              bgcolor: "background.body",
            }}
          >
            <Radio
              label={opt.label}
              overlay
              disableIcon
              value={opt.id}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: "lg",
                    fontSize: "md",
                    color: checked ? "text.primary" : "text.secondary",
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      "--variant-borderWidth": "2px",
                      "&&": {
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>

      <Stack direction="row" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          disabled={!voteValue}
          onClick={onHandleSubmit}
        >
          ยืนยัน
        </Button>
      </Stack>
    </Box>
  );
}
