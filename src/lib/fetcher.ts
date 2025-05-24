import dotenv from "dotenv";
dotenv.config();

const tally_url: any = process.env.NEXT_PUBLIC_TALLY_URL;
const tally_api_key: any = process.env.NEXT_PUBLIC_TALLY_API_KEY;

export const fetcher = ({ query, variables }: any) => {
  console.log("Tally url: ", tally_url);
  console.log("Tally api key: ", tally_api_key);
  return fetch(tally_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": tally_api_key,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((response) => {
      console.log("Response: ", response);
      return response.json();
    })
    .then((json) => {
      if (json?.errors) {
        console.error("error when fetching");

        return null;
      }

      console.log("json: ", json);

      console.log("Retrieved data: ", json.data);

      return json.data;
    })
    .catch((error) => {
      console.log("Error when fetching =>", error);

      return null;
    });
};
