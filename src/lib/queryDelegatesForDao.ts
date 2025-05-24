import { fetcher } from "./fetcher";
/*
query Delegates($input: DelegatesInput!) {
  delegates(input: $input) {
    nodes {
      ... on Delegate {
        id
        account {
          address
          bio
          name
          picture
          twitter
        }
        isPrioritized
        votesCount
        delegatorsCount
        statement {
          statementSummary
        }
        token {
          symbol
          decimals
        }
      }
    }
    pageInfo {
      firstCursor
      lastCursor
    }
  }
}
*/

/*
{
  "input": {
    "filters": {
      "organizationId": "2206072050315953936"
    },
    "sort": {
      "isDescending": true,
      "sortBy": "votes"
    },
    "page": {
      "limit": 10
    }
  }
}
*/

export const queryDelegatesForDao = (organizationId: string) => {
  const query = `query Delegates($input: DelegatesInput!) {
    delegates(input: $input) {
      nodes {
        ... on Delegate {
          id
          account {
            address
            bio
            name
            picture
            twitter
          }
          isPrioritized
          votesCount
          delegatorsCount
          statement {
            statementSummary
          }
          token {
            symbol
            decimals
          }
        }
      }
      pageInfo {
        firstCursor
        lastCursor
      }
    }
  }
`;

  const variables = {
    input: {
      filters: {
        organizationId: organizationId,
      },
      sort: {
        isDescending: true,
        sortBy: "votes",
      },
      page: {
        limit: 10,
      },
    },
  };

  fetcher({
    query,
    variables,
  }).then((data) => {
    console.log("Proposals after fetch: ", data);
    const { delegates } = data ?? [];
    return delegates;
  });
};
