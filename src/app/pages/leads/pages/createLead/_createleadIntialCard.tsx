import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../../assets/icons/info-icon";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

interface UploadCardProps {
  buttonLabel: string;
  appendIcon: React.ReactNode;
  appendedBtnIcon: React.ReactNode;
  toolipHide: boolean;
}

const CreateLeadCard: React.FC<UploadCardProps> = ({
  buttonLabel,
  appendIcon,
  appendedBtnIcon,
  toolipHide,
}) => {
  const { push } = useRouter();
  const handleButtonClick = () => {
    push("/create-lead-form");
  };
  return (
    <Box
      sx={{
        maxWidth: 300,
        height: 290,
        borderRadius: "10px",
        boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 16%)",
      }}
      className="pt-5 mx-auto bg-white"
    >
      <Card sx={{ boxShadow: "none" }}>
        <CardContent>
          <Box>{appendIcon}</Box>
          <CardActions className="justify-content-center">
            <Button
              onClick={handleButtonClick}
              variant="contained"
              sx={{
                width: "160px",
                height: "42px",
                background: "var(--Hover, #34AFF9)",
                borderRadius: "4px",
                boxShadow: "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
              }}
              startIcon={appendedBtnIcon}
            >
              {buttonLabel}
            </Button>
          </CardActions>
          <Box
            className="mt-2"
            sx={{ display: toolipHide ? "flex" : "none", padding: "0" }}
          >
            <Typography
              color="text.secondary"
              variant="inherit"
              sx={{ fontSize: "11px" }}
            >
              Upload a CSV file according to this
              <Box
                component={"a"}
                href="#"
                sx={{
                  ":hover": { textDecoration: "underline" },
                  textDecoration: "none",
                }}
              >
                {" Template"}
              </Box>
              <Typography color="text.secondary" variant="caption"></Typography>
            </Typography>
            <Tooltip
              title="Download our default lead template and update your lead info then upload them on IntoAEC."
              arrow
            >
              <IconButton sx={{ padding: "0" }}>
                <InfoIcon
                  style={{
                    width: "13px",
                    height: "13px",
                    padding: "0",
                    marginLeft: "3",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateLeadCard;
