import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { optionsBranch } from "../data/constance";
import { Button, Stack, TextField } from "@mui/material";

export default function BranchVote({
  voteValue,
  setVoteValue,
  onHandleSubmit,
  setPointValue,
  pointValue,
}) {
  const user = window.localStorage.getItem("user");

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
        {user === "admin" && (
          <TextField
            type="number"
            onKeyDown={(e) => {
              if (e.key === "." || e.key === "e") {
                e.preventDefault();
              }
            }}
            onChange={(ev) => {
              setPointValue(ev.target.value);
            }}
            value={pointValue}
          />
        )}
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
