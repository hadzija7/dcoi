"use client";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";

/**
ProposalsInput {
  "filters": ProposalsFiltersInput,
  "page": PageInput,
  "sort": ProposalsSortInput
}
ProposalsFiltersInput {
  "governorId": "eip155:1:0x7e90e03654732abedf89Faf87f05BcD03ACEeFdc",
  "includeArchived": true,
  "isDraft": true,
  "organizationId": 2207450143689540900,
  "proposer": "0x1234567800000000000000000000000000000abc"
}
*/

const queryInput = {
  page: { limit: 987 },
  sort: { isDescending: false, sortBy: "id" },
};

/*
{
  "id": 2207450143689540900,
  "onchainId": "xyz789",
  "governorId": "eip155:1:0x7e90e03654732abedf89Faf87f05BcD03ACEeFdc",
  "includeArchived": true,
  "isLatest": true
}
*/
const proposalInput = {
  id: "13108804573775967668959825241666341617107666532012387058509418598838035461528",
};
export default function Proposals() {
  const [proposals, setProposals] = useState<any>(undefined);
  const ProposalsDocument = `query MyQuery {
    proposal(input: ${proposalInput}){
      id,
      block,
      chainId
    }
  }`;

  const chainId = "eip155:1";

  useEffect(() => {
    fetcher({
      query: ProposalsDocument,
      variables: {
        input: queryInput,
        // chainId,
        // pagination: { limit: 8, offset: 0 },
        // sort: { field: "START_BLOCK", order: "DESC" },
      },
    }).then((data) => {
      console.log("Proposals after fetch: ", data);
      const { proposals } = data ?? [];
      setProposals(proposals);
    });
  }, []);

  if (!proposals)
    return (
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  return (
    <div className="governorList">
      <h2>Mainnet ETH Proposals</h2>
      {proposals.length && (
        <ProposalTable proposals={proposals}></ProposalTable>
      )}
    </div>
  );
}

const ProposalTable = ({ proposals }: any) => {
  return (
    <table className="styledTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Governor</th>
          <th>Votes For (%)</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal: any, index: any) => {
          const forPercent = proposal.voteStats[0].percent.toFixed();

          return (
            <tr key={`proposal-row-${index}`}>
              <td>{proposal.title}</td>
              <td>{proposal.governor.name}</td>
              <td>{forPercent}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
