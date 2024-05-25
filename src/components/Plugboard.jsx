import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  ButtonBase,
} from "@mui/material";

const Plugboard = ({connections, setConnections}) => {
  const [selectedKey, setSelectedKey] = useState(null);

  const maxConnections = 10;

  const colors = [
    "#FEEA00",
    "#28AFB0",
    "magenta",
    "lime",
    "#1641FF",
    "#F07A86",
    "#FF1616",
    "#B02E0C",
    "#3F612D",
    "#BFEDFF",
  ];

  const rows = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"],
    ["A", "S", "D", "F", "G", "H", "J", "K"],
    ["P", "Y", "X", "C", "V", "B", "N", "M", "L"],
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonSize = isSmallScreen ? 30 : 30;

  const handlePlug = (key) => {
    if (selectedKey === null) {
      setSelectedKey(key);
    } else {
      if (selectedKey === key) {
        setSelectedKey(null);
      } else {
        let existingConnection = connections.find(
          (conn) => conn.keys.includes(selectedKey) || conn.keys.includes(key)
        );

        if (existingConnection) {
          if (
            existingConnection.keys.includes(selectedKey) &&
            existingConnection.keys.includes(key)
          ) {
            // Remove the connection if the same keys are selected again
            const newConnections = connections.filter(
              (conn) => conn !== existingConnection
            );
            setConnections(newConnections);
          } else {
            // Remove existing connection and update with new connection
            const newConnections = connections.filter(
              (conn) => conn !== existingConnection
            );
            const newConnectionKeys = existingConnection.keys.includes(
              selectedKey
            )
              ? [key, selectedKey].sort()
              : [key, existingConnection.keys.find((k) => k !== key)].sort();
            setConnections([
              ...newConnections,
              { keys: newConnectionKeys, color: existingConnection.color },
            ]);
          }
        } else if (connections.length < maxConnections) {
          // Add new connection
          const newConnectionKeys = [selectedKey, key].sort();
          // Find an available color that is not already used
          const usedColors = connections.map((conn) => conn.color);
          const availableColors = colors.filter((color) => !usedColors.includes(color));
          const color = availableColors[0];
          setConnections([...connections, { keys: newConnectionKeys, color }]);
        }
        setSelectedKey(null);
      }
    }
  };

  const getColor = (key) => {
    const connection = connections.find((conn) => conn.keys.includes(key));
    return connection ? connection.color : "black";
  };

  const renderRow = (keys) => (
    <Stack direction="row" spacing={6} justifyContent="center">
      {keys.map((key) => (
        <Stack key={key} direction="column">
          <Typography color="white" textAlign={"center"} fontSize={16}>{key}</Typography>
          <ButtonBase
            onClick={() => handlePlug(key)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: buttonSize,
              minWidth: buttonSize,
              border: `3px gray solid`,
              borderRadius: "50%",
              backgroundColor:
                key === selectedKey && connections.length !== maxConnections
                  ? "#D0D0D0"
                  : getColor(key),
              "&:hover": {
                backgroundColor:
                  key === selectedKey && connections.length !== maxConnections
                    ? "#D0D0D0"
                    : getColor(key),
              },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Box>
      <Stack spacing={1} my={2}>
        {rows.map((row, index) => (
          <React.Fragment key={index}>{renderRow(row)}</React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default Plugboard;