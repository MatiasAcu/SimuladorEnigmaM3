import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const EnigmaSettings = ({
  availableReflectors,
  reflector,
  setReflector,
  rotors,
  setRotors,
  availableRotors,
  setAvailableRotors,
  onRotorChanged,
}) => {
  const handleRotorChange = (rotorId, position) => {
    const oldRotor = rotors[position];
    let selectedRotor = availableRotors.find((r) => r.id === rotorId);
    selectedRotor = selectedRotor ? selectedRotor : oldRotor;
    setRotors[position](selectedRotor);

    const updatedAvailableRotors = [...availableRotors];
    updatedAvailableRotors.push(rotors[position]);
    updatedAvailableRotors.splice(
      updatedAvailableRotors.indexOf(selectedRotor),
      1
    );
    setAvailableRotors(updatedAvailableRotors);
    onRotorChanged();
  };

  const handleRingSettingChange = (setting, rotorIndex) => {
    const updatedRotor = Object.create(
      Object.getPrototypeOf(rotors[rotorIndex]),
      Object.getOwnPropertyDescriptors(rotors[rotorIndex])
    );
    updatedRotor.setOffset(setting);

    setRotors[rotorIndex](updatedRotor);
  };

  const handleReflectorChange = (id) => {
    let reflector = availableReflectors.find(
      (reflector) => reflector.id === id
    );
    setReflector(reflector);
  };

  return (
    <Grid container spacing={2} maxHeight={0}>
      <Grid item xs={3}>
        <FormControl variant="standard" fullWidth>
          <InputLabel sx={{ color: "white" }}>Reflector</InputLabel>
          <Select
            value={reflector.id}
            onChange={(e) => handleReflectorChange(e.target.value)}
            sx={{ color: "white" }}
          >
            {availableReflectors.map((r) => (
              <MenuItem key={r} value={r.id}>
                {r.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {rotors.map((rotor, index) => (
        <Grid item xs={3} key={index}>
          <FormControl variant="standard" fullWidth>
            <InputLabel sx={{ color: "white" }}>{`${
              index + 1
            }º Rotor`}</InputLabel>
            <Select
              value={rotor.id}
              onChange={(e) => handleRotorChange(e.target.value, index)}
              sx={{ color: "white" }}
            >
              {[rotor.id, ...availableRotors.map((r) => r.id)].map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ))}
      <Grid item xs={3}>
        <Typography variant="body2" mt={1} align="left" sx={{ color: "white" }}>
        Ajuste de Anillo:
        </Typography>
      </Grid>
      {rotors.map((rotor, index) => (
        <Grid item xs={3} key={index}>
          <FormControl variant="standard" fullWidth>
            <Select
              value={rotor.offset}
              onChange={(e) => handleRingSettingChange(e.target.value, index)}
              sx={{ color: "white" }}
              MenuProps={{
                sx: { maxHeight: 400 },
              }}
            >
              {Array.from(rotor.alphabet).map((ch, idx) => (
                <MenuItem key={idx} value={idx}>
                  {idx + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};

export default EnigmaSettings;
