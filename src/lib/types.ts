interface Delegate {
  id: string;
  account: {
    address: string;
    bio: string;
    name: string;
    picture: string;
    twitter: string;
  };
  isPrioritized: boolean;
  votesCount: number;
  delegatorsCount: number;
  statement: {
    statementSummary: string;
  };
  token: {
    symbol: string;
    decimals: number;
  };
}

interface DelegateMapping {
  byDelegate: {
    [delegateAddress: string]: {
      delegate: Delegate;
      daos: string[]; // List of DAO IDs this delegate is part of
    };
  };
  byDao: {
    [daoId: string]: {
      delegates: string[]; // List of delegate addresses in this DAO
    };
  };
}
