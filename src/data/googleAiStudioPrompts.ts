export interface AiStudioPrompt {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  badge: string;
  category: 'Diagnostic' | 'Executive' | 'Predictive' | 'Governance' | 'Crisis' | 'Compliance' | 'Financial' | 'Communications';
  useCase: string;
  tone: string;
  rawTemplate: string;
  placeholders: string[];
  defaultValues: Record<string, string>;
  generateHydratedPrompt: (vars: Record<string, string>) => string;
  generateSimulatedOutput: (vars: Record<string, string>, currencySymbol: string, currencyRate: number) => string;
}

export const googleAiStudioPrompts: AiStudioPrompt[] = [
  // PROMPT 1
  {
    id: 'risk_analysis',
    number: 1,
    title: 'PROMPT 1: Risk Analysis (Main Diagnostic)',
    shortTitle: 'Risk Analysis',
    badge: 'Core Deep Dive',
    category: 'Diagnostic',
    useCase: 'Deep root-cause diagnostic and structured 3-tier mitigation when a high-risk PO is flagged in SAP S/4HANA.',
    tone: 'Professional, urgent but calm, actionable',
    placeholders: ['SUPPLIER_NAME', 'RISK_TYPE', 'RISK_SCORE', 'ROOT_CAUSE', 'IMPACT_VALUE', 'DAYS'],
    defaultValues: {
      SUPPLIER_NAME: 'Shanghai Logistics Co. / TSMC Kaohsiung',
      RISK_TYPE: 'delay & port disruption',
      RISK_SCORE: '94',
      ROOT_CAUSE: 'Super Typhoon Gaemi (Cat 4) + severe berth queue backlog at Port of Kaohsiung',
      IMPACT_VALUE: '2140000',
      DAYS: '8'
    },
    rawTemplate: `You are an expert supply chain business analyst with 20 years of experience.

A supply chain risk has been detected. Analyze it thoroughly and provide actionable recommendations.

RISK DETAILS:
- Supplier: {SUPPLIER_NAME}
- Risk Type: {RISK_TYPE} (delay/disruption/quality)
- Risk Score: {RISK_SCORE}/100
- Root Cause: {ROOT_CAUSE}
- Financial Impact: \${IMPACT_VALUE}
- Predicted Delay: {DAYS} days

YOUR TASK:
1. EXPLAIN THE ROOT CAUSE
   - Use simple business language
   - What caused this? Why now?
   - Is this a systemic issue?

2. BUSINESS IMPACT ANALYSIS
   - Financial loss if not addressed: $X
   - Customer impact: X orders affected
   - Supply chain ripple effects

3. MITIGATION OPTIONS (Top 3)
   For each option provide:
   - What to do (specific action)
   - Cost estimate
   - Time to implement
   - Probability of success (%)
   - Pros and cons

4. HISTORICAL CONTEXT
   - Have similar events happened before?
   - What was the outcome?
   - Lessons learned?

5. FINAL RECOMMENDATION
   - Your #1 recommended action
   - Why this option is best
   - Expected outcome
   - Confidence level (0-100%)

6. EXECUTION CHECKLIST
   - Immediate steps (next 24 hours)
   - Who needs to be notified?
   - What systems need updating?
   - Timeline for resolution

FORMAT:
Use clear sections with headers.
Use bullet points for readability.
Include specific numbers where possible.
End with an action summary.

TONE: Professional, urgent but calm, actionable.`,
    generateHydratedPrompt: (vars) => {
      return `You are an expert supply chain business analyst with 20 years of experience.

A supply chain risk has been detected. Analyze it thoroughly and provide actionable recommendations.

RISK DETAILS:
- Supplier: ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'}
- Risk Type: ${vars.RISK_TYPE || 'delay'} (delay/disruption/quality)
- Risk Score: ${vars.RISK_SCORE || '94'}/100
- Root Cause: ${vars.ROOT_CAUSE || 'Typhoon forming + port congestion'}
- Financial Impact: $${Number(vars.IMPACT_VALUE || 2140000).toLocaleString()}
- Predicted Delay: ${vars.DAYS || '8'} days

YOUR TASK:
1. EXPLAIN THE ROOT CAUSE
   - Use simple business language
   - What caused this? Why now?
   - Is this a systemic issue?

2. BUSINESS IMPACT ANALYSIS
   - Financial loss if not addressed: $X
   - Customer impact: X orders affected
   - Supply chain ripple effects

3. MITIGATION OPTIONS (Top 3)
   For each option provide:
   - What to do (specific action)
   - Cost estimate
   - Time to implement
   - Probability of success (%)
   - Pros and cons

4. HISTORICAL CONTEXT
   - Have similar events happened before?
   - What was the outcome?
   - Lessons learned?

5. FINAL RECOMMENDATION
   - Your #1 recommended action
   - Why this option is best
   - Expected outcome
   - Confidence level (0-100%)

6. EXECUTION CHECKLIST
   - Immediate steps (next 24 hours)
   - Who needs to be notified?
   - What systems need updating?
   - Timeline for resolution

FORMAT:
Use clear sections with headers.
Use bullet points for readability.
Include specific numbers where possible.
End with an action summary.

TONE: Professional, urgent but calm, actionable.`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      const impact = Number(vars.IMPACT_VALUE || 2140000) * rate;
      const days = vars.DAYS || '8';
      const supplier = vars.SUPPLIER_NAME || 'Shanghai Logistics Co.';
      return `### 📋 EXECUTIVE RISK ANALYSIS & MITIGATION DIRECTIVE
**Target Entity:** ${supplier} | **Risk Score:** ${vars.RISK_SCORE || '94'}/100 (CRITICAL)
**Financial Exposure:** ${sym}${Math.round(impact).toLocaleString()} | **Forecast Horizon:** +${days} Days Delay

---

#### 1. ROOT CAUSE EXPLANATION
* **Trigger Mechanism:** Severe weather anomaly (${vars.ROOT_CAUSE || 'Tropical cyclone & feeder port congestion'}) compounded by maritime carrier berthing moratoriums.
* **Why Now:** Arrival coincides with peak transshipment throughput; container vessels cannot drop anchor safely, resulting in an unabsorbed queue of 42+ bulk container vessels.
* **Systemic Nature:** Not an isolated supplier defect; rather a multi-modal macro logistics corridor failure across East Asia-to-Europe lanes.

---

#### 2. BUSINESS IMPACT ANALYSIS
* **Uncontained Financial Loss:** **${sym}${Math.round(impact).toLocaleString()}** in cumulative assembly line stoppage, idle direct labor overhead, and OEM late-delivery breach penalties.
* **Customer & Production Impact:** Halts 3 downstream final automotive/electronics assembly shifts by Day 4 (local safety buffer exhausted in 72 hours).
* **Supply Chain Ripple Effects:** Affects 14 downstream Tier-2 production runs, triggering automatic SAP S/4HANA stockout flags in Munich & Frankfurt plants.

---

#### 3. MITIGATION OPTIONS (EVALUATION MATRIX)

* **Option A: Priority Air Freight Split (40% Critical Batch via Boeing 777-F)**
  - **Action:** Divert 4,000 urgent units to international air cargo charter (Taipei/Shanghai ➔ Frankfurt).
  - **Cost Estimate:** ${sym}${Math.round(42000 * rate).toLocaleString()}
  - **Time to Implement:** 6 hours
  - **Probability of Success:** 96%
  - **Pros & Cons:** Rescues production buffer completely; premium freight delta is fully offset by averted downtime (+2,852% Net ROI).

* **Option B: Secondary Qualified Supplier Expedite (NXP Singapore / GlobalFoundries)**
  - **Action:** Draw 3,000 pre-qualified units from secondary contracted buffer warehouse.
  - **Cost Estimate:** ${sym}${Math.round(85000 * rate).toLocaleString()}
  - **Time to Implement:** 28 hours
  - **Probability of Success:** 82%
  - **Pros & Cons:** Preserves carrier relations; requires QA certificate-of-analysis sign-off before S/4HANA line release.

* **Option C: Plant Assembly Resequencing & Buffer Expansion**
  - **Action:** Push vehicle serial lines #4 & #5 back by 6 shifts; prioritize non-affected diesel/electric variants.
  - **Cost Estimate:** ${sym}${Math.round(110000 * rate).toLocaleString()}
  - **Time to Implement:** 12 hours
  - **Probability of Success:** 74%
  - **Pros & Cons:** Zero incremental freight expense; incurs warehouse storage re-handling friction.

---

#### 4. HISTORICAL CONTEXT & LESSONS LEARNED
* **Precedent Event:** Q3 2024 Typhoon Doksuri caused similar 9-day berth queues at Yantian.
* **Outcome:** Enterprises relying solely on sea-freight experienced average line halts of 5.8 days.
* **Takeaway:** Dual-modal air-sea split protocols reduced net financial loss by 88.4%.

---

#### 5. FINAL STRATEGIC RECOMMENDATION
* **Primary Recommendation:** **EXECUTE OPTION A (Priority Air Freight Split)**
* **Justification:** Net protection value of ${sym}${Math.round(impact - 42000 * rate).toLocaleString()} with 96% deterministic arrival certainty.
* **Confidence Level:** **97.8% (LightGBM verified)**

---

#### 6. 24-HOUR EXECUTION CHECKLIST
1. [x] **0-2 Hours:** Authorize expedited logistics budget allocation in SAP MM/FI.
2. [x] **2-4 Hours:** Execute \`BAPI_PO_CHANGE\` in SAP S/4HANA updating Schedule Line carrier to Lufthansa / China Airlines Cargo.
3. [x] **4-6 Hours:** Transmit EDI 850/855 Purchase Order Revision to ${supplier}.
4. [x] **6-12 Hours:** Reschedule SAP IBP & MRP Controller buffers to prevent automated plant panic purchasing.`;
    }
  },

  // PROMPT 2
  {
    id: 'quick_recommendation',
    number: 2,
    title: 'PROMPT 2: Quick Executive Recommendation (30 Seconds)',
    shortTitle: 'Quick 30s Action',
    badge: '30-Sec Executive',
    category: 'Executive',
    useCase: 'Instant one-line executive directive suitable for mobile notification banners, C-suite SMS, or dashboard summary pills.',
    tone: 'Crisp, high-density, authoritative',
    placeholders: ['RISK_SUMMARY', 'SUPPLIER_NAME', 'IMPACT_VALUE'],
    defaultValues: {
      RISK_SUMMARY: 'Typhoon Gaemi Category 4 forming near Kaohsiung port anchorage with +8 days projected berth wait',
      SUPPLIER_NAME: 'TSMC Taiwan / Shanghai Logistics',
      IMPACT_VALUE: '2140000'
    },
    rawTemplate: `A supply chain risk has been detected.

Risk: {RISK_SUMMARY}
Supplier: {SUPPLIER_NAME}
Financial Impact: \${IMPACT_VALUE}

Provide ONE sentence recommending the top action to take.
Format: "ACTION: [Specific action to take] | COST: $[amount] | TIME: [hours/days]"

Example: "ACTION: Reroute 30% of orders via air freight | COST: $85K | TIME: 6 hours"`,
    generateHydratedPrompt: (vars) => {
      return `A supply chain risk has been detected.

Risk: ${vars.RISK_SUMMARY || 'Typhoon forming + port congestion'}
Supplier: ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'}
Financial Impact: $${Number(vars.IMPACT_VALUE || 2140000).toLocaleString()}

Provide ONE sentence recommending the top action to take.
Format: "ACTION: [Specific action to take] | COST: $[amount] | TIME: [hours/days]"

Example: "ACTION: Reroute 30% of orders via air freight | COST: $85K | TIME: 6 hours"`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      const cost = Math.round(42000 * rate);
      return `ACTION: Split-ship 40% priority consignment via expedited Lufthansa Air Cargo charter and commit SAP BAPI_PO_CHANGE | COST: ${sym}${cost.toLocaleString()} | TIME: 6 hours`;
    }
  },

  // PROMPT 3
  {
    id: 'forecasting',
    number: 3,
    title: 'PROMPT 3: Forecasting & Predictive Risk Horizons',
    shortTitle: 'Predictive Horizon',
    badge: '7–30 Day Forecast',
    category: 'Predictive',
    useCase: 'Projects future disruption trajectories across 7-day, 14-day, and 30-day temporal windows based on telemetry and supplier history.',
    tone: 'Analytical, actuarial, forward-looking',
    placeholders: ['SUPPLIER_NAME', 'REGION', 'DAYS', 'PERCENTAGE', 'EVENTS', 'WEATHER_CONDITIONS', 'PORT_STATUS'],
    defaultValues: {
      SUPPLIER_NAME: 'Shanghai Logistics Co.',
      REGION: 'East Asia / Taiwan Strait Corridor',
      DAYS: '24',
      PERCENTAGE: '88.4',
      EVENTS: 'Seasonal factory overtime before Golden Week',
      WEATHER_CONDITIONS: 'Super Typhoon Gaemi (Category 4), max sustained winds 135 km/h, wave heights 7.2m',
      PORT_STATUS: 'Kaohsiung & Shanghai at 118% berth capacity; 42 vessels queued at anchor'
    },
    rawTemplate: `You are a supply chain forecasting expert.

Based on this supplier data, forecast supply chain risks:

SUPPLIER DATA:
- Name: {SUPPLIER_NAME}
- Region: {REGION}
- Lead Time: {DAYS} days
- On-Time Delivery Rate: {PERCENTAGE}%
- Current Capacity: 92%
- Recent Events: {EVENTS}
- Inventory Level: 14,200 units
- Seasonal Factor: Peak Pre-Holiday Shipping Rush

EXTERNAL FACTORS:
- Weather: {WEATHER_CONDITIONS}
- Geopolitical: Strait maritime naval transit advisories
- Port Status: {PORT_STATUS}
- Market Demand: High (Global EV & Semiconductor ramp)

FORECAST RISKS for:
1. NEXT 7 DAYS
   - Risk type: [delay/disruption/quality/shortage]
   - Probability: X%
   - Expected impact: $X
   - Recommended preventive actions

2. NEXT 14 DAYS
   - Risk type
   - Probability
   - Expected impact
   - Preventive actions

3. NEXT 30 DAYS
   - Long-term trends
   - Strategic recommendations

OUTPUT:
Use a risk matrix with:
- Impact (Low/Medium/High)
- Probability (Low/Medium/High)
- Recommended actions for each risk tier`,
    generateHydratedPrompt: (vars) => {
      return `You are a supply chain forecasting expert.

Based on this supplier data, forecast supply chain risks:

SUPPLIER DATA:
- Name: ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'}
- Region: ${vars.REGION || 'East Asia'}
- Lead Time: ${vars.DAYS || '24'} days
- On-Time Delivery Rate: ${vars.PERCENTAGE || '88.4'}%
- Current Capacity: 92%
- Recent Events: ${vars.EVENTS || 'Seasonal peak'}
- Inventory Level: 14,200 units
- Seasonal Factor: Peak Pre-Holiday Shipping Rush

EXTERNAL FACTORS:
- Weather: ${vars.WEATHER_CONDITIONS || 'Severe storm alerts'}
- Geopolitical: Strait maritime naval transit advisories
- Port Status: ${vars.PORT_STATUS || 'Port congestion 118%'}
- Market Demand: High (Global EV & Semiconductor ramp)

FORECAST RISKS for:
1. NEXT 7 DAYS
   - Risk type: [delay/disruption/quality/shortage]
   - Probability: X%
   - Expected impact: $X
   - Recommended preventive actions

2. NEXT 14 DAYS
   - Risk type
   - Probability
   - Expected impact
   - Preventive actions

3. NEXT 30 DAYS
   - Long-term trends
   - Strategic recommendations

OUTPUT:
Use a risk matrix with:
- Impact (Low/Medium/High)
- Probability (Low/Medium/High)
- Recommended actions for each risk tier`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      return `### 🔮 7-TO-30 DAY PREDICTIVE RISK HORIZON MATRIX
**Corridor:** ${vars.REGION || 'East Asia / Taiwan Strait'} | **Entity:** ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'}

---

#### 1. HORIZON 1: NEXT 7 DAYS (IMMINENT CHOKEPOINT)
* **Risk Classification:** Severe Port Disruption & Vessel Berthing Freeze
* **Probability:** **94.2%** (Critical Tier)
* **Expected Financial Impact:** **${sym}${Math.round(1850000 * rate).toLocaleString()}**
* **Root Drivers:** Cat-4 storm surge, crane shutdown protocols, pilotage suspended.
* **Immediate Preventive Action:** Issue SAP S/4HANA exception hold; reroute first container manifest to Ningbo-Zhoushan feeder or air-cargo charter.

#### 2. HORIZON 2: NEXT 14 DAYS (SECONDARY RIPPLE EFFECT)
* **Risk Classification:** Component Shortage & Intra-Plant Inventory Depletion
* **Probability:** **78.6%** (High Tier)
* **Expected Financial Impact:** **${sym}${Math.round(820000 * rate).toLocaleString()}**
* **Root Drivers:** Vessel bunching at destination hub (Rotterdam / Hamburg) creating multi-day drayage chassis shortages.
* **Preventive Action:** Trigger secondary supplier allocations (NXP / Bosch) and pre-book inland rail corridors in Germany.

#### 3. HORIZON 3: NEXT 30 DAYS (STRUCTURAL POST-CRISIS RESILIENCE)
* **Risk Classification:** Freight Rate Volatility & Capacity Tightening
* **Probability:** **62.0%** (Medium Tier)
* **Expected Financial Impact:** **${sym}${Math.round(340000 * rate).toLocaleString()}**
* **Root Drivers:** 12% ocean spot container rate spike due to blank sailings and equipment repositioning imbalance.
* **Strategic Recommendation:** Lock 90-day index-linked contract rates; increase Munich plant safety stock buffer from 3 days to 7 days in SAP IBP.

---

#### 📊 MULTI-HORIZON RISK MATRIX SUMMARY
| Horizon | Probability | Operational Impact | Recommended Action Tier |
| :--- | :--- | :--- | :--- |
| **0–7 Days** | 🔴 94% (Very High) | 🔴 CRITICAL | Emergency Charter & SAP BAPI Reroute |
| **8–14 Days** | 🟡 78% (High) | 🟡 SUBSTANTIAL | Strategic Inventory Drawdown |
| **15–30 Days**| 🟢 62% (Medium) | 🟢 MODERATE | Dual-Sourcing Contract Diversification |`;
    }
  },

  // PROMPT 4
  {
    id: 'vendor_performance',
    number: 4,
    title: 'PROMPT 4: Vendor Performance & Tier Governance',
    shortTitle: 'Vendor Governance',
    badge: 'Supplier Health & QA',
    category: 'Governance',
    useCase: 'Evaluates supplier reliability scorecards, historical defect rates, and recommends whether to keep, develop, or replace the vendor.',
    tone: 'Objective, strategic, performance-driven',
    placeholders: ['SUPPLIER_NAME', 'INDUSTRY', 'YEARS', 'STATUS', 'RATING'],
    defaultValues: {
      SUPPLIER_NAME: 'Shanghai Logistics Co. / Kaohsiung Precision',
      INDUSTRY: 'High-Tech Semiconductor Packaging & Freight',
      YEARS: '14',
      STATUS: 'Stable (Altman Z-score 3.24)',
      RATING: '4.2'
    },
    rawTemplate: `Analyze this supplier's performance and recommend action.

SUPPLIER PROFILE:
- Name: {SUPPLIER_NAME}
- Industry: {INDUSTRY}
- Years in Business: {YEARS}
- Financial Health: {STATUS}
- Quality Rating: {RATING}/5

PERFORMANCE METRICS (Last 12 months):
- On-Time Delivery: 84.6%
- Defect Rate: 0.12%
- Cost Trend: +4.2% YoY
- Order Fulfillment: 98.1%
- Communication Score: 3.8/5

INCIDENTS (Last 12 months):
- Incident 1: 5-day delivery slip during 2025 typhoon season
- Incident 2: Customs documentation hold at Rotterdam due to HS code mismatch
- Incident 3: Unannounced carrier change resulting in EDI transmission gap

QUESTIONS TO ANSWER:
1. What is this supplier's health status? (Green/Yellow/Red)
2. Are there red flags we should address?
3. Should we continue, develop, or replace this supplier?
4. What improvements would make the biggest impact?
5. What's our risk level with this supplier?

RECOMMENDATION:
- Strategic recommendation (keep/develop/replace)
- Action plan (if developing)
- Timeline for decision
- Alternative suppliers to consider`,
    generateHydratedPrompt: (vars) => {
      return `Analyze this supplier's performance and recommend action.

SUPPLIER PROFILE:
- Name: ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'}
- Industry: ${vars.INDUSTRY || 'High-Tech Semiconductor'}
- Years in Business: ${vars.YEARS || '14'}
- Financial Health: ${vars.STATUS || 'Stable'}
- Quality Rating: ${vars.RATING || '4.2'}/5

PERFORMANCE METRICS (Last 12 months):
- On-Time Delivery: 84.6%
- Defect Rate: 0.12%
- Cost Trend: +4.2% YoY
- Order Fulfillment: 98.1%
- Communication Score: 3.8/5

INCIDENTS (Last 12 months):
- Incident 1: 5-day delivery slip during 2025 typhoon season
- Incident 2: Customs documentation hold at Rotterdam due to HS code mismatch
- Incident 3: Unannounced carrier change resulting in EDI transmission gap

QUESTIONS TO ANSWER:
1. What is this supplier's health status? (Green/Yellow/Red)
2. Are there red flags we should address?
3. Should we continue, develop, or replace this supplier?
4. What improvements would make the biggest impact?
5. What's our risk level with this supplier?

RECOMMENDATION:
- Strategic recommendation (keep/develop/replace)
- Action plan (if developing)
- Timeline for decision
- Alternative suppliers to consider`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      return `### 🏭 SUPPLIER HEALTH AUDIT & PERFORMANCE GOVERNANCE
**Vendor:** ${vars.SUPPLIER_NAME || 'Shanghai Logistics Co.'} | **Sector:** ${vars.INDUSTRY || 'High-Tech Logistics'}

---

#### 1. SUPPLIER HEALTH STATUS: 🟡 YELLOW (CONDITIONAL HOLD)
While the vendor demonstrates stellar technical quality (0.12% defect rate) and strong financial solvability, logistics orchestration and EDI protocol adherence fall short of Tier-1 SAP benchmark standards.

#### 2. RED FLAG EVALUATION
* **Communication Latency:** 3.8/5 communication score reveals delayed incident escalation (averaging 18 hours before notifying our ERP team).
* **Carrier Transparency:** Incident #3 (unannounced subcontracting) violates our Master Services Agreement (MSA Clause 14.2).

#### 3. STRATEGIC RECOMMENDATION: **DEVELOP (DO NOT REPLACE YET)**
* **Rationale:** Replacement costs for semiconductor packaging qualifications are estimated at **${sym}${Math.round(450000 * rate).toLocaleString()}** with a 6-month ramp-up cycle. Development preserves supply continuity while enforcing stricter SLA penalties.

#### 4. HIGH-IMPACT IMPROVEMENT ROADMAP (90-DAY CONTRACTUAL PIPELINE)
1. **Direct API Integration:** Mandate real-time automated telemetry push into our SAP S/4HANA OData gateway rather than manual EDI batching.
2. **Dual-Carrier Fallback Agreement:** Require the vendor to maintain contracted standby air cargo space (minimum 20 TEU equivalent) during typhoon seasons.
3. **Automated Customs Pre-Clearance:** Enforce automated Harmonized Tariff Schedule (HTS) verification before dispatch.

#### 5. QUALIFIED BENCHMARK ALTERNATIVES
* **Primary Fallback:** NXP Semiconductors / DB Schenker Singapore (Score: 4.8/5, +6% cost delta)
* **Secondary Fallback:** DHL Global Forwarding Taiwan (Score: 4.6/5, ready integration)`;
    }
  },

  // PROMPT 5
  {
    id: 'crisis_response',
    number: 5,
    title: 'PROMPT 5: Multi-Supplier Crisis Response Planning',
    shortTitle: 'Crisis Response Plan',
    badge: 'Catastrophe Protocol',
    category: 'Crisis',
    useCase: 'Instant emergency mobilization when multiple global suppliers are hit simultaneously by a macro chokepoint or catastrophic event.',
    tone: 'Urgent, command-and-control, military-grade precision',
    placeholders: ['CRISIS_DESCRIPTION', 'SUPPLIER_1', 'SUPPLIER_2', 'TOTAL_AMOUNT', 'NUMBER'],
    defaultValues: {
      CRISIS_DESCRIPTION: 'Typhoon Gaemi makes landfall; Port of Kaohsiung shut down, Taiwan rail freight paralyzed, and 3 major tier-1 suppliers halted.',
      SUPPLIER_1: 'TSMC Kaohsiung ($850,000)',
      SUPPLIER_2: 'ASE Technology Packaging ($620,000)',
      TOTAL_AMOUNT: '2450000',
      NUMBER: '184'
    },
    rawTemplate: `SUPPLY CHAIN CRISIS ALERT!

Multiple suppliers are affected:
{CRISIS_DESCRIPTION}

Affected Suppliers:
- {SUPPLIER_1}
- {SUPPLIER_2}
- Delta Electronics ($980,000)

Total Revenue at Risk: \${TOTAL_AMOUNT}
Customer Orders Affected: {NUMBER}

URGENT: Create a crisis response plan with:

1. IMMEDIATE ACTIONS (Next 6 hours)
   - Communication plan
   - Notification template
   - Emergency contacts

2. SHORT-TERM RESPONSE (6-48 hours)
   - Order rerouting strategy
   - Resource allocation
   - Customer communication
   - Cost estimate

3. MEDIUM-TERM (2-14 days)
   - Recovery plan
   - Supplier support
   - Inventory adjustments
   - Cost mitigation

4. LONG-TERM (1-3 months)
   - Preventive measures
   - Supplier resilience improvements
   - Diversification strategy

5. TOTAL IMPACT ANALYSIS
   - Worst case scenario ($)
   - Best case scenario ($)
   - Most likely scenario ($)
   - Insurance/contingency options

Output a detailed ACTION PLAN with TIMELINE and COST ESTIMATES.`,
    generateHydratedPrompt: (vars) => {
      return `SUPPLY CHAIN CRISIS ALERT!

Multiple suppliers are affected:
${vars.CRISIS_DESCRIPTION || 'Typhoon Gaemi makes landfall; multi-hub disruption.'}

Affected Suppliers:
- ${vars.SUPPLIER_1 || 'TSMC Kaohsiung ($850,000)'}
- ${vars.SUPPLIER_2 || 'ASE Technology ($620,000)'}
- Delta Electronics ($980,000)

Total Revenue at Risk: $${Number(vars.TOTAL_AMOUNT || 2450000).toLocaleString()}
Customer Orders Affected: ${vars.NUMBER || '184'}

URGENT: Create a crisis response plan with:

1. IMMEDIATE ACTIONS (Next 6 hours)
   - Communication plan
   - Notification template
   - Emergency contacts

2. SHORT-TERM RESPONSE (6-48 hours)
   - Order rerouting strategy
   - Resource allocation
   - Customer communication
   - Cost estimate

3. MEDIUM-TERM (2-14 days)
   - Recovery plan
   - Supplier support
   - Inventory adjustments
   - Cost mitigation

4. LONG-TERM (1-3 months)
   - Preventive measures
   - Supplier resilience improvements
   - Diversification strategy

5. TOTAL IMPACT ANALYSIS
   - Worst case scenario ($)
   - Best case scenario ($)
   - Most likely scenario ($)
   - Insurance/contingency options

Output a detailed ACTION PLAN with TIMELINE and COST ESTIMATES.`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      const total = Number(vars.TOTAL_AMOUNT || 2450000) * rate;
      return `### 🚨 GLOBAL SUPPLY CHAIN CRISIS ACTION COMMAND
**Incident Type:** Compound Regional Natural Catastrophe | **Total Exposure:** ${sym}${Math.round(total).toLocaleString()}
**Direct Customer Orders Impacted:** ${vars.NUMBER || '184'} High-Value Shipments

---

#### 1. IMMEDIATE ACTIONS (PHASE 1: NEXT 0–6 HOURS)
* **Crisis War Room Activation:** Convene Joint Operations Taskforce (Procurement, S/4HANA Controllers, Logistics Freight Forwarders).
* **Emergency Broadcast Dispatch:** Auto-trigger SAP Business Network alert to all 3 impacted Tier-1 partners requesting inventory coordinates.
* **Freeze Non-Essential POs:** Place temporary hold on non-critical materials to preserve cash flow and European warehouse buffer capacity.

#### 2. SHORT-TERM RESPONSE (PHASE 2: 6–48 HOURS)
* **Air Bridge Activation:** Charter 2 dedicated cargo freighters (Taipei ➔ Munich / Frankfurt) to consolidate microconductors and power modules.
* **Customer Executive Communication:** Issue proactive revised SLA updates with transparent tracking telemetry before customers notice factory delays.
* **Allocated Emergency Budget:** **${sym}${Math.round(145000 * rate).toLocaleString()}** in expedited freight and handling contingencies.

#### 3. MEDIUM-TERM RECOVERY (PHASE 3: 2–14 DAYS)
* **BOM Substitution Clearance:** Activate pre-approved alternate engineering bills of materials in SAP PLM to utilize secondary suppliers in Singapore and Germany.
* **Inland Rail Integration:** Reroute sea freight containers offloaded at Hong Kong via China-Europe Railway Express (CRE).

#### 4. FINANCIAL EXPOSURE BRACKETS
| Scenario | Financial Impact | Probability | Outcome |
| :--- | :--- | :--- | :--- |
| **Worst-Case (Inaction)** | ${sym}${Math.round(total * 1.35).toLocaleString()} | 15% | Assembly line halted 12 days; major OEM breach penalties |
| **Most Likely (Mitigated)** | **${sym}${Math.round(total * 0.18).toLocaleString()}** | **78%** | **Lines preserved via Air-Sea hybrid bridge; 0 stockouts** |
| **Best-Case (Immediate Recovery)** | ${sym}${Math.round(total * 0.08).toLocaleString()} | 7% | Ports reopen within 36h; minimal expedited fee |

* **Cargo Insurance Trigger:** File preliminary Notice of Loss under Institute Cargo Clauses (A) with Lloyd's of London syndicates.`;
    }
  },

  // PROMPT 6
  {
    id: 'compliance_check',
    number: 6,
    title: 'PROMPT 6: Global Compliance & ESG Risk Verification',
    shortTitle: 'Compliance & ESG',
    badge: 'Regulatory & Trade',
    category: 'Compliance',
    useCase: 'Ensures proposed expedited rerouting or alternate sourcing adheres strictly to international trade laws, customs, ESG, and labor regulations.',
    tone: 'Rigorous, legalistic, audit-ready',
    placeholders: ['ACTION_DESCRIPTION', 'COUNTRY', 'INDUSTRY', 'STANDARDS', 'AGREEMENTS'],
    defaultValues: {
      ACTION_DESCRIPTION: 'Diverting 40% of microconductor consignment via emergency air freight charter from Taiwan through Dubai to Munich, shifting secondary volume to Singapore',
      COUNTRY: 'Germany / Taiwan / UAE / Singapore',
      INDUSTRY: 'Automotive & Industrial Electronics',
      STANDARDS: 'ISO 9001, IATF 16949, German LkSG (Supply Chain Act), EU CBAM, RoHS',
      AGREEMENTS: 'EU-Singapore Free Trade Agreement (EUSFTA), Incoterms 2020 (DDP Frankfurt)'
    },
    rawTemplate: `Compliance Check Required.

This supply chain action is being considered:
{ACTION_DESCRIPTION}

Regulatory Requirements:
- Country: {COUNTRY}
- Industry: {INDUSTRY}
- Standards: {STANDARDS}
- Trade Agreements: {AGREEMENTS}

CHECK FOR:
1. Regulatory Compliance
   - Is this action legal?
   - What permits/approvals needed?
   - Timeline for compliance?

2. Trade Compliance
   - Tariffs or trade restrictions?
   - Export/import limitations?
   - Documentation requirements?

3. Contractual Compliance
   - Does this violate supplier contracts?
   - Customer contract implications?
   - Insurance coverage?

4. Environmental & Social Compliance
   - ESG implications?
   - Carbon footprint impact?
   - Labor considerations?

5. Financial Compliance
   - Audit implications?
   - Tax considerations?
   - Accounting treatment?

Recommendation:
- Is action compliant? (Yes/No/With conditions)
- Required steps before proceeding
- Risk assessment if non-compliant
- Timeline to full compliance`,
    generateHydratedPrompt: (vars) => {
      return `Compliance Check Required.

This supply chain action is being considered:
${vars.ACTION_DESCRIPTION || 'Diverting microconductors via air cargo charter through Dubai.'}

Regulatory Requirements:
- Country: ${vars.COUNTRY || 'Germany / Taiwan / Singapore'}
- Industry: ${vars.INDUSTRY || 'Automotive Electronics'}
- Standards: ${vars.STANDARDS || 'ISO 9001, German LkSG, EU CBAM'}
- Trade Agreements: ${vars.AGREEMENTS || 'EUSFTA, Incoterms 2020 DDP'}

CHECK FOR:
1. Regulatory Compliance
   - Is this action legal?
   - What permits/approvals needed?
   - Timeline for compliance?

2. Trade Compliance
   - Tariffs or trade restrictions?
   - Export/import limitations?
   - Documentation requirements?

3. Contractual Compliance
   - Does this violate supplier contracts?
   - Customer contract implications?
   - Insurance coverage?

4. Environmental & Social Compliance
   - ESG implications?
   - Carbon footprint impact?
   - Labor considerations?

5. Financial Compliance
   - Audit implications?
   - Tax considerations?
   - Accounting treatment?

Recommendation:
- Is action compliant? (Yes/No/With conditions)
- Required steps before proceeding
- Risk assessment if non-compliant
- Timeline to full compliance`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      return `### ⚖️ INTERNATIONAL TRADE & ESG COMPLIANCE VERIFICATION
**Proposed Directive:** Air Freight Rerouting & Dual-Sourcing Shift | **Jurisdictions:** ${vars.COUNTRY || 'EU / Taiwan / UAE'}

---

#### 1. REGULATORY & EXPORT CONTROL: ✅ COMPLIANT (WITH CONDITIONS)
* **Dual-Use Technology Check:** Microconductors meet EU Dual-Use Regulation (EU) 2021/821 Annex I thresholds. Requires export declaration filed under Taiwan BOFT electronic single-window.
* **Dubai Transshipment Security:** Transit manifest requires UAE Customs Pre-Arrival Notification (CPA) 4 hours before landing.

#### 2. TRADE & CUSTOMS COMPLIANCE
* **Tariff Impact:** Under the WTO Information Technology Agreement (ITA), microconductors enter the EU duty-free (0% MFN tariff rate).
* **Certificate of Origin (CoO):** Singapore volume qualifies under the EU-Singapore Free Trade Agreement (EUSFTA). Ensure supplier provides Origin Declaration on commercial invoice.

#### 3. ESG & ENVIRONMENTAL COMPLIANCE (EU CBAM & LkSG)
* **German Supply Chain Due Diligence Act (LkSG):** Full compliance confirmed; secondary supplier is audited against ILO Core Labor Standards.
* **Carbon Footprint Variance:** Air freight increases Scope 3 emissions by +3.4 MT CO2e. Action: Automatically purchase certified Gold Standard carbon offsets inside SAP Sustainability Control Tower.

#### 4. CONTRACTUAL & INSURANCE VALIDATION
* **Incoterms 2020:** Transfer terms shift from FOB Kaohsiung to DDP Munich. All risk of loss during air transit remains with the insured carrier.

---

#### 📌 FINAL COMPLIANCE VERDICT: **APPROVED WITH 2 CONDITIONS**
1. [x] Attach EUSFTA Preferential Origin Declaration to Singapore batch.
2. [x] Log +3.4 MT CO2e delta in SAP Sustainability Ledger.
* **Audit Risk Rating:** **VERY LOW (0.4% risk probability)**`;
    }
  },

  // PROMPT 7
  {
    id: 'cost_benefit',
    number: 7,
    title: 'PROMPT 7: Multi-Option Cost-Benefit & ROI Scorecard',
    shortTitle: 'Cost-Benefit Scorecard',
    badge: 'Financial Modeling',
    category: 'Financial',
    useCase: 'Calculates NPV, ROI, payback horizons, and financial scorecards comparing multiple proposed mitigation investments.',
    tone: 'Rigorous, CFO-ready, quantitative',
    placeholders: ['OPTION_1_NAME', 'OPTION_2_NAME', 'OPTION_3_NAME'],
    defaultValues: {
      OPTION_1_NAME: 'Priority Air Freight Charter (40% batch)',
      OPTION_2_NAME: 'Secondary Supplier Spot Sourcing (NXP Singapore)',
      OPTION_3_NAME: 'Plant Shift Resequencing & Buffer Extension'
    },
    rawTemplate: `COST-BENEFIT ANALYSIS

I'm evaluating 3 mitigation options for this supply chain risk.

OPTION 1: {OPTION_1_NAME}
- Description: Expedite 4,000 units via Boeing 777 air charter
- Implementation Cost: $42,000
- Timeline: 6 hours
- Benefits: Recovers 6 days of delay, prevents $1.24M plant halt

OPTION 2: {OPTION_2_NAME}
- Description: Purchase 3,000 buffer units from NXP Singapore warehouse
- Implementation Cost: $85,000
- Timeline: 28 hours
- Benefits: Recovers 4 days of delay, stabilizes Munich assembly

OPTION 3: {OPTION_3_NAME}
- Description: Resequence 2 vehicle production lines to non-semiconductor variants
- Implementation Cost: $110,000
- Timeline: 12 hours
- Benefits: Recovers 3 days of delay, reduces external supplier dependency

ANALYSIS REQUIRED:

1. FINANCIAL METRICS
   - NPV (Net Present Value) for each option
   - ROI (Return on Investment) for each
   - Payback period
   - Cost per day of protection

2. RISK-ADJUSTED ANALYSIS
   - Risk reduction %
   - Residual risk after implementation
   - Probability of success

3. SCORECARD COMPARISON
   Create a table ranking each option:
   [Option Name] | Cost | ROI | Timeline | Risk Reduction | Recommendation Score

4. FINAL RECOMMENDATION
   - Best option overall
   - Hybrid approach option (combining elements)
   - Conservative approach (safest)
   - Aggressive approach (highest ROI)`,
    generateHydratedPrompt: (vars) => {
      return `COST-BENEFIT ANALYSIS

I'm evaluating 3 mitigation options for this supply chain risk.

OPTION 1: ${vars.OPTION_1_NAME || 'Priority Air Freight Charter'}
- Description: Expedite 4,000 units via Boeing 777 air charter
- Implementation Cost: $42,000
- Timeline: 6 hours
- Benefits: Recovers 6 days of delay, prevents $1.24M plant halt

OPTION 2: ${vars.OPTION_2_NAME || 'Secondary Supplier Spot Sourcing'}
- Description: Purchase 3,000 buffer units from NXP Singapore warehouse
- Implementation Cost: $85,000
- Timeline: 28 hours
- Benefits: Recovers 4 days of delay, stabilizes Munich assembly

OPTION 3: ${vars.OPTION_3_NAME || 'Plant Shift Resequencing'}
- Description: Resequence 2 vehicle production lines to non-semiconductor variants
- Implementation Cost: $110,000
- Timeline: 12 hours
- Benefits: Recovers 3 days of delay, reduces external supplier dependency

ANALYSIS REQUIRED:
1. FINANCIAL METRICS (NPV, ROI, Payback, Cost/Day Protected)
2. RISK-ADJUSTED ANALYSIS
3. SCORECARD COMPARISON TABLE
4. FINAL RECOMMENDATION (Best overall, Hybrid, Conservative, Aggressive)`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      const c1 = Math.round(42000 * rate);
      const c2 = Math.round(85000 * rate);
      const c3 = Math.round(110000 * rate);
      return `### 💰 CFO-GRADE COST-BENEFIT & RISK-ADJUSTED SCORECARD

---

#### 1. FINANCIAL METRICS BENCHMARK
* **Option 1 (Air Freight):** Net Benefit: ${sym}${Math.round(1198000 * rate).toLocaleString()} | **ROI: +2,852%** | Payback: **<4 Hours** | Cost/Day Protected: ${sym}${Math.round(7000 * rate).toLocaleString()}/day
* **Option 2 (Secondary Sourcing):** Net Benefit: ${sym}${Math.round(735000 * rate).toLocaleString()} | **ROI: +864%** | Payback: 18 Hours | Cost/Day Protected: ${sym}${Math.round(21250 * rate).toLocaleString()}/day
* **Option 3 (Plant Resequencing):** Net Benefit: ${sym}${Math.round(510000 * rate).toLocaleString()} | **ROI: +463%** | Payback: 24 Hours | Cost/Day Protected: ${sym}${Math.round(36600 * rate).toLocaleString()}/day

---

#### 2. COMPARATIVE DECISION SCORECARD
| Strategy | Upfront Cost | Net ROI | Speed | Risk Reduction | Overall Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Air Charter** | **${sym}${c1.toLocaleString()}** | **+2,852%** | **6h** | **94%** | 🏆 **9.8 / 10** |
| **Option 2: Sec. Supplier** | ${sym}${c2.toLocaleString()} | +864% | 28h | 82% | 🥈 8.4 / 10 |
| **Option 3: Resequencing** | ${sym}${c3.toLocaleString()} | +463% | 12h | 71% | 🥉 7.2 / 10 |

---

#### 3. EXECUTIVE ALLOCATION DIRECTIVE
* **Best Option Overall:** **OPTION 1 (Air Freight Charter)** &mdash; Unmatched capital efficiency and lowest execution latency.
* **Hybrid Champion Strategy:** Commit Option 1 immediately (${sym}${c1.toLocaleString()}) to bridge Days 1–6, while issuing a soft reserve on Option 2 as a backup buffer if port congestion exceeds 10 days.`;
    }
  },

  // PROMPT 8
  {
    id: 'communication_templates',
    number: 8,
    title: 'PROMPT 8: Multi-Audience Executive Communications',
    shortTitle: 'Communications',
    badge: 'Email & Dispatches',
    category: 'Communications',
    useCase: 'Generates ready-to-dispatch professional communications tailored for Suppliers, Management Escalations, and Impacted Customers.',
    tone: 'Diplomatic, authoritative, transparent',
    placeholders: ['SITUATION_DESCRIPTION', 'AUDIENCE', 'TONE', 'GOAL'],
    defaultValues: {
      SITUATION_DESCRIPTION: 'Typhoon Gaemi delay on PO #45008921; rerouting 40% priority consignment via air cargo charter and updating SAP schedule lines',
      AUDIENCE: 'Suppliers, Executive Management, and Tier-1 Automotive Customers',
      TONE: 'Urgent yet reassuring, executive, collaborative',
      GOAL: 'Confirm air charter booking, secure C-suite budget approval, and reassure customers of zero assembly delay'
    },
    rawTemplate: `Generate professional communication templates for this situation:

SITUATION: {SITUATION_DESCRIPTION}
AUDIENCE: {AUDIENCE} (suppliers/customers/management)
TONE: {TONE} (urgent/reassuring/neutral/executive)
GOAL: {GOAL} (inform/reassure/request action/seek approval)

GENERATE:

1. EMAIL TEMPLATE (For Supplier / Carrier)
   - Subject line
   - Opening (why we're contacting)
   - Key message (what's happening)
   - Impact (how it affects them)
   - Action required (what we need)
   - Timeline (urgency)
   - Closing

2. ESCALATION MESSAGE (For Management / C-Suite)
   - Business impact summary
   - Recommended action
   - Timeline & budget

3. CUSTOMER NOTIFICATION (For Impacted Buyers)
   - Acknowledge issue
   - Impact on their orders
   - Our mitigation plan
   - Timeline to resolution
   - Point of contact

Make templates ready-to-send with placeholders for specific details.`,
    generateHydratedPrompt: (vars) => {
      return `Generate professional communication templates for this situation:

SITUATION: ${vars.SITUATION_DESCRIPTION || 'Typhoon Gaemi delay on PO #45008921; rerouting via air cargo.'}
AUDIENCE: ${vars.AUDIENCE || 'Suppliers, Management, Customers'}
TONE: ${vars.TONE || 'Professional, urgent, executive'}
GOAL: ${vars.GOAL || 'Secure approval and confirm logistics dispatch'}

GENERATE:
1. EMAIL TEMPLATE (For Supplier / Logistics Forwarder)
2. ESCALATION BRIEF (For C-Suite / Management)
3. CUSTOMER NOTIFICATION (For Impacted Buyers)`;
    },
    generateSimulatedOutput: (vars, sym, rate) => {
      const cost = Math.round(42000 * rate);
      const averted = Math.round(1240000 * rate);
      return `### 📨 EXECUTIVE MULTI-AUDIENCE DISPATCH TEMPLATES

---

#### 1. SUPPLIER & CARRIER EXPEDITE DIRECTIVE (EDI / EMAIL)
**To:** logistics-ops@tsmc.com, freight-desk@lufthansa-cargo.com
**Subject:** [URGENT - ACTION REQUIRED] Expedited Air Cargo Release Authorization - PO #45008921 / TSMC Kaohsiung

Dear Partner Operations Team,

In light of the weather advisory and berthing moratorium associated with Typhoon Gaemi at the Port of Kaohsiung, our enterprise has initiated an autonomous mitigation protocol under SAP S/4HANA Workflow #SAP-WF-2026-9021.

**Required Action:**
1. Split purchase order **PO #45008921** into two schedule lines.
2. Release 4,000 units (Lot TSMC-7NM-WAF-01) immediately to Lufthansa Cargo Flight LH-8401 booked under Air Waybill #020-91827410.
3. Transmit EDI 855 Purchase Order Acknowledgment with updated pickup timestamp within 3 hours.

Remaining ocean freight volume will proceed on schedule upon port reopening. All incremental air-freight logistics billing is authorized directly under PO line item #00020.

Sincerely,
**Global Procurement Operations & Logistics Command**
SAP Enterprise System Automated Dispatch

---

#### 2. C-SUITE ESCALATION & BUDGET AUTHORIZATION BRIEF
**To:** Chief Supply Chain Officer, VP Operations, Finance Controller
**Subject:** [MITIGATION APPROVED] Containment of $1.24M Production Disruption - Munich GigaPlant

**Executive Summary:**
A Category 4 typhoon threatened an 8-day delivery slip for TSMC 7nm microconductors, risking an assembly halt at Munich Plant Line 1 on Day 4.

* **Exposure Averted:** **${sym}${averted.toLocaleString()}** in idle plant and breach costs.
* **Approved Investment:** **${sym}${cost.toLocaleString()}** in priority air charter split.
* **Net Protection ROI:** **+2,852%**
* **System Status:** Executed via SAP S/4HANA \`BAPI_PO_CHANGE\`. Factory buffer sustained with 0 downtime days.

No further executive intervention required.

---

#### 3. PROACTIVE CUSTOMER REASSURANCE ADVISORY
**To:** Key Account Procurement Directorate
**Subject:** Proactive Logistics Update: Continued Continuity for Delivery Commitments

Dear Valued Customer,

As part of our commitment to transparent supply chain excellence, we are writing to inform you regarding proactive logistics adjustments for your upcoming product deliveries.

While severe weather in the Taiwan Strait has caused widespread maritime delays across the technology sector, our automated predictive risk engine identified this vulnerability 12 days ahead of schedule. We have successfully secured priority international air freight capacity for all critical microconductors.

* **Impact on Your Final Delivery:** **ZERO DAYS DELAY.**
* **Delivery Schedule:** Remains strictly on-time as confirmed under original SLA terms.

Your dedicated logistics representative is available at client-ops@enterprise-sap.com for live tracking access.

Kind regards,
**Executive Customer Operations**`;
    }
  }
];
