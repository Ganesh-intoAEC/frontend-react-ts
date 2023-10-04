// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import MasterGridNavigation from "../../../app/pages/lead/master/masterGridNavigation";
// export interface LeadsTypes {
//   leadId: string;
//   leadOwner: string;
//   leadName: string;
//   leadSource: string;
//   leadProjectType: string;
//   estimatedRevenueFromLead: string;
//   estimatedProfitFromLead: string;
//   leadStatus: string;
//   createdAt: string;
// }

// export const getServerSideProps = (async (context) => {
//   const { isSnoozed } = context.query;
//   console.log(isSnoozed);

//   const leadsData = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}fetch`, {
//     method: "POST",
//     body: JSON.stringify({
//       eventType: "GET_LEADS",
//       leadOwnerId: "07edeeb1-c4da-41fd-a8ec-8014320b1ef6",
//       filters: {
//         organizationId: "d7d019ae-d059-46f6-b88e-d1e719bc1fe6",
//         // ...context.query,
//         isSnoozed: isSnoozed ? true : isSnoozed,
//       },
//       pageNumber: 1,
//       pageCount: 10,
//     }),
//   }).then((res) => res.json());

//   return { props: { leadsData: leadsData?.body?.result || null } };
// }) satisfies GetServerSideProps<{
//   leadsData: Array<LeadsTypes>;
// }>;

// function Home({
//   leadsData,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {

//   return(
//      <MasterGridNavigation leadsData={leadsData|| undefined} />
//      );
// }

// export default Home;
import { useRouter } from "next/router";

import MasterGridNavigation from "../../../app/pages/lead/master/masterGridNavigation";

export interface LeadsTypes {
  leadId: string;
  leadOwner: string;
  leadName: string;
  leadSource: string;
  leadProjectType: string;
  estimatedRevenueFromLead: string;
  estimatedProfitFromLead: string;
  leadStatus: string;
  createdAt: string;
}
function Home() {

 
  const router = useRouter();
// Run this effect only once when the component mounts



  return (
    <div>
      {/* {loading ? (
        <SkeletonMasterGrid />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <MasterGridNavigation leadNameSearch={onLeadGridSearch} leadsData={leadsData} />
      )} */}
      <MasterGridNavigation/>
    </div>
  );
}

export default Home;
