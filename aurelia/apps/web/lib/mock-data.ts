export type Ticker = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  volume: number;
  sector: string;
};

export const tickers: Ticker[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 187.62, changePct: 4.31, volume: 312_400_000, sector: "Semiconductors" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 172.09, changePct: -1.18, volume: 58_100_000, sector: "Semiconductors" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 512.44, changePct: 0.62, volume: 21_300_000, sector: "Software" },
  { symbol: "AAPL", name: "Apple Inc.", price: 231.18, changePct: -0.24, volume: 44_800_000, sector: "Hardware" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 198.77, changePct: 1.05, volume: 27_600_000, sector: "Internet" },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 268.30, changePct: -3.42, volume: 91_200_000, sector: "Automotive" },
];

export const indices = [
  { name: "S&P 500", value: 6482.11, changePct: 0.41 },
  { name: "Nasdaq 100", value: 22841.06, changePct: 0.88 },
  { name: "Dow Jones", value: 41207.55, changePct: -0.12 },
  { name: "Russell 2000", value: 2312.94, changePct: 0.23 },
];

export const newsItems = [
  { id: "1", ticker: "NVDA", headline: "NVIDIA data center revenue beats estimates on AI demand", source: "Reuters", time: "2h ago" },
  { id: "2", ticker: "NVDA", headline: "Analysts raise price targets following earnings call", source: "Bloomberg", time: "3h ago" },
  { id: "3", ticker: "TSLA", headline: "Tesla deliveries fall short of consensus for third straight quarter", source: "WSJ", time: "5h ago" },
  { id: "4", ticker: "AMD", headline: "AMD unveils next-generation MI350 accelerator roadmap", source: "CNBC", time: "6h ago" },
];

export const watchlist: Ticker[] = ["NVDA", "AMD", "GOOGL"]
  .map((symbol) => tickers.find((t) => t.symbol === symbol))
  .filter((t): t is Ticker => t !== undefined);

export const factorBreakdown = [
  { label: "Earnings beat", weight: 42, category: "FACT" as const },
  { label: "Data center guidance raised", weight: 31, category: "FACT" as const },
  { label: "Sector-wide AI capex momentum", weight: 18, category: "AI_INTERPRETATION" as const },
  { label: "Short covering into print", weight: 9, category: "HYPOTHESIS" as const },
];

export const evidenceItems = [
  { id: "e1", title: "NVIDIA Q2 FY26 Earnings Release", source: "NVIDIA IR", date: "Aug 20, 2026", type: "Filing" },
  { id: "e2", title: "NVIDIA data center revenue beats estimates on AI demand", source: "Reuters", date: "Aug 20, 2026", type: "News" },
  { id: "e3", title: "Q2 FY26 Earnings Call Transcript", source: "NVIDIA IR", date: "Aug 20, 2026", type: "Transcript" },
];
