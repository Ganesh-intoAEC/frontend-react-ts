import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

import {
  DateCalendar,
  DateRangeIcon,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import isBetweenPlugin from "dayjs/plugin/isBetween";
import { MouseEvent, useState } from "react";

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  inRange: boolean;
  start: boolean;
  end: boolean;
}

interface DayProps {
  startDay?: Dayjs | null;
  endDay?: Dayjs | null;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "inRange" && prop !== "isHovered",
})<CustomPickerDayProps>(
  ({ theme, inRange: isSelected, selected, day, start, end }) => ({
    borderRadius: 0,
    ...(selected && {
      borderRadius: "50%",
    }),
    ...(isSelected && {
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
      color: theme.palette.common.black,
      "&:hover, &:focus": {
        backgroundColor: alpha(theme.palette.primary.light, 0.1),
      },
    }),
    ...((day.day() === 0 || start) && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...((day.day() === 6 || end) && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
) as React.ComponentType<CustomPickerDayProps>;

const isinRange = (
  day: Dayjs,
  startDay?: Dayjs | null,
  endDay?: Dayjs | null
) => {
  if (!startDay || !endDay) {
    return false;
  } else {
    return day?.isBetween(startDay, endDay);
  }
};
// const isHovered = (
//   day: Dayjs,
//   startDay?: Dayjs | null,
//   hoveredDay?: Dayjs | null
// ) => {
//   if (!startDay || !hoveredDay) {
//     return false;
//   } else {
//     return (
//       day.isSame(hoveredDay) ||
//       (day?.isAfter(startDay) && day?.isBefore(hoveredDay))
//     );
//   }
// };

function Day(props: PickersDayProps<Dayjs> & DayProps) {
  const { day, startDay, endDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      disableMargin
      sx={{
        border: "none",
        outline: "none",
      }}
      selected={day.isSame(startDay) || day.isSame(endDay)}
      inRange={isinRange(day, startDay, endDay)}
      start={day.subtract(1, "day").isSame(startDay)}
      end={day.add(1, "day").isSame(endDay)}
    />
  );
}

interface CustomDateRangePickerTypes {
  label: string,
  onApply: (startDate?: Dayjs, endDate?: Dayjs) => void;
}

const CustomDateRangePicker = ({label, onApply }: CustomDateRangePickerTypes) => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);
  const [startDate, setStartDate] = useState<Dayjs>();
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs>();

  const handleOpenPopover = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-range-popover" : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-1 mb-2">
        <TextField
          label={label}
          variant="standard"
          onClick={handleOpenPopover}
          aria-readonly
          fullWidth
          sx={{ cursor: "pointer" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          value={
            startDate && endDate
              ? `${startDate.format("DD-MM-YYYY")} - ${endDate.format(
                  "DD-MM-YYYY"
                )}`
              : ""
          }
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          disableScrollLock
          anchorOrigin={{
            vertical: "bottom",
            horizontal: -400,
          }}
        >
          <Box sx={{ p: 0 }}>
            <Grid container direction={"row"} p={0}>
              <DateCalendar
                autoFocus
                onChange={(e: Dayjs | null) => {
                  if (e) {
                    if (startDate) {
                      setEndDate(e);
                    } else {
                      setStartDate(e);
                    }
                  }
                }}
                sx={{
                  ".MuiDayCalendar-weekDayLabel": {
                    margin: 0,
                  },
                  ".MuiPickersDay-today": {
                    border: "none",
                  },
                  ".Mui-selected": {
                    bgcolor: "black",
                  },
                }}
                slots={{ day: Day }}
                slotProps={{
                  day: (ownerState) => ({
                    startDay: startDate,
                    onPointerEnter: () => setHoveredDay(ownerState.day),
                    onPointerLeave: () => setHoveredDay(null),
                    endDay: endDate,
                  }),
                  calendarHeader: () => ({
                    sx: { marginX: 2 },
                  }),
                }}
              />
              <Divider orientation="vertical" flexItem />
              <DateCalendar
                autoFocus
                sx={{
                  ".MuiDayCalendar-weekDayLabel": {
                    margin: 0,
                  },
                  ".Mui-selected": {
                    bgcolor: "black",
                  },
                }}
                defaultCalendarMonth={dayjs().add(1, "month")}
                shouldDisableMonth={(month) =>
                  month.isSame(startDate, "month") ||
                  month.isBefore(startDate, "month")
                }
                onChange={(e: Dayjs | null) => {
                  if (e) {
                    setEndDate(e);
                  }
                }}
                slots={{ day: Day }}
                slotProps={{
                  day: (ownerState) => ({
                    startDay: startDate,
                    hoveredDay,
                    onPointerEnter: () => setHoveredDay(ownerState.day),
                    onPointerLeave: () => setHoveredDay(null),
                    endDay: endDate,
                  }),
                  calendarHeader: () => ({
                    sx: { marginX: 2 },
                  }),
                }}
              />
            </Grid>
            <Divider orientation="horizontal" flexItem />
            <Grid
              container
              justifyContent={"space-around"}
              marginLeft={"auto"}
              direction={"row"}
            >
              <Box   sx={{'& .MuiButtonBase-root':{
                    textTransform:'Capitalize',
                    padding:'0 6px',
                    margin: '6px',
                    background:'#f0f0f0',
                    color: '#000000',
                    ':hover':{
                      background:'#3CA2FF',
                      color: '#ffffff'
                    }
                  }
                    
                  }}>
                <Button
                  onClick={() => {
                    if (startDate) {
                      setEndDate(dayjs());
                    } else {
                      setStartDate(dayjs());
                    }
                  }}
                
                >
                  Today
                </Button>
                <Button
                  onClick={() => {
                    if (startDate) {
                      setEndDate(dayjs().subtract(1,'day'));
                    } else {
                      setStartDate(dayjs().subtract(1,'day'));
                    }
                  }}
                >
                  Yesterday
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>{startDate?.format("DD-MM-YYYY")}</Typography>
                &nbsp;-&nbsp;
                <Typography>{endDate?.format("DD-MM-YYYY")}</Typography>
              </Box>
              <Box  sx={{'& .MuiButtonBase-root':{
                  textTransform:'Capitalize',
                  padding:'0 6px',
                  margin: '6px',
                  background:'#f0f0f0',
                  color: '#000000',
                  ':hover':{
                    background:'#3CA2FF',
                    color: '#ffffff',
                  },
                  ':disabled':{
                    opacity:'0.4'
                  }
                }
                  
                }}>
                <Button
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                    handleClosePopover();
                  }}
                  disabled={startDate === undefined}
                >
                  Clear
                </Button>
                <Button
               
                  onClick={() => {
                    onApply(startDate, endDate);
                    handleClosePopover();
                  }}
                  
                >
                  Apply
                </Button>
              </Box>
            </Grid>
          </Box>
        </Popover>
      </div>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
