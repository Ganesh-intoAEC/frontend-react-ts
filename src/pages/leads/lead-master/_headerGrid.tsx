import { Box, Typography } from "@mui/material";
import IconPositionTabs from "../../../app/components/tabNavigation/tabNavigation";
import FilterFields from "./_filterFields";
import CustomDropdownBtn from "../../../app/components/customDropdownBtn/customDropdownBtn";

const HeaderGrid: React.FC = () => {
  return (
    <div className="container mx-2 mt-5 pt-5">
      <div className="row justify-content-between mb-1">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Typography variant="h4" className="fw-500 " gutterBottom>
            All Leads
          </Typography>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 text-right">
          <CustomDropdownBtn />
        </div>
      </div>
      <div>
        <div>
          <Box >
          <IconPositionTabs />
          </Box>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <FilterFields />
        </div>
      </div>
    </div>
  );
};
export default HeaderGrid;
