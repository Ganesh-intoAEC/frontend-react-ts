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
const token = "eyJraWQiOiJKUnRCZ01KdlRUazJ1eUthQU9iR0I3RFZqYVRYUjJKNkg0T0lEaTg2XC95WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2OGU3Y2EwNS05MDc1LTQ1ZDEtOGVkMi0wYjQwZjkyYzc3NDYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOm9yZ2FuaXphdGlvbl9uYW1lIjoiQUVDIEFyY2hpdGVjdHMiLCJjdXN0b206b3JnYW5pemF0aW9uX2lkIjoiOTRhMTE1MTktMTU4Yi00NjRiLWEwOWUtZTk4M2I5OWI0ZGQzIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9nUmM2Mjc3ZTgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNjhlN2NhMDUtOTA3NS00NWQxLThlZDItMGI0MGY5MmM3NzQ2IiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwib3JpZ2luX2p0aSI6IjFkYjI0ZDFhLTg3MGMtNDdkZi04N2Y1LWU0NTE5MjljZjY0OSIsImF1ZCI6IjMycmowYjFiMGs1ZzJodmZjMDRwaGY4OWdiIiwiZXZlbnRfaWQiOiIxMTkxYzZkYS1hYzExLTRhY2YtYWZhOS05ZDliMzMxMGQyYjkiLCJ1cGRhdGVkX2F0IjoxNjk2MzE2NDk0LCJ0b2tlbl91c2UiOiJpZCIsImN1c3RvbTpvcmdhbml6YXRpb25fdHlwZSI6IkFSQ0hJVEVDVCxWRU5ET1IiLCJhdXRoX3RpbWUiOjE2OTYzMzQ3MTMsInBob25lX251bWJlciI6Iis5MTkzMDk4MzIyMjMiLCJleHAiOjE2OTYzMzgzMTMsImlhdCI6MTY5NjMzNDcxMywiZmFtaWx5X25hbWUiOiJBIiwianRpIjoiMDI3MjEyYmItMjM5Ni00OGI0LWFmMmYtNDIxYmIyNzYwYTc4IiwiZW1haWwiOiJkYXZpZDVAZW1haWwuY29tIn0.T1hXsO-GUt48-HKZ-QoqXzsccmt8B81lBzJCfkT3ed9x3_PcfYatgOxk7KnfsrbLMrhJbP19FxLvr_o_YhC5YhRgu4tlxQAXTaglAJdoJuGigrDEX0ydsA40IP0t52DQeW_--fUlGK1e8w2NW19N16_U0ZQeFTxpNVtqnwS-thu1Fiv4FRjwS9bYrXjjtTwL9R1yuNaf3apYBbaCrwwFyZqncQ8TaPyTd1g13HBxygY22SxiSH_59phrUQWThl1tOitfisZ7iIe2ZKgD_8EDuSbhJBYTUT4m7Cf6EBh6Y1aX7O58sBUZZtY4SQaRiq6CSBp0gVInp15gARHWvDAwCg"

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
    queryParameters: Record<string, string | string[]>
  ) => {
    const requestData = {
      eventType: "GET_LEADS",
      leadOwnerId: "07edeeb1-c4da-41fd-a8ec-8014320b1ef6",
      filters: {
        organizationId: "d7d019ae-d059-46f6-b88e-d1e719bc1fe6",
        ...queryParameters, // Include all query parameters
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

  return (
    <div>
      {loading ? (
        <SkeletonMasterGrid />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <MasterGridNavigation leadsData={leadsData} />
      )}
    </div>
  );
}

export default Home;
