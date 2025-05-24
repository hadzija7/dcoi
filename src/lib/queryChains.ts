import { fetcher } from "./fetcher";

export const queryChains = () => {
  const query = `query Chains {
    chains {
      id
    }
`;

  const variables = {};

  fetcher({
    query,
    variables,
  }).then((data) => {
    console.log("Chains after fetch: ", data);
    const { delegates } = data ?? [];
    return delegates;
  });
};
