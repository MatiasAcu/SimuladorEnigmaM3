import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

const Display = ({ displayedLetter, doDisplay }) => {
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  useEffect(() => {
    if (displayedLetter) {
      setHighlightedLetter(displayedLetter);
      const timer = setTimeout(() => {
        setHighlightedLetter(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [doDisplay]);

  const row1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K"];
  const row3 = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];


  const renderRow = (keys) => (
    <Stack direction="row" spacing={4} justifyContent="center">
      {keys.map((key) => (
        <Box
          key={key}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 40,
            minWidth: 40,
            border: "3px #AAAAAA solid",
            borderRadius: "50%",
            background:
              highlightedLetter === key
                ? "linear-gradient(135deg, #fceabb 0%,#f8b500 40%,#f8b500 41%,#fccd4d 43%,#fbdf93 100%)"
                : "linear-gradient(135deg, #000000 0%, #0a0a0a 11%, #0a0a0a 21%, #4e4e4e 33%, #383838 37%, #383838 37%, #1b1b1b 43%, #1b1b1b 43%, #000000 100%);",
            color: highlightedLetter === key ? "#333333" : "#D0D0D0",
          }}
        >
          <Typography fontSize={16}>{key}</Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <Stack spacing={1} my={2}>
      {renderRow(row1)}
      {renderRow(row2)}
      {renderRow(row3)}
    </Stack>
  );
};

export default Display;
