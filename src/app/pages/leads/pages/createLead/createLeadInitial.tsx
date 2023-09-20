import { Typography } from "@mui/material";
import UserAdd from "../../../../../assets/icons/user-add";
import UserUpload from "../../../../../assets/icons/user-upload";
import CreateLeadCard from "./_createleadIntialCard";
import AddIcon from "../../../../../assets/icons/add-icon";
import UploadIcon from "../../../../../assets/icons/upload-icon";
import BgImage from '../../../../../assets/images/create-lead-Background.svg'

const CreateLeads: React.FC = () => {
  
  return (
    <div className="mt-5 pt-5" style={{backgroundImage:`url(${BgImage})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', height:'100%'}}>
      <div className="mt-5 pt-5 text-center mb-4">
        <Typography variant="h5" className="fw-500 underline-on-hover mt-5 pt-5" gutterBottom>
          Create Lead
        </Typography>
      </div>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-12 col-sm-12 pr-2 mb-3">
            <CreateLeadCard
              buttonLabel="Add New"
              appendedBtnIcon={<AddIcon  style={{ width: "16px", height: "16px", fill:'#ffffff' }}/>}
              appendIcon={
                <UserUpload style={{ width: "100px", height: "100px", fill:'#3CA2FF' }} />
              }
              toolipHide={false}
            />
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 pr-2 mb-3 justify-content-center">
            <CreateLeadCard
              buttonLabel="Upload"
              appendIcon={
                <UserAdd style={{ width: "100px", height: "100px", fill:'#3CA2FF' }} />
              }
              appendedBtnIcon={<UploadIcon  style={{ width: "16px", height: "16px", fill:'#ffffff' }}/>}
              toolipHide={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateLeads;
