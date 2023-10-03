// pages/api/fetch.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Define your API URL
      //   const apiUrl = `${process.env.devLeadManagerUrl}/fetch`;
      const apiUrl = `https://dev-leadmanager.aecmultiverse.com/fetch`;

      // Define your request options (headers, body, etc.)
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // If you need to send data in the request body, add it here:
        body: JSON.stringify({
          eventType: "GET_LEAD_BY_ID",
          leadId: "d19ddf1e-054d-4ceb-a983-e7dfa014cd25",
        }),
      };

      // Make the API request
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();

      // Send the response from your API route
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
