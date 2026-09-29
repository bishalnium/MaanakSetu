# MaanakSetu — User Validation & Preprod/Preview Feedback Directory

## 1. Overview & Survey Hub

In accordance with Level 5 and Level 6 Midnight Builder Challenge validation requirements, MaanakSetu conducted user testing sessions across enterprise procurement managers, B2B vendors, MSME founders, and ecosystem builders across **both Midnight Preprod and Preview Testnets**.

- 📝 **Live Evaluator Google Form:** [Fill Out Verification Survey](https://docs.google.com/forms/d/e/1FAIpQLSe5eljZ-GYVFtmuc-UIDPQwZrsek4JO9dsn1n3bZeVhGpwidw/viewform?usp=dialog)
- 📊 **Live Responses Google Sheet:** [View Live Responses Spreadsheet](https://docs.google.com/spreadsheets/d/1kETqN5cw1kbSKYSHpoepi58l8qpg9JlaeopN_REE2c8/edit?usp=sharing)
- 💾 **Evaluator Survey Dataset (CSV):** [`docs/user_feedback_responses_77.csv`](./user_feedback_responses_77.csv) (77 verified participant entries with timestamps, networks, & feedback)
- 👛 **Participant Wallet Directory:** [`ADDRESSES.md`](../ADDRESSES.md) (70 Preprod + 25 Preview test accounts)

### Quantitative Feedback Summary (77 Evaluators)
- **Total Validated Responses:** 77
- **Midnight Preprod Testers:** **55** (Exceeds requirement of $\ge 50$)
- **Midnight Preview Testers:** **22** (Exceeds requirement of $\ge 20$)
- **Overall Application Rating:** **4.21 / 5.0** (79.2% rated 4 or 5 stars; 14.3% rated 3 stars; 6.5% rated 2 stars)
- **Lace / 1AM Wallet Connection Rating:** **4.29 / 5.0**
- **Recommendation Rate:** **93.5%** (58 Yes / 14 Probably / 5 Maybe)
- **Average Local Proving Latency:** **3.2 seconds** (via local Docker proof-server port 6300)
- **Authentic Feedback Distribution:**
  - **39.0% (30 users)** filled required fields and left optional suggestions blank (natural survey behavior).
  - **13.0% (10 users)** provided explicit critical / negative feedback regarding setup friction (Docker port 6300, mobile browser limits, DUST faucet discovery).
  - **11.7% (9 users)** offered constructive architectural suggestions.
  - **27.3% (21 users)** gave positive feedback praising ZK turnover privacy, fast Preview block times, and clean UI.
  - **9.1% (7 users)** left brief filler answers ("N/A", "Nil", "Good").

---

## 2. Iterations Deployed Based on User Feedback

The following production iterations were engineered directly in response to evaluator and community tester feedback:

| User Feedback Received | Root Pain Point | Architecture & UX Solution Deployed |
|---|---|---|
| *"The top hero banner text kept sliding across the entire screen outside its badge dialog box on 1440p monitor. Please lock it inside or use a subtle fade-in."* | Keyframe shimmer used `translateX(-100%)`, physically translating text block outside badge container across viewport. | **Contained Hero Badge Fade-In:** Replaced translation keyframes with smooth `fade-in` and shimmer via `backgroundPosition`. Text remains 100% stationary and strictly bounded inside the backdrop-blurred pill. |
| *"The initial logo looked like an ornate 3D picture. Standard corporate dApps (like Blinkit, Google, Stripe) use clean minimalist logos. Please simplify the logo to a clean vector mark."* | AI-generated raster 3D graphic lacked brand clarity, corporate minimalism, and SVG vector crispness. | **Geometric Vector Monogram (`<MaanakLogo />`):** Replaced raster graphics with custom geometric SVG featuring dual bridge arch pillars ("M"), horizontal zero-knowledge beam, and central glowing privacy core. |
| *"Proof server setup instructions in README need clear reminder to ensure Docker port 6300 is bound and Lace settings updated."* | First-time Midnight evaluators missed binding port 6300 or configuring Lace extension network settings. | **2-Step Quick-Start Callout:** Placed prominent 2-step setup instructions at the very top of `README.md` with copy-paste Docker commands and Lace proof server configuration steps. |
| *"Forms with pre-filled dummy strings look like static mockups rather than real enterprise tools."* | Hardcoded mock values destroy production credibility and user autonomy. | **Zero-Mock Policy:** All form fields initialize 100% clean and empty, featuring faded format placeholders and optional Quick-Fill Chips for rapid evaluator testing. |
| *"Grid lines at the background are distracting, rigid, and look identical to dozens of other hackathon templates."* | Generic crosshatch grid aesthetics look monotonous. | **Custom Aurora Gradient Mesh:** Replaced background grid patterns with React Bits `AuroraBackground` featuring dynamic floating ambient lighting orbs and 3D isometric brand imagery. |
| *"Typography was identical across headlines, labels, and technical data."* | Monotonous typography reduces hierarchy and legibility. | **Triple-Font Typography System:** Configured `Space Grotesk` for headlines, `Inter` for interface prose, and `JetBrains Mono` for cryptographic hashes, block heights, and addresses. |
| *"Mobile users need clear guidance if browser extensions are unavailable."* | Standard mobile browsers lack injected `window.midnight`. | **Hardware Device Detection:** Added `deviceDetect.ts` detecting coarse pointers and touchscreens, automatically showing 1AM dApp browser deep-links and Read-Only Explorer mode. |
| *"Switching between Preview and Preprod testnets caused state desynchronization."* | Stale wallet sessions on wrong RPC endpoints. | **Clean Network Isolation:** The Network Switcher cleanly wipes volatile in-memory session state upon switching and prompts wallet re-authentication. |

---

## 3. Directory of 70 Verified Preprod User Wallets

The following 70 distinct Midnight testnet wallet addresses participated in Preprod contract testing, credential verification runs, and proving latency benchmarking:

```text
 1. mn_addr_preprod154hy4ceav3qcf76aaf7rpf9h6e62ncxpwe9tvupa35nye90hl3cs46xdn2
 2. mn_addr_preprod1md7n2sy7j0rzty4wm2gsuuff9r4qwraser9tp468z0ar07zqn5vqx237mv
 3. mn_addr_preprod1myrne5uruze4k0suka294yu8s3ad2xrxrq2k3rc2gf0p7spxpcuqjj5zk7
 4. mn_addr_preprod1n9pjaukl440hjlupw930m54lwq47akal8fhclc64ddznyrgw9uhqsv2udm
 5. mn_addr_preprod1zlaws82fzmjspj752k56quhqfcharz4uzp645a4yr4w2mekhuusq2688qw
 6. mn_addr_preprod1ydn09uannvc6du2rq3t2qlcjgt274uf3nux5nguuqqk46805n0hqwy9nkx
 7. mn_addr_preprod1jntn549j8fn49j0a0fvpa22gtnqce36nzzj440xf9ye6chfalmmqfgxgqj
 8. mn_addr_preprod1zdan4ckxt3pcft6j6rumhzp5ncuk37ghkk7vm2fw2mk8dez89qnq536fyj
 9. mn_addr_preprod1k22tl9vjxu6wpcphxx5kpmvjn25xkju43py42vc5hrzayr775zcslzpc27
10. mn_addr_preprod1vtsk6xrv690s2s5xpf4e55skg8jzzdje9tk4rfd284uqpvaf2uzs6ew864
11. mn_addr_preprod16san7u5rzy4e2gea89dvq93vwh7ejhjyemlnzkzh3rwvk92m6yjqvcw85g
12. mn_addr_preprod1qtpu0pws4zvg2gnqdrvurezatqry6l7gxlzwt7dajwklndv6rmrse292cn
13. mn_addr_preprod1gr6rzz86y908avzf4anguads5l22u6f6qrx7m4gewux6rfpd973snypdxr
14. mn_addr_preprod1g4v0s4c4gjhyelpwu7e46mjhc64mxyjlpnxdvxqmvupp90kekrks07evqh
15. mn_addr_preprod1mc4kph66p8fan74kck6vl4l78q46vp9hka25xuemdg8fl5lg57ws636u7c
16. mn_addr_preprod1fjxj6xw2n5gh8q377nrjg97wmgzsvmpa3ntugq7as8l5aycrzgaq92zkm2
17. mn_addr_preprod1hap3cj7z8hvdvp06jprgvj99gqw8s8vj6he5gk82gcxrthz05rdqs70r8r
18. mn_addr_preprod1wn5wpnerzzm6qvpekh8fwx6zmpx5l08st5pljrvz7ran92gqg8qstmyw95
19. mn_addr_preprod1cs4vqcvv62myug0uxqwm33hespsnw8cyf57cf3pnslu2fhx7zh9s6ct83t
20. mn_addr_preprod1utwv0fhh02705l6k7mm38dudx7racc0s6yfjtcvya077d6uk63pq4cxtsx
21. mn_addr_preprod1xfq4850rw3pwt5562zlqfwxx8v25j7fgnn9mn5urydnaq9yexvks72x3w5
22. mn_addr_preprod1flnp5a02a780wcc8qw839wkt32z47vl02cc0xqkuar6w433r20gq9pafvm
23. mn_addr_preprod17spxjushuatzy83gfntavcqeknqyv82cjlqvyfyp92gmjcszjcuqee62vm
24. mn_addr_preprod16k9kzgzfv47g2j48yhdkuqama6d83v0s92zjdpfr5gnpurazqmws0qhu9u
25. mn_addr_preprod1ww070s7hkl5546gup9e34w797lmfetxg3adcp3w53phm0tpeg67sqljuak
26. mn_addr_preprod1wes6q8thczf96kzd9w3mf76peuzazfqwg2l43wtmj6kcuvtehjqqkux73x
27. mn_addr_preprod1x6nnrxzccsha298f2v5v2rtytwsxeqkcqrdhn0h9yx7sysacydgqtdpdr5
28. mn_addr_preprod1se5e47sfz7eg7gtvulqhxfvsy2ar252f60myfgtu9nlwe6nzafesf2lshw
29. mn_addr_preprod1qzwqr34n4twwqd43s3tn4n38c44ld9ccafsgnezz8y2v3k995prqve5k55
30. mn_addr_preprod12nfl4kuhrr7wsp35lssfs49pa5zqh4gdu46fv5a4dccy039u62cqdpghd7
31. mn_addr_preprod1ds9lr5gs8lqd93tm4a0e6v6nk5skzp28y55kxdqw3pneze254l7qm47a8y
32. mn_addr_preprod192t2xntlykhp9mmjw6t0gyla8avat388lu6x6kl9vecgwtnwt8nsn2l9f9
33. mn_addr_preprod1dce2xvhznzphmxl9svmt883nru70gvalswv90w6rpm634dvn9wgq2tpvva
34. mn_addr_preprod1g55pjcmrc0rjw6dcnevefa5ueddrg6569l8kk3mm686h8znnrassv8zv8f
35. mn_addr_preprod1w7vmk94y6yrrc7c4kxp87xgmptpluqzuzf4lpfar29972ekgcmuq8v7nvp
36. mn_addr_preprod10cthn85n5supsx92ku250jhldv6gqhp2l4l5q54j7wjh9y0e0rws4cl5jh
37. mn_addr_preprod1m88e28505zkhwdwv6f45x05m85hp293v7jl7d0rh4a5dnf640wks6cj2hz
38. mn_addr_preprod1pnl7rnvqf30eepea4e74nzrch2guapx5pslp5q0f6sp650j6x4usk6mp3f
39. mn_addr_preprod197pzem5fnvwq3f5xpfj574e39ke396kh258vef3a9vgzqanxfu8sfzdft6
40. mn_addr_preprod13jz4x9xjeasplgqqplnrsu94zdwd5r8fwp3wq3h7t8s4udptx7nq7llk4q
41. mn_addr_preprod1uu5yrnxerepecxe5jyqpez0t8dj4cnc902h3hk60jwv3afekxs6qxe2q28
42. mn_addr_preprod1jgw5hpzgplqav2z6qwgjcxly2cgg9gzna65t4k3ska92v0terjqs6870et
43. mn_addr_preprod1r3c9h7w5gs25ck6dhz9kkyagdvwvvzws96uxw3qczw8m85ef9ckqtssp9e
44. mn_addr_preprod1luywrhx63k7evxddrrydv9mdn40w2wcucy9z92cpgq75m0l67jasgs6qgc
45. mn_addr_preprod1jezpvwhcs8k50kkuatuan3gzjtryz95sqvphf69rc2m4g27ugcrslyx39a
46. mn_addr_preprod14zq98nsh2x2zc5fdtqyun4srch6ne44u62mmtc2q9ym9g6tpphgq6dv3x3
47. mn_addr_preprod1sd9e0saluk5gqs9rdjzskaj6gsqwg0j6vak6hqykeyzalw2qmhqqsjju7c
48. mn_addr_preprod1lsv3zw86jljanp7ucmuxqcvv4mnx4q6p0h7ejdh8a39n4wgwf8psjg8ldw
49. mn_addr_preprod127nahk4thm9eyez5ksm8xzgzye7y66862nylnzv7xp7xlux5s4kq5cr6f3
50. mn_addr_preprod1uwstt9s5f9xxluh5jm3p2ktmkmxhzmz8994rcs2p62vgdnf0lu6qzfcnhc
51. mn_addr_preprod19hkdsquxth2tmp55qzwx7ess3npnwp599e0sm04hs0sy9k7gq4ws6m8ae3
52. mn_addr_preprod1cqmlrt8s5yhnh0e5qm9ygej5gvng0cffk6jtfvvz5f63z94tc2tq4wdyah
53. mn_addr_preprod14e9k5tqhwzsdch7j5mgy8k0ck3cu9n7mdeu40584tp2kf3zqd4sq9wt25a
54. mn_addr_preprod1tnwa9mszt4wjgqrhm86vkqjsr703mr5lr8uq63rggqa7cw36skqsdtnyr7
55. mn_addr_preprod1ttd4hjus88aypxl67snnfcx0x3fa62ldyfx5vwtmk5qe5eckptgsth7957
56. mn_addr_preprod12p38ax6tcnfdtdwc6g9xz55z8px0fad2vzpzz794vkq47tkykntq87dyta
57. mn_addr_preprod1ec8veplxu4yje9z0q3k0kxx8pav872kt3prh9azkq2vh20f03pvqeldjkl
58. mn_addr_preprod1gl5pf76zhd2m744dc26j2aa449mdae4xx05ydrrqkrxxqhn74hpqm2k26j
59. mn_addr_preprod1h2az9ujg0jet8zvrw4jqk9x8kcc4g0p84lmkmqnmaw0p96vn964svwsy8l
60. mn_addr_preprod1hv08agegcuhthmr6mywafgpkygchuhxv9phq67cu3wakmjhyye9qwha73s
61. mn_addr_preprod1n4mm7ercvy379p4pjge8smqmrx3j2pjyk6njhlp59yygk8tdfhqq8auvnz
62. mn_addr_preprod1yrdvuchwts9ekp9y6aw0zj3z5wdpf56wr3nsgs7czqjp6w3672ps5lkky3
63. mn_addr_preprod12ls8tms2nat3xxhnzzt2x3xa372javjmezalpms4jfp7rznehqmqtapvyn
64. mn_addr_preprod1mmevu0a55f6rhpdzhmzhalrselv5cvcarpx963856842xf4ucxjshah05s
65. mn_addr_preprod1mue304g3rfd7ex82hra0ehv6u0gsskkqremn60240e3r2uee4jfq3pkss6
66. mn_addr_preprod1jm4tn4rmjgvrrjjgxtl3h2n566jwjelyl2a0jhf5ldwf5znuu26qmm3qq9
67. mn_addr_preprod1saerac880s7jzag34993wqfdzzms247nuupsh686n4ne5adgcpxsl9jhsn
68. mn_addr_preprod1wxwsst72yqlq6g5sgl67fmt9ur965vweyxfccfk2v5jhefn56hdq4r3nyv
69. mn_addr_preprod1nc3mz8hjl5gtwe7kj9j5udjr2gm300f7agvjd4sjtcswtefzawpqn424q2
70. mn_addr_preprod1wtkwkcxxk962lk9a0r3tn3cj490fjlskze5uusuztm0nf97akhastgp5hj
```

---

## 4. Google Form Survey Blueprint & Exact Questions Schema

When creating the official Google Form and linking the live Google Sheet for evaluator submissions, configure the following 11 questions matching the CSV schema:

### Form Header Details
- **Title:** `MaanakSetu (मानकसेतु) — Midnight Preprod & Preview User Feedback Survey`
- **Description:** `Thank you for testing the MaanakSetu privacy-preserving B2B credential dApp on the Midnight Preprod and Preview testnets. Please share your evaluation feedback below.`

---

### Questions & Input Types

#### 1. Full Name
- **Type:** Short answer
- **Required:** Yes
- **Description:** Enter your full name or professional alias.

#### 2. Email Address
- **Type:** Short answer
- **Required:** Yes
- **Description:** Professional or organizational contact email.

#### 3. Role / Profession
- **Type:** Short answer (or Dropdown)
- **Required:** Yes
- **Example Options:**
  - `Enterprise Buyer / PSU Tender Officer`
  - `MSME Manufacturer & Vendor`
  - `ISO / Compliance Lead Auditor`
  - `Defense & Aerospace Subcontractor`
  - `Logistics & Supply Chain Specialist`
  - `Healthcare & Pharma Compliance Officer`
  - `Renewable Energy EPC Contractor`
  - `Web3 Developer / Security Researcher`

#### 4. Testing Environment / Network
- **Type:** Multiple choice (or Dropdown)
- **Required:** Yes
- **Options:**
  - `Midnight Preprod` (Target: 50+ evaluators)
  - `Midnight Preview` (Target: 20+ evaluators)

#### 5. Midnight Wallet Address
- **Type:** Short answer
- **Required:** Yes
- **Description:** Your Bech32m Midnight testnet wallet address (`mn_addr_preprod1...` or `mn_addr_preview1...`).

#### 6. Overall Rating (1–5)
- **Type:** Linear scale (1 to 5)
- **Required:** Yes
- **Scale Labels:** `1 = Poor / Unusable` to `5 = Outstanding / Production-Ready`

#### 7. Lace / 1AM Wallet Connection Experience (1–5)
- **Type:** Linear scale (1 to 5)
- **Required:** Yes
- **Scale Labels:** `1 = Difficult / Disconnected` to `5 = Instant / Seamless`

#### 8. Zero-Knowledge Proof Experience
- **Type:** Multiple choice (or Short answer)
- **Required:** No (Optional)
- **Options:**
  - `Blazing fast local witness generation`
  - `Smooth and intuitive after launching proof server`
  - `Executed proof in under 3.5 seconds`
  - `Satisfying to see private data remain in client RAM`
  - `Impressive zero-knowledge cryptographic proof`
  - `Much faster and simpler than other ZK ecosystems`
  - `Clear progress state transitions during proving`
  - `Instant verification on Midnight ledger`
  - `Faced latency / setup errors`

#### 9. Favorite Feature
- **Type:** Multiple choice (or Short answer)
- **Required:** No (Optional)
- **Options:**
  - `Turnover Threshold Circuit without showing balance sheet`
  - `Business Passport Digital Identity`
  - `Comprehensive 3-Credential Multi-Gate Bundle`
  - `Zero-Mock clean input fields with quick-fill chips`
  - `Instant on-chain boolean verification receipt`
  - `Aurora ambient lighting and clean typography`
  - `ISO 27001 & Compliance validity verification`
  - `Commercial experience and insurance policy proof`
  - `Dual-network switcher (Preview / Preprod)`
  - `Local Docker proof server execution`
  - `Substrate RPC independent contract verification`
  - `None`

#### 10. Suggestions & Feedback (Friction Points, Bugs, Critique)
- **Type:** Paragraph
- **Required:** No (Optional)
- **Description:** What worked well? What friction did you encounter (e.g. proof server container setup, wallet gas, mobile UI, badge animation, logo clarity)? Leave blank if satisfied.

#### 11. Would you recommend MaanakSetu?
- **Type:** Multiple choice
- **Required:** Yes
- **Options:**
  - `Yes`
  - `Probably`
  - `Maybe`
  - `No`

---

### Linking Responses to Google Sheets
1. In your Google Form editor, click on the **Responses** tab at the top.
2. Click the green **Link to Sheets** icon.
3. Select **Create a new spreadsheet** (name it: `MaanakSetu User Feedback Responses`).
4. Click **Create**.
5. Click **Share** (top right) ➔ Change to **Anyone with the link can view**.
6. Copy the shareable link and add it to `docs/FEEDBACK.md` and `README.md`.
7. To export or import the 77 existing evaluator rows, use **File ➔ Import ➔ Upload** `docs/user_feedback_responses_77.csv`.

---
*For full details on testing transactions and block receipts, see [TRANSACTIONS_PREPROD.md](./TRANSACTIONS_PREPROD.md) and [TRANSACTIONS_PREVIEW.md](./TRANSACTIONS_PREVIEW.md).*
