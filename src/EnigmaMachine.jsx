import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Keyboard from "./components/Keyboard";
import Display from "./components/Display";
import { useEffect, useState } from "react";
import Plugboard from "./components/Plugboard";
import EnigmaSettings from "./components/EnigmaSettings";
import RotorComponent from "./components/RotorComponent";
import Rotor from "./model/Rotor";
import TabPanel from "./components/TabPanel";
import TextBook from "./components/Textbook";

const CustomDivider = () => {
  return (
    <Divider
      variant="middle"
      sx={{
        width: "100%",
        height: "3px",
        backgroundColor: "#333333",
        opacity: 1,
      }}
    />
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function EnigmaMachine() {
  const [pressedKey, setPressedKey] = useState();
  const [pressedKeyToggle, setPressedKeyToggle] = useState(false);
  const [currentText, setCurrentText] = useState();
  const [nonCipherText, setNonCipherText] = useState();
  const [messageKey, setMessageKey] = useState();

  const [tab, setTab] = useState(0);

  //Initial Enigma Settings
  const [availableRotors, setAvailableRotors] = useState([Rotor.IV, Rotor.V,Rotor.VI,Rotor.VII, Rotor.VIII]);
  const [rotor1, setRotor1] = useState(Rotor.I);
  const [rotor2, setRotor2] = useState(Rotor.II);
  const [rotor3, setRotor3] = useState(Rotor.III);

  const availableReflectors = [Rotor.UKW_B, Rotor.UKW_C];
  const [reflector, setReflector] = useState(availableReflectors[0]);

  const [plugboard, setPlugboard] = useState([]);

  const handleKeyPress = (key) => {
    if(!nonCipherText){
      setMessageKey(Rotor.ALPHABET[rotor1.position] + Rotor.ALPHABET[rotor2.position] + Rotor.ALPHABET[rotor3.position])
    }
    setNonCipherText(nonCipherText ? nonCipherText + key : key);
    var ch = applyPlugboard(key);
    rotor3.incPosition();
    ch = rotor3.apply(ch);
    ch = rotor2.apply(ch);
    ch = rotor1.apply(ch);
    ch = reflector.apply(ch);
    ch = rotor1.reverseApply(ch);
    ch = rotor2.reverseApply(ch);
    ch = rotor3.reverseApply(ch);
    ch = applyPlugboard(ch);
    setPressedKey(ch);
    setPressedKeyToggle(!pressedKeyToggle);
  };

  const applyPlugboard = (char) => {
    for (let i = 0; i < plugboard.length; i++) {
      const pair = plugboard[i].keys;
      if (pair.includes(char)) {
        return pair[0] === char ? pair[1] : pair[0];
      }
    }
    return char;
  };

  const handleRotorChanged = () => {
    rotor3.appendRotorToLeft(rotor2);
    rotor2.appendRotorToLeft(rotor1);
  };

  handleRotorChanged();

  useEffect(() => {
    if (pressedKey) {
      let text = currentText ? currentText + pressedKey : pressedKey;
      setCurrentText(text);
    }
  }, [pressedKeyToggle]);

  const onClear = () => {
    setCurrentText();
    setNonCipherText();
  };


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Grid container spacing={2}>
            <Grid item my={5} xs={12}>
              <Box>
                <Typography variant="h4" color={"white"} textAlign={"center"}>
                  Simulador Enigma M3
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={16} lg={7} xl={6} mb={2}>
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{
                  minWidth: 700,
                  maxHeight: 790,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width={"100%"}
                  pl={"3vw"}
                >
                  <Stack direction="row" alignSelf="start" spacing={2}>
                    <RotorComponent
                      rotor={rotor1}
                      setRotor={setRotor1}
                    ></RotorComponent>
                    <RotorComponent
                      rotor={rotor2}
                      setRotor={setRotor2}
                    ></RotorComponent>
                    <RotorComponent
                      rotor={rotor3}
                      setRotor={setRotor3}
                    ></RotorComponent>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={tab}
                          onChange={(e, value) => {
                            setTab(value);
                          }}
                        >
                          <Tab label="Configuracion Interna" value={0} />
                        </Tabs>
                      </Box>
                      <TabPanel value={tab} index={0}>
                        <Stack direction="row" alignSelf="start" spacing={2}>
                          <EnigmaSettings
                            availableReflectors={availableReflectors}
                            reflector={reflector}
                            setReflector={setReflector}
                            rotors={[rotor1, rotor2, rotor3]}
                            setRotors={[setRotor1, setRotor2, setRotor3]}
                            availableRotors={availableRotors}
                            setAvailableRotors={setAvailableRotors}
                            onRotorChanged={handleRotorChanged}
                          />
                        </Stack>
                      </TabPanel>
                    </Box>
                  </Stack>
                </Stack>
                <CustomDivider></CustomDivider>
                <Stack>
                  <Display
                    displayedLetter={pressedKey}
                    doDisplay={pressedKeyToggle}
                  ></Display>
                </Stack>
                <CustomDivider></CustomDivider>
                <Stack>
                  <Keyboard onKeyPress={handleKeyPress}></Keyboard>
                </Stack>
                <CustomDivider></CustomDivider>
                <Stack>
                  <Plugboard
                    connections={plugboard}
                    setConnections={setPlugboard}
                  ></Plugboard>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={5} mx={4} my={4}>
              <TextBook
                messageKey={messageKey}
                text={currentText}
                nonCipherText={nonCipherText}
                configuration={{
                  rotor1: rotor1.id,
                  rotor2: rotor2.id,
                  rotor3: rotor3.id,
                  reflector: reflector.id,
                  ring1: rotor1.offset,
                  ring2: rotor2.offset,
                  ring3: rotor3.offset,
                  plugboard: plugboard
                }}
                onClear={onClear}
              />
            </Grid>
          </Grid>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default EnigmaMachine;
