"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  AlertTriangle,
  Eye,
  Users,
  DollarSign,
  Network,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { queryDelegatesForDao } from "@/lib/queryDelegatesForDao";
import { queryChains } from "@/lib/queryChains";

const DAODelegateAnalyzer = () => {
  const [selectedDelegate, setSelectedDelegate] = useState("all");
  const [selectedDAO, setSelectedDAO] = useState("all");
  const [sortBy, setSortBy] = useState("riskScore");
  const [expandedRows, setExpandedRows] = useState(new Set());

  const daoIds: string[] = ["2206072050315953936"];

  const queryDelegatees = async (): Promise<DelegateMapping> => {
    const mapping: DelegateMapping = {
      byDelegate: {},
      byDao: {},
    };

    for (const daoId of daoIds) {
      try {
        const daoResults: any = await queryDelegatesForDao(daoId);
        const delegates = daoResults?.nodes || [];

        // Initialize the DAO's entry in byDao mapping
        mapping.byDao[daoId] = {
          delegates: [],
        };

        // Process each delegate
        for (const delegate of delegates) {
          const delegateAddress = delegate.account.address;

          // Update byDelegate mapping
          if (!mapping.byDelegate[delegateAddress]) {
            mapping.byDelegate[delegateAddress] = {
              delegate: delegate,
              daos: [],
            };
          }
          mapping.byDelegate[delegateAddress].daos.push(daoId);

          // Update byDao mapping
          mapping.byDao[daoId].delegates.push(delegateAddress);
        }
      } catch (error) {
        console.error(`Error querying delegates for DAO ${daoId}:`, error);
      }
    }
    console.log("Delegates mapping: ", mapping);
    return mapping;
  };

  const queryChainsHandler = async () => {
    await queryChains();
  };

  useEffect(() => {
    // queryChainsHandler();
    queryDelegatees();
  }, []);

  // Mock data structure with realistic conflict scenarios
  const daos = [
    {
      id: "arbitrum",
      name: "Arbitrum",
      category: "L2",
      competing: ["optimism", "zksync"],
    },
    {
      id: "zksync",
      name: "zkSync",
      category: "L2",
      competing: ["arbitrum", "optimism"],
    },
    {
      id: "optimism",
      name: "Optimism",
      category: "L2",
      competing: ["arbitrum", "zksync"],
    },
    {
      id: "compound",
      name: "Compound",
      category: "Lending",
      competing: ["aave"],
    },
    { id: "aave", name: "Aave", category: "Lending", competing: ["compound"] },
    { id: "uniswap", name: "Uniswap", category: "DEX", competing: [] },
    { id: "gmx", name: "GMX", category: "Derivatives", competing: [] },
  ];

  const delegates = [
    {
      id: "entropy",
      name: "Entropy Advisers",
      type: "Advisory Firm",
      daos: ["arbitrum", "optimism", "compound", "aave"],
      conflicts: {
        financial: [
          {
            type: "Token Holdings",
            description: "Holds significant ARB while delegating for OP",
            severity: "high",
          },
          {
            type: "Consulting Revenue",
            description: "Receives fees from Compound ecosystem projects",
            severity: "medium",
          },
        ],
        governance: [
          {
            type: "Competing Protocols",
            description: "Delegates for both Arbitrum and Optimism",
            severity: "high",
          },
          {
            type: "Lending Competition",
            description: "Active delegate in both Compound and Aave",
            severity: "high",
          },
        ],
        disclosure: [
          {
            type: "Incomplete Disclosure",
            description: "Token holdings not fully disclosed",
            severity: "medium",
          },
        ],
      },
      metrics: {
        riskScore: 8.2,
        transparencyScore: 6.5,
        votingConsistency: 7.1,
        crossDaoActivity: 4,
      },
    },
    {
      id: "l2beat",
      name: "L2Beat",
      type: "Research Org",
      daos: ["arbitrum", "optimism", "zksync"],
      conflicts: {
        financial: [
          {
            type: "Grant Funding",
            description: "Receives research grants from multiple L2s",
            severity: "medium",
          },
        ],
        governance: [
          {
            type: "Research Bias",
            description: "May favor protocols funding their research",
            severity: "medium",
          },
          {
            type: "Competing L2s",
            description: "Delegates across competing Layer 2 solutions",
            severity: "high",
          },
        ],
        disclosure: [
          {
            type: "Good Disclosure",
            description: "Transparently reports funding sources",
            severity: "low",
          },
        ],
      },
      metrics: {
        riskScore: 6.8,
        transparencyScore: 8.9,
        votingConsistency: 8.2,
        crossDaoActivity: 3,
      },
    },
    {
      id: "stablelab",
      name: "StableLab",
      type: "Governance Service",
      daos: ["arbitrum", "compound", "aave", "uniswap"],
      conflicts: {
        financial: [
          {
            type: "Service Fees",
            description: "Paid by multiple protocols for governance services",
            severity: "high",
          },
        ],
        governance: [
          {
            type: "Client Conflicts",
            description: "May prioritize paying clients in votes",
            severity: "high",
          },
          {
            type: "Lending Protocols",
            description: "Represents competing lending protocols",
            severity: "medium",
          },
        ],
        disclosure: [
          {
            type: "Client List",
            description: "Does not fully disclose all paying clients",
            severity: "high",
          },
        ],
      },
      metrics: {
        riskScore: 7.9,
        transparencyScore: 5.8,
        votingConsistency: 6.9,
        crossDaoActivity: 4,
      },
    },
    {
      id: "gauntlet",
      name: "Gauntlet",
      type: "Risk Management",
      daos: ["compound", "aave", "uniswap"],
      conflicts: {
        financial: [
          {
            type: "Risk Consulting",
            description: "Provides paid risk services to protocols they govern",
            severity: "high",
          },
        ],
        governance: [
          {
            type: "Service Provider Voting",
            description: "Votes on proposals affecting their own contracts",
            severity: "high",
          },
        ],
        disclosure: [
          {
            type: "Contract Disclosure",
            description: "Clearly discloses service relationships",
            severity: "low",
          },
        ],
      },
      metrics: {
        riskScore: 7.5,
        transparencyScore: 8.1,
        votingConsistency: 7.8,
        crossDaoActivity: 3,
      },
    },
    {
      id: "wintermute",
      name: "Wintermute",
      type: "Market Maker",
      daos: ["arbitrum", "optimism", "uniswap", "gmx"],
      conflicts: {
        financial: [
          {
            type: "Trading Revenue",
            description: "Profits from tokens they help govern",
            severity: "high",
          },
          {
            type: "Market Making",
            description: "Provides liquidity for governed tokens",
            severity: "medium",
          },
        ],
        governance: [
          {
            type: "Self-Interest Voting",
            description: "May vote to benefit trading operations",
            severity: "high",
          },
        ],
        disclosure: [
          {
            type: "Limited Disclosure",
            description: "Trading positions not fully transparent",
            severity: "high",
          },
        ],
      },
      metrics: {
        riskScore: 8.7,
        transparencyScore: 4.9,
        votingConsistency: 6.2,
        crossDaoActivity: 4,
      },
    },
    {
      id: "blockworks",
      name: "Blockworks",
      type: "Media/Research",
      daos: ["arbitrum", "compound", "uniswap"],
      conflicts: {
        financial: [
          {
            type: "Advertising Revenue",
            description: "Receives advertising from protocols they govern",
            severity: "medium",
          },
        ],
        governance: [
          {
            type: "Editorial Bias",
            description: "May favor advertising partners in governance",
            severity: "medium",
          },
        ],
        disclosure: [
          {
            type: "Advertiser Disclosure",
            description: "Clearly labels sponsored content",
            severity: "low",
          },
        ],
      },
      metrics: {
        riskScore: 5.3,
        transparencyScore: 7.6,
        votingConsistency: 7.9,
        crossDaoActivity: 3,
      },
    },
    {
      id: "olimpio",
      name: "Olimpio",
      type: "Individual Delegate",
      daos: ["arbitrum", "optimism"],
      conflicts: {
        financial: [
          {
            type: "Token Holdings",
            description: "Significant holdings in both ARB and OP",
            severity: "medium",
          },
        ],
        governance: [
          {
            type: "L2 Competition",
            description: "Represents competing Layer 2 protocols",
            severity: "medium",
          },
        ],
        disclosure: [
          {
            type: "Good Transparency",
            description: "Regular public reporting on positions",
            severity: "low",
          },
        ],
      },
      metrics: {
        riskScore: 4.8,
        transparencyScore: 8.7,
        votingConsistency: 8.5,
        crossDaoActivity: 2,
      },
    },
    {
      id: "pantera",
      name: "Pantera Capital",
      type: "Investment Fund",
      daos: ["compound", "uniswap"],
      conflicts: {
        financial: [
          {
            type: "Investment Portfolio",
            description: "Large holdings in governed protocols",
            severity: "high",
          },
          {
            type: "Fund Returns",
            description:
              "Governance decisions directly impact fund performance",
            severity: "high",
          },
        ],
        governance: [
          {
            type: "Investor Voting",
            description: "Votes primarily for financial returns",
            severity: "high",
          },
        ],
        disclosure: [
          {
            type: "Portfolio Disclosure",
            description: "Publicly discloses major holdings",
            severity: "medium",
          },
        ],
      },
      metrics: {
        riskScore: 8.1,
        transparencyScore: 6.8,
        votingConsistency: 5.9,
        crossDaoActivity: 2,
      },
    },
  ];

  const getRiskColor = (score: number) => {
    if (score >= 8) return "text-red-600 bg-red-50";
    if (score >= 6) return "text-orange-600 bg-orange-50";
    if (score >= 4) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredDelegates = useMemo(() => {
    let filtered = delegates;

    if (selectedDelegate !== "all") {
      filtered = filtered.filter((d) => d.id === selectedDelegate);
    }

    if (selectedDAO !== "all") {
      filtered = filtered.filter((d) => d.daos.includes(selectedDAO));
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "riskScore":
          return b.metrics.riskScore - a.metrics.riskScore;
        case "transparency":
          return b.metrics.transparencyScore - a.metrics.transparencyScore;
        case "crossDao":
          return b.metrics.crossDaoActivity - a.metrics.crossDaoActivity;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [selectedDelegate, selectedDAO, sortBy]);

  const toggleExpanded = (delegateId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(delegateId)) {
      newExpanded.delete(delegateId);
    } else {
      newExpanded.add(delegateId);
    }
    setExpandedRows(newExpanded);
  };

  const getConflictCount = (conflicts: any) => {
    return Object.values(conflicts).flat().length;
  };

  const getHighRiskCount = (conflicts: any) => {
    return Object.values(conflicts)
      .flat()
      .filter((c: any) => c.severity === "high").length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            DAO Delegate Conflict Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Analyze potential conflicts of interest across major DAO delegates
            to make informed governance decisions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Delegates
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {delegates.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  High Risk Delegates
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {delegates.filter((d) => d.metrics.riskScore >= 8).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Cross-DAO Delegates
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {
                    delegates.filter((d) => d.metrics.crossDaoActivity >= 3)
                      .length
                  }
                </p>
              </div>
              <Network className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Risk Score
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    delegates.reduce((sum, d) => sum + d.metrics.riskScore, 0) /
                    delegates.length
                  ).toFixed(1)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>

            <select
              value={selectedDelegate}
              onChange={(e) => setSelectedDelegate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Delegates</option>
              {delegates.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDAO}
              onChange={(e) => setSelectedDAO(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All DAOs</option>
              {daos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="riskScore">Sort by Risk Score</option>
              <option value="transparency">Sort by Transparency</option>
              <option value="crossDao">Sort by Cross-DAO Activity</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Delegates Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Delegate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Risk Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Transparency
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    DAOs
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Conflicts
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDelegates.map((delegate) => (
                  <React.Fragment key={delegate.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {delegate.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {delegate.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(delegate.metrics.riskScore)}`}
                        >
                          {delegate.metrics.riskScore}/10
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{
                              width: `${delegate.metrics.transparencyScore * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {delegate.metrics.transparencyScore}/10
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {delegate.daos.map((daoId) => {
                            const dao = daos.find((d) => d.id === daoId);
                            return (
                              <span
                                key={daoId}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {dao?.name}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {getConflictCount(delegate.conflicts)} total
                          </span>
                          {getHighRiskCount(delegate.conflicts) > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {getHighRiskCount(delegate.conflicts)} high risk
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleExpanded(delegate.id)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          {expandedRows.has(delegate.id) ? (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4" />
                              View Details
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {expandedRows.has(delegate.id) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-6 bg-gray-50">
                          <div className="space-y-6">
                            {/* Metrics */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Performance Metrics
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                  <div className="text-sm text-gray-600">
                                    Voting Consistency
                                  </div>
                                  <div className="text-lg font-semibold text-gray-900">
                                    {delegate.metrics.votingConsistency}/10
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                  <div className="text-sm text-gray-600">
                                    Cross-DAO Activity
                                  </div>
                                  <div className="text-lg font-semibold text-gray-900">
                                    {delegate.metrics.crossDaoActivity} DAOs
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                  <div className="text-sm text-gray-600">
                                    Overall Risk
                                  </div>
                                  <div
                                    className={`text-lg font-semibold ${delegate.metrics.riskScore >= 8 ? "text-red-600" : delegate.metrics.riskScore >= 6 ? "text-orange-600" : "text-green-600"}`}
                                  >
                                    {delegate.metrics.riskScore >= 8
                                      ? "High"
                                      : delegate.metrics.riskScore >= 6
                                        ? "Medium"
                                        : "Low"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Conflicts */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Conflict Analysis
                              </h4>
                              <div className="space-y-4">
                                {Object.entries(delegate.conflicts).map(
                                  ([category, conflicts]) => (
                                    <div
                                      key={category}
                                      className="bg-white p-4 rounded-lg border"
                                    >
                                      <h5 className="font-medium text-gray-900 mb-2 capitalize">
                                        {category === "financial"
                                          ? "Financial Conflicts"
                                          : category === "governance"
                                            ? "Governance Conflicts"
                                            : "Disclosure Issues"}
                                      </h5>
                                      <div className="space-y-2">
                                        {conflicts.map((conflict, index) => (
                                          <div
                                            key={index}
                                            className="flex items-start gap-3"
                                          >
                                            <span
                                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(conflict.severity)}`}
                                            >
                                              {conflict.severity}
                                            </span>
                                            <div>
                                              <div className="font-medium text-sm text-gray-900">
                                                {conflict.type}
                                              </div>
                                              <div className="text-sm text-gray-600">
                                                {conflict.description}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Risk Assessment Legend
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-red-600 mb-2">
                High Risk (8-10)
              </div>
              <div className="text-gray-600">
                Significant conflicts that may impact governance decisions
              </div>
            </div>
            <div>
              <div className="font-medium text-orange-600 mb-2">
                Medium Risk (6-7.9)
              </div>
              <div className="text-gray-600">
                Moderate conflicts requiring monitoring
              </div>
            </div>
            <div>
              <div className="font-medium text-yellow-600 mb-2">
                Low Risk (4-5.9)
              </div>
              <div className="text-gray-600">
                Minor conflicts with good transparency
              </div>
            </div>
            <div>
              <div className="font-medium text-green-600 mb-2">
                Minimal Risk (0-3.9)
              </div>
              <div className="text-gray-600">
                Few or no significant conflicts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAODelegateAnalyzer;
