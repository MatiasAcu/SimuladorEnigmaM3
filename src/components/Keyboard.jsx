import React from 'react';
import { Stack, Typography, ButtonBase } from '@mui/material';

const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K"];
  const row3 = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];

  const renderRow = (keys) => (
    <Stack direction="row" spacing={4} justifyContent="center">
      {keys.map((key) => (
        <ButtonBase
          key={key}
          onClick={() => onKeyPress(key)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 45,
            minWidth: 45,
            border: "3px #AAAAAA solid",
            borderRadius: '50%',
            background: "linear-gradient(135deg, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%);",
            color: '#D0D0D0',
            '&:hover': {
              backgroundColor: 'darkgray',
            },
          }}
        >
          <Typography fontSize={16}>{key}</Typography>
        </ButtonBase>
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

export default Keyboard;