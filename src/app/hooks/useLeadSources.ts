import React from "react";
import { useState, useEffect } from "react";
import { useFetch } from "use-http";

 interface leadSourcesTypes {
    leadSourceId: string;
    leadSourceSubCategory: string;
  }
  
export const useLeadSources = () => {
  const { post, response, error} = useFetch("/fetch");
  const [leadSources, setLeadSources] = React.useState<Array<leadSourcesTypes>>(
    []
  );
  const fetchLeadSourceData = async () => {
    const requestData = {
        eventType: "GET_LEAD_SOURCES",
      };
    try {
      const res = await post(requestData);
      if (response.ok) {
        const res = await response.json();
        setLeadSources(res?.body || []);      
      } else {
        // Handle error here
        console.error("Error fetching data:", error);
        setLeadSources([]);
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      setLeadSources([]);
    }
  };
  useEffect(() => {
    fetchLeadSourceData();
  }, []);


  return { leadSources };
  
};
