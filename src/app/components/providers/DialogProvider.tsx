import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface DialogContextProps {
  popup: ({
    content,
  }: {
    content: any;
    onYes?: () => Promise<void>;
    onNo?: () => Promise<void>;
  }) => void;
}

const DialogContext = createContext<DialogContextProps>({
  popup: ({ content }) => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>();
  const [doOnyes, setOnYes] = useState<() => Promise<void>>();
  const [doOnNo, setOnNo] = useState<() => Promise<void>>();

  const handleOpen = () => {
    setOpen(!open);
  };

  const popup = ({
    content,
    onNo,
    onYes,
  }: {
    content: any;
    onYes?: () => Promise<void>;
    onNo?: () => Promise<void>;
  }) => {
    setContent(content);
    if (onYes) {
      setOnYes(() => onYes);
    }
    setOnNo(() => onNo);
    handleOpen();
  };

  return (
    <DialogContext.Provider value={{ popup }}>
      <Dialog
        open={open}
        onClose={handleOpen}
        maxWidth={"xs"}
        sx={{ textAlign: "center" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions className="justify-content-center mb-2">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "174px", height: "48px", background: "#109CF1" }}
            onClick={async () => {
              if (doOnNo) await doOnNo();
              handleOpen();
            }}
          >
            {"No"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              width: "174px",
              height: "48px",
              color: "#FF3C5F",
            }}
            onClick={async () => {
              if (doOnyes) await doOnyes();
              handleOpen();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};
export const useDialog = () => useContext(DialogContext);
