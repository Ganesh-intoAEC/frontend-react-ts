// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token =
    "eyJraWQiOiJKUnRCZ01KdlRUazJ1eUthQU9iR0I3RFZqYVRYUjJKNkg0T0lEaTg2XC95WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2OGU3Y2EwNS05MDc1LTQ1ZDEtOGVkMi0wYjQwZjkyYzc3NDYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOm9yZ2FuaXphdGlvbl9uYW1lIjoiQUVDIEFyY2hpdGVjdHMiLCJjdXN0b206b3JnYW5pemF0aW9uX2lkIjoiOTRhMTE1MTktMTU4Yi00NjRiLWEwOWUtZTk4M2I5OWI0ZGQzIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9nUmM2Mjc3ZTgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNjhlN2NhMDUtOTA3NS00NWQxLThlZDItMGI0MGY5MmM3NzQ2IiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwib3JpZ2luX2p0aSI6IjQwMDU4OTljLTdkYWEtNGQxNy04MWVmLTJmODgwZjZmZDcwYiIsImF1ZCI6IjMycmowYjFiMGs1ZzJodmZjMDRwaGY4OWdiIiwiZXZlbnRfaWQiOiIwOWM5YTRjYi0xMmVkLTQxY2MtYmY0My1mOTNkZTM0YjY1MDkiLCJ1cGRhdGVkX2F0IjoxNjk2MzE2NDk0LCJ0b2tlbl91c2UiOiJpZCIsImN1c3RvbTpvcmdhbml6YXRpb25fdHlwZSI6IkFSQ0hJVEVDVCxWRU5ET1IiLCJhdXRoX3RpbWUiOjE2OTYzMzE2OTEsInBob25lX251bWJlciI6Iis5MTkzMDk4MzIyMjMiLCJleHAiOjE2OTYzMzUyOTEsImlhdCI6MTY5NjMzMTY5MSwiZmFtaWx5X25hbWUiOiJBIiwianRpIjoiNmU3ZTM2ZGUtMTBhZi00ZjhhLTg2MzAtN2NjMGRlMmY1NGQyIiwiZW1haWwiOiJkYXZpZDVAZW1haWwuY29tIn0.hdK07iAQuxdp1yz8cpAEPSB0ZsXvn2Hc8qrJ1n-S_S2V4BnfNedDG6a_jkxqaPucHZ8TIps9_-Yg4fm1L4rSDBp1yLlTnoF3JVRgwZQxmMKOrZvAZuCftDUdvMOFf2dQTlIh3dD4ZGpsUn-K09aC6-XhjmlP8QtZYUxyYHZTDPUKW7HqJKylYnqH5tvXuy7fUnv5rKagL8cZcWQvMYyvd-JU7Qc52TUQIQWd6EKwvI94ZizT05-A2pQAR4DqDHfIpgQOlykFmYgXO0rEUT6ls2luvsDd7ReyOrl1-FsCEiK_fnmLnN8BExD68g4__uLsJNpey3RGjpO2pt1bmmv6yw";
  const result = await fetch(
    "https://dev-leadmanager.aecmultiverse.com/fetch" || "",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Specify the content type if you're sending data in the request body
      },
      body: JSON.stringify({
        eventType: "GET_LEADS",
        leadOwnerId: "07edeeb1-c4da-41fd-a8ec-8014320b1ef6",
        filters: {
          organizationId: "d7d019ae-d059-46f6-b88e-d1e719bc1fe6", // Include all query parameters
        },
        pageNumber: 1,
        pageCount: 10,
      }),
    }
  ).then((res) => res.json());
  console.log(result);

  res.status(200).json(result);
}
