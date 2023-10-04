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
import React, { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { useRouter } from "next/router";

import MasterGridNavigation from "../../../app/pages/lead/master/masterGridNavigation";
import SkeletonMasterGrid from "@/app/pages/lead/master/skeleton";

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
const token = "eyJraWQiOiJKUnRCZ01KdlRUazJ1eUthQU9iR0I3RFZqYVRYUjJKNkg0T0lEaTg2XC95WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2OGU3Y2EwNS05MDc1LTQ1ZDEtOGVkMi0wYjQwZjkyYzc3NDYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOm9yZ2FuaXphdGlvbl9uYW1lIjoiQUVDIEFyY2hpdGVjdHMiLCJjdXN0b206b3JnYW5pemF0aW9uX2lkIjoiOTRhMTE1MTktMTU4Yi00NjRiLWEwOWUtZTk4M2I5OWI0ZGQzIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9nUmM2Mjc3ZTgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNjhlN2NhMDUtOTA3NS00NWQxLThlZDItMGI0MGY5MmM3NzQ2IiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwib3JpZ2luX2p0aSI6ImMxODkyNDUwLWMyYjItNGY4Zi1hZWNjLTkzMmMyZTMyZTllOCIsImF1ZCI6IjMycmowYjFiMGs1ZzJodmZjMDRwaGY4OWdiIiwiZXZlbnRfaWQiOiJkYTc0MTAzMi1mNDVkLTQ5N2EtOGUyZS1iNDE1YzRhMzQzNjYiLCJ1cGRhdGVkX2F0IjoxNjk2MzE2NDk0LCJ0b2tlbl91c2UiOiJpZCIsImN1c3RvbTpvcmdhbml6YXRpb25fdHlwZSI6IkFSQ0hJVEVDVCxWRU5ET1IiLCJhdXRoX3RpbWUiOjE2OTY0MTkyOTIsInBob25lX251bWJlciI6Iis5MTkzMDk4MzIyMjMiLCJleHAiOjE2OTY0MjI4OTEsImlhdCI6MTY5NjQxOTI5MiwiZmFtaWx5X25hbWUiOiJBIiwianRpIjoiOGM5MjgxYTgtZGIxMy00ZDc5LTgzNjItZmI3OWEyOTg1MGE0IiwiZW1haWwiOiJkYXZpZDVAZW1haWwuY29tIn0.ImQevRjG2CFXv28TQkYUF78vCN2JEGkbp08We-WPjnLfPvCj1FNmmgAw0zuljdvm72F1EblqXSICrIHC4lc35OD14yNQuFKIX9ra16N6BGNcgHF_pJ6XDaaBlV0A-cfYl412wdO-n1jZHdUmQ9o9MvxkLgCeYeGs6QcxstShgfrZzJvIA9LIpUgm2agAtKxjzoCk_w--JlR_qWKhZcqls4IgP1YJSU9E4tVbhbfveTiy5e3TNCdBIpH9-8UTlgcDYxMQhWQNoazQdmaC_1VGNz2asru5L3rZQAcYZFRYaGG1l7oz0_wRe9aVN7wOU920UEXIHgnjwA3kYC9DxUGojw"

function Home() {
  const [leadsData, setLeadsData] = useState<Array<LeadsTypes>>([]);
  const { post, response, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_FETCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const router = useRouter();

  const fetchData = async (
    queryParameters: Record<string, string | string[]>,
   ) => {
    
    const requestData = {
      eventType: "GET_LEADS",
      leadOwnerId: "07edeeb1-c4da-41fd-a8ec-8014320b1ef6",
      filters: {
        organizationId: "d7d019ae-d059-46f6-b88e-d1e719bc1fe6",
        ...queryParameters,  

      },
      pageNumber: 1,
      pageCount: 10,
    };

    await post(requestData);

    if (response.ok) {
      const res = await response.json()
      setLeadsData(res?.body?.result || []);
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData(router.query as Record<string, string | string[]>);
    })();
  }, [router.query]); // Run this effect only once when the component mounts

  const onLeadGridSearch = (leadName: string) => {    
    if (leadName.length >= 3) {
      const queryParameters: Record<string, string | string[]> = {
        leadName: leadName, // Add leadName to queryParameters
      };
      fetchData(queryParameters);
    }
  };

  return (
    <div>
      {loading ? (
        <SkeletonMasterGrid />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <MasterGridNavigation leadNameSearch={onLeadGridSearch} leadsData={leadsData} />
      )}
    </div>
  );
}

export default Home;
