import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Stack,
  IconButton,
  Divider,
  Tooltip,
  Toolbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import oldPaperImage from "../assets/old_paper.jpg";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const AncientBook = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${oldPaperImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(2),
  borderRadius: "8px",
  fontFamily: "serif",
  fontSize: "18px",
  lineHeight: 1.5,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  minHeight: "400px",
  height: "100%",
}));
const TextBook = ({
  messageKey,
  text,
  nonCipherText,
  onClear,
  configuration,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [displayNonCipherText, setDisplayNonCipherText] = useState("");
  const [previousConf, setPreviousConf] = useState(configuration);
  const [previousKey, setPreviousKey] = useState(messageKey);
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
  const [copyTooltipMessage, setCopyTooltipMessage] = useState(
    "Copiar al portapapeles"
  );

  useEffect(() => {
    if (text) {
      setDisplayText(text.replace(/(.{5})/g, "$1 "));
    }
  }, [text]);

  useEffect(() => {
    if (nonCipherText) {
      setDisplayNonCipherText(nonCipherText);
    }
  }, [nonCipherText]);

  const handleCopy = () => {
    const textToCopy = enigmaSettings() + " -- " + displayText;

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    setCopyTooltipOpen(true);
    setCopyTooltipMessage("Mensaje copiado!");

    setTimeout(() => {
      setCopyTooltipOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (
      JSON.stringify(previousConf) !== JSON.stringify(configuration) ||
      JSON.stringify(messageKey) !== JSON.stringify(previousKey)
    ) {
      setDisplayText();
      setPreviousConf(configuration);
      setPreviousKey(messageKey);
      onClear();
    }
  }, [configuration, messageKey]);

  const enigmaSettings = () => {
    let plugboard = configuration.plugboard[0]
      ? configuration.plugboard.map((obj) => obj.keys.join("")).join(" ")
      : undefined;
    return (
      configuration.reflector +
      " -- " +
      configuration.rotor1 +
      " " +
      configuration.rotor2 +
      " " +
      configuration.rotor3 +
      " -- " +
      (configuration.ring1 + 1) +
      " " +
      (configuration.ring2 + 1) +
      " " +
      (configuration.ring3 + 1) +
      (plugboard ? " -- " + plugboard : "") +
      " -- " +
      messageKey
    );
  };

  return (
    <AncientBook width={"100%"}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" px={2} pt={1} gutterBottom color={"black"}>
          Mensaje
        </Typography>
        <Toolbar>
          <Tooltip title="Borrar">
            <IconButton
              aria-label="Clear"
              sx={{ pb: 2 }}
              onClick={() => {
                setDisplayText();
                setDisplayNonCipherText();
                onClear();
              }}
            >
              <BackspaceOutlinedIcon sx={{ color: "black" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={copyTooltipMessage}
            open={copyTooltipOpen}
            disableFocusListener
            disableTouchListener
          >
            <IconButton
              aria-label="Copy to clipboard"
              sx={{ pb: 2 }}
              onClick={handleCopy}
              onMouseOver={() => {
                setCopyTooltipOpen(true);
                setCopyTooltipMessage("Copiar al portapapeles");
              }}
              onMouseLeave={() => setCopyTooltipOpen(false)}
            >
              <ContentCopyIcon sx={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Stack>
      <Divider
        variant="fullWidth"
        sx={{
          backgroundColor: "black",
        }}
      />

      {displayText && (
        <>
          <Typography variant="body1" my={2} color={"black"}>
            {enigmaSettings()}
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              backgroundColor: "black",
            }}
          />
          <Typography variant="body1" mt={2} color={"black"} minHeight={100}>
            {displayNonCipherText}
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              backgroundColor: "black",
            }}
          />
        </>
      )}
      <Typography variant="body1" mt={2} color={"black"}>
        {displayText}
      </Typography>
    </AncientBook>
  );
};

export default TextBook;
