import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

const reflectors = ['UKW-B', 'UKW-C'];
const rotors = ['I', 'II', 'III', 'IV', 'V'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const EnigmaSettingsModal = () => {
  const [open, setOpen] = useState(false);
  const [reflector, setReflector] = useState(reflectors[0]);
  const [rotor1, setRotor1] = useState(rotors[0]);
  const [rotor2, setRotor2] = useState(rotors[1]);
  const [rotor3, setRotor3] = useState(rotors[2]);
  const [setting1, setSetting1] = useState(alphabet[0]);
  const [setting2, setSetting2] = useState(alphabet[0]);
  const [setting3, setSetting3] = useState(alphabet[0]);
  const [position1, setPosition1] = useState(alphabet[0]);
  const [position2, setPosition2] = useState(alphabet[0]);
  const [position3, setPosition3] = useState(alphabet[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Enigma Settings
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'rgba(0, 0, 0, 0.5)', // Transparente
            boxShadow: 24,
            p: 4,
            border: '2px solid black',
            color: 'white', // Texto blanco
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Enigma Machine Settings
          </Typography>
          <Table
            sx={{
              border: '1px solid black',
              '& .MuiTableCell-root': {
                border: '1px solid black',
                color: 'white', // Texto blanco en las celdas
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Reflector</InputLabel>
                    <Select
                      value={reflector}
                      onChange={(e) => setReflector(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {reflectors.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>1<sup>st</sup> Rotor:</TableCell>
                <TableCell>2<sup>nd</sup> Rotor:</TableCell>
                <TableCell>3<sup>rd</sup> Rotor:</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rotor</TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Rotor 1</InputLabel>
                    <Select
                      value={rotor1}
                      onChange={(e) => setRotor1(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {rotors.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Rotor 2</InputLabel>
                    <Select
                      value={rotor2}
                      onChange={(e) => setRotor2(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {rotors.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Rotor 3</InputLabel>
                    <Select
                      value={rotor3}
                      onChange={(e) => setRotor3(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {rotors.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ring Setting</TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Setting 1</InputLabel>
                    <Select
                      value={setting1}
                      onChange={(e) => setSetting1(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Setting 2</InputLabel>
                    <Select
                      value={setting2}
                      onChange={(e) => setSetting2(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Setting 3</InputLabel>
                    <Select
                      value={setting3}
                      onChange={(e) => setSetting3(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Initial Position</TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Position 1</InputLabel>
                    <Select
                      value={position1}
                      onChange={(e) => setPosition1(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Position 2</InputLabel>
                    <Select
                      value={position2}
                      onChange={(e) => setPosition2(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: 'white' }}>Position 3</InputLabel>
                    <Select
                      value={position3}
                      onChange={(e) => setPosition3(e.target.value)}
                      sx={{ color: 'white' }}
                    >
                      {alphabet.map((letter) => (
                        <MenuItem key={letter} value={letter}>
                          {letter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </div>
  );
};

export default EnigmaSettingsModal;