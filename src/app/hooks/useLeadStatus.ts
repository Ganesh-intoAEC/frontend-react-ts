import { useState, useEffect } from "react";
import { useFetch } from "use-http";

export interface leadStatusesTypes {
  leadStatusId: string;
  leadStatusValue: string;
}
export const useLeadStatus = () => {
  const { post, response, error} = useFetch("/fetch");
  const [leadStatus, setLeadStatus] = useState<Array<leadStatusesTypes>>([]);
  
  const fetchLeadStatusData = async () => {
    const requestData = {
      eventType: "GET_LEAD_STATUSES",
    };
    
    try {
      const res = await post(requestData);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
         // Filter out "Won" and "Lost" statuses
         const filteredStatuses = data?.body?.filter((val: any) => {
          return val.leadStatusValue !== "Won" && val.leadStatusValue !== "Lost";
        });
        setLeadStatus(filteredStatuses);        
      } else {
        // Handle error here
        console.error("Error fetching data:", error);
        setLeadStatus([]);
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      setLeadStatus([]);
    }
  };
  useEffect(() => {
    fetchLeadStatusData();
  }, []);

  // useEffect(() => {
  //   console.log("Custom Hook Lead Status ::::", leadStatus);
  // }, [leadStatus]); // Log when leadStatus changes
 

  return { leadStatus };
  
};
