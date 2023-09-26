import CustomDatagrid from "../../../../../components/customTableGrid/customTableGrid";
import HeaderGrid from "./_headerGrid";


const LeadGrid: React.FC = () => {
  return (
    <div className="mt-5 pt-1" >
      <HeaderGrid/>
     

      <div className="mt-5 mx-2">
        <div>
            <CustomDatagrid/>
        </div>
      </div>
    </div>
  );
};
export default LeadGrid;
