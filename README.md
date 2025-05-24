# dCOI – Delegate Conflict of Interest Analyzer

![banner](https://github.com/user-attachments/assets/0aa62b19-182d-410b-801f-a66ecb8b7643)

**dCOI** is a platform that detects and visualizes delegate conflicts of interest across DAOs, empowering token holders with transparent risk metrics and informed voting decisions.

[Demo Video]() | [Live App](https://dcoi.vercel.app) | [Slide Deck](https://github.com/hadzija7/dcoi/blob/main/slide-deck.md)

---

## Why dCOI?

DAOs are meant to decentralize governance, yet most rely on a small group of recurring delegates. The problem? These delegates often:

- Vote in **multiple DAOs** with overlapping interests
- Act without transparency on **external affiliations**
- Influence governance with **conflicts of interest**

**dCOI** solves this with:

- Conflict detection via cross-referenced delegate metadata
- Delegate scoring and risk metrics
- Dashboards that make conflicts easy to understand

---

## How dCOI Works

1. **Fetch Data**: Pull delegate info and vote histories via Tally API
2. **Cross-Reference**: Analyze across DAOs and platforms
3. **Detect Conflicts**: Identify overlaps and red flags
4. **Score & Rank**: Create a conflict scorecard per delegate
5. **Visualize**: Show all data via simple dashboards for users

<img width="450" alt="image" src="https://github.com/user-attachments/assets/ed06765a-5a30-4002-bb04-42b9a0c2f42b" />

---

## User Flow

1. User selects DAO → Fetches delegates via Tally API
2. Delegate profiles are scored → Based on COI risk
3. User views detailed dashboards → Conflicts, affiliations, voting patterns
4. (Future) Redelegate with 1 click or stake trust score
5. (Future) Scout submits proof of COI → Flag appears in delegate profile

---

## Tech Stack

- **Next.js** building framework
- **GraphQL** for normalized delegate data
- **Tally API** for governance data
- **OpenAI API (planned)** for vote summary analysis
- **Custom CoI Engine**: Conflict scoring & metadata extraction

### Dev & Ops
- Deployed on **vercel.**
- CI/CD via **GitHub Actions**
- Design with **Figma**

---

## Smart Features (Planned)

- ✅ Cross-DAO delegate profiling
- ✅ Conflict of interest scoring
- ⏳ Anonymous scout submission flow
- ⏳ Forum/Discourse keyword analysis
- ⏳ Governance Tokens swapper + re-delegation widget
- ⏳ AI chatbot for DAO Q&A
- ⏳ On-chain CoI proofs & IPFS storage

---

Scouting conflicts with 👀 at ETHBratislava 2025
