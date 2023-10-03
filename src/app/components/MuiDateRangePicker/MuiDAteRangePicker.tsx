import React from "react";
import { DateRange, DateRangePicker } from "materialui-daterange-picker";
import { Backdrop, Fade, IconButton, Modal, TextField, TextFieldProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateRangeIcon } from "@mui/x-date-pickers";
import * as fns from "date-fns";



export type MuiDateRangePickerProps = {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  fomat?: string;
  TextFieldProps?: TextFieldProps;
};

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export const MuiDateRangePicker = (props: MuiDateRangePickerProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const format = props.fomat ?? "yyyy-MM-dd";

  const toggle = () => setOpen(!open);

  const getDisplayDateRange = (dateRange: DateRange): string => {
    const startDate = dateRange?.startDate
      ? fns.format(dateRange.startDate, format)
      : undefined;

    const endDate = dateRange?.endDate
      ? fns.format(dateRange.endDate, format)
      : undefined;

    return startDate || endDate ? `${startDate} - ${endDate}` : "";
  };

  return (
    <>
      <TextField
        {...props.TextFieldProps}
        value={getDisplayDateRange(props.dateRange)}
        onClick={toggle}
        fullWidth
        InputProps={{
          ...props.TextFieldProps?.InputProps,
          readOnly: true,
          endAdornment: (
            <IconButton>
              <DateRangeIcon />
            </IconButton>
          )
        }}
      />
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div>
            <DateRangePicker
              open={true}
              toggle={toggle}
              onChange={(range) => {
                props.onDateRangeChange(range);
                toggle();
              }}
              initialDateRange={props.dateRange}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export type { TextFieldProps };    export type { DateRange };

