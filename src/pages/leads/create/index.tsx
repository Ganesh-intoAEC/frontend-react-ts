import React from "react";
import CreateLeadForm from "../../../app/pages/lead/create/createLeadMultistepForm";


export interface LeadCreateTypes {
  leadId: string;
  leadOwner: string;
  leadName: string;
  leadEmail:string;
  leadMobile:string;
  leadAddress:string;
  leadCity:string;
  leadState:string;
  leadCountry:string;
  leadZipcode:string;
  leadSource: string;
  leadProjectType: string;
  estimatedRevenueFromLead: number;
  estimatedProfitFromLead: number;
  createdBy: string;
}
export default function Home() {
  return (

  
        <CreateLeadForm />

   
  );
}
