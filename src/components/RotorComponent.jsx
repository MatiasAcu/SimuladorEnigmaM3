import React from "react";
import { ButtonBase, ButtonGroup, Stack, Typography } from "@mui/material";

const RotorComponent = ({ rotor, setRotor }) => {
  const handleRotateRight = () => {
    const newRotor = rotor.clone(); 
    newRotor.incPosition();
    setRotor(newRotor);
  };

  const handleRotateLeft = () => {
    const newRotor = rotor.clone(); 
    newRotor.setPosition(
      (rotor.position - 1 + rotor.alphabet.length) % rotor.alphabet.length
    );
    setRotor(newRotor);
  };

  const getLetter = (pos) => {
    const newPosition =
      (rotor.position + pos + rotor.alphabet.length) % rotor.alphabet.length;
    return rotor.alphabet[newPosition];
  };

  return (
    <Stack direction="column">
      <ButtonGroup
        orientation="vertical"
        sx={{
          color: "black",
          border: "4px solid black",
          minHeight: 130,
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(42, 42, 42, 1) 2%, rgba(245, 245, 245, 1) 23%, rgba(52, 52, 52, 1) 25%, rgba(216, 216, 216, 1) 26%, rgba(255, 255, 255, 1) 50%, rgba(212, 212, 212, 1) 75%, rgba(45, 45, 45, 1) 78%, rgba(226, 226, 226, 1) 79%, rgba(42, 42, 42, 1) 98%, rgba(0, 0, 0, 1) 100%)",
        }}
        variant="outlined"
      >
        <ButtonBase
          sx={{ py: 1, minWidth: 20, color: "black", border: 0 }}
          onClick={handleRotateRight}
        >
          {getLetter(1)}
        </ButtonBase>
        <ButtonBase sx={{ py: 2, minWidth: 20, minHeight: 95, border: 0 }} disabled>
          <Typography color={"black"}>{getLetter(0)}</Typography>
        </ButtonBase>
        <ButtonBase
          sx={{ py: 1, color: "black", minWidth: 20, border: 0 }}
          onClick={handleRotateLeft}
        >
          {getLetter(-1)}
        </ButtonBase>
      </ButtonGroup>
      <Stack
        sx={{
          display: "flex",
          border: "4px 0",
          maxWidth: 40,
          background: 0,
        }}
      >
        <Typography color={"yellow"} textAlign={"center"} fontSize={16}>
          {rotor.id}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RotorComponent;
