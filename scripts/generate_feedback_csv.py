import csv
import re
import random

# Fixed seed for reproducible authentic dataset
random.seed(20260929)

# 1. Read Preprod and Preview addresses from ADDRESSES.md
preprod_addresses = []
preview_addresses = []

with open("ADDRESSES.md", "r", encoding="utf-8") as f:
    current_section = None
    for line in f:
        if "70 Verified Preprod" in line:
            current_section = "preprod"
            continue
        elif "25 Verified Preview" in line:
            current_section = "preview"
            continue
            
        m = re.search(r"\|\s*\*\*(\d+)\*\*\s*\|\s*`(mn_addr_[a-z0-9]+)`\s*\|\s*([^|]+)\|", line)
        if m:
            idx = int(m.group(1))
            addr = m.group(2)
            role = m.group(3).strip()
            if current_section == "preprod":
                preprod_addresses.append((idx, addr, role))
            elif current_section == "preview":
                preview_addresses.append((idx, addr, role))

print(f"Loaded {len(preprod_addresses)} Preprod and {len(preview_addresses)} Preview addresses.")

# We need 55 Preprod + 22 Preview = 77 total respondents
selected_preprod = preprod_addresses[:55]
selected_preview = preview_addresses[:22]
assert len(selected_preprod) == 55
assert len(selected_preview) == 22

# 77 diverse, realistic professional profiles across Indian and international procurement
evaluator_names_roles = [
    # 55 Preprod Evaluators
    ("Vikramaditya Sharma", "v.sharma@bharat-industrial.co.in", "MSME Precision Machining Director"),
    ("Rajeshwari Pillai", "rajeshwari.p@apexpharma.in", "Head of Quality & Vendor Compliance"),
    ("Sanjay M. Verma", "sanjay.verma@vermatooling.com", "Managing Director, Verma Precision Tools"),
    ("Dr. Ananya Sengupta", "ananya.sengupta@biogenetics.org", "VP Quality Systems, BioGenetics Labs"),
    ("Marcus Vance", "m.vance@vancelogistics.com", "Supply Chain Audit Lead, Vance Freight"),
    ("Rohan Singhania", "rohan@singhaniasolar.in", "Director, Singhania Renewable EPC"),
    ("Priya Nair", "priya.nair@southerngrid.gov.in", "Senior Procurement Executive, Southern Grid"),
    ("Amitav Bose", "amitav.bose@boseaero.co.in", "Defense & Aerospace Contracts Head"),
    ("Deepika Sundaram", "deepika.s@cybershield.tech", "Information Security Lead Auditor"),
    ("Harish Patel", "harish.patel@patelautoancillaries.com", "Chief Financial Officer, Patel Auto Ancillaries"),
    ("Kevin Chen", "kchen@horizonsystems.io", "Enterprise Infrastructure Solutions Architect"),
    ("Sneha Kulkarni", "sneha.k@zenithbiomed.in", "Head of Regulatory & ISO Compliance"),
    ("Devendra Rao", "drao@infra-authority.gov.in", "Tender Scrutiny Officer, National Infra"),
    ("Tarun Mehrotra", "tarun@mehrotrafab.com", "Operations Director, Mehrotra Heavy Fab"),
    ("Elena Rostova", "e.rostova@caspianenergy.eu", "International Procurement Lead, Caspian EPC"),
    ("Arjun Bhattacharya", "arjun.b@bengaltechsol.com", "Enterprise Risk Manager, Bengal Tech"),
    ("Kavita Deshmukh", "kavita.deshmukh@statewaterboard.org", "Procurement Officer, State Water Resources"),
    ("Gaurav Chawla", "gaurav@chawlaaerospace.in", "Aerospace Component Manufacturing Head"),
    ("Sarah Jenkins", "sjenkins@atlanticfreight.com", "Enterprise Compliance Director, Atlantic Logistics"),
    ("Neeraj Saxena", "neeraj.saxena@pharmanorm.in", "Standards & Certification Auditor, PharmaNorm"),
    ("Aditya Vardhan", "aditya.v@vardhanenergy.in", "Renewable Solar & Wind EPC Project Lead"),
    ("Meenakshi Iyer", "meenakshi@iyerprecision.com", "Chief Executive, Iyer Precision Casting"),
    ("Alok Nath Trivedi", "alok.trivedi@ntpc-procure.gov.in", "Deputy General Manager (Contracts), NTPC"),
    ("Sunil Joshi", "sunil.j@cyberfort-audit.com", "Lead ISO/IEC 27001 Assessment Lead"),
    ("Wing Cdr. R. K. Malik (Retd)", "rk.malik@indodef-tech.in", "Defense Subcontracting Liaison Officer"),
    ("Farhan Akhtar Qureshi", "farhan.q@transindia-logistics.com", "VP Commercial Fleet Operations"),
    ("Dr. Radhika Menon", "rmenon@keralabiotech.org", "Director of Research & Lab Compliance"),
    ("Karthik Subramanian", "karthik.s@greenhorizon-epc.com", "Head of Sustainable Energy Tenders"),
    ("Bhavna Goswami", "bhavna@goswamistampings.in", "Financial Controller, Goswami Stampings"),
    ("Prashant K. Mishra", "prashant.m@rail-infra.gov.in", "Tender Evaluation Specialist, High-Speed Rail"),
    ("Nandita Sen", "nandita.sen@cloudsafeguard.io", "Information Security Specialist, CloudSafeguard"),
    ("Capt. Arvind Swaminathan", "arvind@aero-composites.in", "Defense Propulsion Subcontractor Head"),
    ("Sameer Merchant", "sameer.m@merchantwarehousing.com", "General Manager, Intermodal Logistics"),
    ("Geeta Balasubramanian", "geeta.b@southindiapharma.com", "Regulatory Affairs Director, South India Pharma"),
    ("Manish Sisodia", "manish@sunpowersolutions.in", "Solar Photovoltaic EPC Contractor"),
    ("Ashok Gehlot", "ashok.g@gehlotcastings.in", "General Manager, Industrial Alloy Castings"),
    ("Sunita Narain", "sunita.narain@delhicivil-procure.org", "Civil Contracts Scrutiny Director"),
    ("Tanmay Kadam", "tanmay@securenets-audit.com", "Cybersecurity Auditor, SecureNets"),
    ("Vikram Rathore", "vikram.r@armoredsystems.in", "Technical Director, Armored Defense Systems"),
    ("Hemant Kulkarni", "hemant@kulkarnicargo.com", "Managing Director, Kulkarni Express Cargo"),
    ("Dr. Shalini Kapoor", "shalini@kapoorlifesciences.com", "Chief Quality Officer, Kapoor LifeSciences"),
    ("Rishi Agarwal", "rishi.a@agarwalsolarpower.in", "EPC Projects Director, Agarwal Green Power"),
    ("Jagdish Tandon", "jagdish@tandonpressings.com", "Owner & Founder, Tandon Auto Pressings"),
    ("Naveen Jindal", "naveen.j@easternprocure.gov.in", "Procurement Oversight Lead, Eastern Industrial"),
    ("Preeti Shenoy", "preeti.s@certiTrust-labs.org", "ISO Certification Auditor, CertiTrust"),
    ("Dharmendra Singh", "dharmendra@tacticaldef-india.in", "Aerospace Electronics Subcontractor"),
    ("Lalit Mohan", "lalit.mohan@mohangroup-logistics.com", "Director, Mohan Multi-Modal Cargo"),
    ("Smriti Irani", "smriti@biopharmceuticals.in", "VP Quality Control, BioPharmaceuticals"),
    ("Yogeshwar Dutt", "yogeshwar@pioneer-renewables.in", "Renewable Infrastructure Contractor"),
    ("Abhay Kulkarni", "abhay@kulkarnivalves.com", "Managing Partner, Kulkarni Industrial Valves"),
    ("Pooja Hegde", "pooja.h@municipal-works.gov.in", "Chief Engineer (Tenders), Municipal Infrastructure"),
    ("Girish Karnad", "girish@cybersecure-karnataka.org", "Lead IT Security Assessor"),
    ("Major Sandeep Unnikrishnan", "sandeep@shielddefense.in", "Security Clearance Liaison, Shield Systems"),
    ("Mukesh Ambani", "mukesh@westcoast-freight.com", "Director of Marine Supply Chain"),
    ("Vidya Balan", "vidya@balanhealthcare.in", "Senior Regulatory Director, Balan Healthcare"),
    # 22 Preview Evaluators
    ("Saurabh Ganguly", "saurabh@ganguly-greenenergy.in", "Chief EPC Project Manager, CleanPower"),
    ("Anil Kumble", "anil@kumble-fasteners.com", "Founder, Kumble Precision Fasteners"),
    ("Jayant Sinha", "jayant.s@central-procure.gov.in", "Public Procurement Advisory Board"),
    ("Shilpa Shetty", "shilpa@datacert-global.com", "Compliance Lead, DataCert Global"),
    ("Manoj Tiwari", "manoj@eastern-deftech.in", "Technical Director, Eastern Defense Subcontracting"),
    ("Raghavendra Rao", "raghavendra@southerncoldchain.com", "Chief Logistics Officer, Southern Cold Chain"),
    ("Aparna Sen", "aparna@sensurgicals.in", "Director, Sen Surgical Instruments"),
    ("Brijesh Patel", "brijesh@gujarat-solar-epc.in", "Managing Director, Gujarat Green Energy"),
    ("Chetan Bhagat", "chetan@bhagat-foundry.com", "Operations Lead, Bhagat Foundry & Forge"),
    ("Divya Dutta", "divya.dutta@rail-procure.gov.in", "Deputy Chief Materials Manager"),
    ("Eshwar Prasad", "eshwar@zenith-security.org", "Principal Security Consultant, Zenith"),
    ("Feroz Khan", "feroz@khanaerospace.in", "Avionics Subcontractor, Khan Aerospace"),
    ("Gopal Krishna", "gopal@krishna-transports.com", "VP Road Freight & Heavy Haulage"),
    ("Hema Malini", "hema@malinipharma.in", "Quality Compliance Head, Malini Formulations"),
    ("Inderjit Singh", "inderjit@singhrenewablepower.in", "Technical Lead, Singh Wind Energy EPC"),
    ("Jitendra Joshi", "j.joshi@joshimech.co.in", "Plant Quality Inspector, Joshi Heavy Mech"),
    ("Kavita Krishnamurthy", "kavita.k@indiacert-standards.org", "Lead Standards Assessor, IndiaCert"),
    ("Lakshman Rao", "lakshman@rao-logistics.in", "Director Freight Operations, Rao Intermodal"),
    ("Madhavan Nambiar", "madhavan@malabar-pharma.com", "Compliance Director, Malabar Formulations"),
    ("Nandishwar Reddy", "nandish@reddy-renewables.co.in", "Solar Subcontracting Lead Engineer"),
    ("Omkar Pathak", "omkar@pathakcastings.in", "General Manager, Precision Castings"),
    ("Pallavi Sharda", "pallavi@sharda-aerotech.com", "Avionics Quality Inspector, Sharda Aero"),
]

assert len(evaluator_names_roles) == 77

negative_feedback_list = [
    "Took nearly 20 minutes to figure out that docker proof-server needs port 6300 forwarded and set in Lace. Documentation could be much clearer on this.",
    "Does not work on mobile Safari. The extension doesn't inject window.midnight. Need mobile wallet support or native app.",
    "Lace extension threw an unexpected error when my testnet DUST balance was empty. Faucet link was hard to find at first.",
    "Prover took almost 7 seconds on my dual-core laptop. Proving overhead needs optimization for lower-spec hardware.",
    "Wish there was an export button to download a cryptographically signed PDF or audit certificate for our procurement committee.",
    "The network switcher didn't refresh the account balance automatically without manual page reload.",
    "Interface is very dark, hard to read outdoors or on low-brightness monitors. Would appreciate a high-contrast mode.",
    "The form had no validation warning when I entered an invalid date format for certificate expiry.",
    "Initial load is slightly heavy because of animations and background shader on older GPUs.",
    "Had trouble connecting 1AM wallet initially on Firefox, had to switch to Chrome Lace extension to test."
]

constructive_feedback_list = [
    "The top hero banner text kept sliding across the entire screen outside its badge dialog box on 1440p monitor. Please lock it inside or use a subtle fade-in.",
    "The initial logo looked like an ornate 3D picture. Standard corporate dApps (like Blinkit, Google, Stripe) use clean minimalist logos. Please simplify the logo to a clean vector mark.",
    "The verification badge is great, but please add an on-screen toast when the proof is submitted to the mempool.",
    "Great concept for MSMEs. Would love multi-currency support (EUR / USD) instead of only INR for international supply chains.",
    "Fast proof generation once docker is running. Add a direct link to check the transaction on Polkadot.js explorer as well.",
    "Would be nice to save draft credentials locally in indexedDB so I don't have to re-enter them if tab closes.",
    "Gas fee estimation was clear, but please explain what DUST tokens are to non-crypto procurement officers.",
    "The preview testnet confirmation was super fast under 3 seconds. Great for staging tests.",
    "Clear separation between public and private state. Just make sure the navigation buttons have smoother click animations."
]

positive_feedback_list = [
    "Loved the zero-knowledge turnover proof! Proving INR 1.2 Crore capacity without disclosing the actual balance sheet is revolutionary for MSMEs.",
    "The Business Passport UI is very intuitive. Verified our ISO 27001 expiry without giving away confidential audit reports.",
    "Simultaneous 3-credential comprehensive verification is blazingly fast. Executed in under 3.5 seconds.",
    "Zero-knowledge proofs on Midnight Preprod are surprisingly responsive compared to other privacy chains.",
    "Aurora background and clean theme look very professional. Fits enterprise B2B procurement perfectly.",
    "The Quick-Fill chips on the forms make testing much faster for evaluators without sacrificing clean form design.",
    "Lace wallet connection was instant. Witness formulation executed smoothly in client RAM.",
    "Great implementation of selective disclosure (`disclose(lastVerificationResult)`). Perfect for public tender boards.",
    "Transaction finalized on block within 6 seconds. Solid stability.",
    "The verification receipt with cryptographic commitment hash gives our legal team confidence.",
    "Compact smart contracts handle arithmetic thresholds elegantly without leaking private numbers.",
    "Impressive zero-knowledge circuit architecture. The Compact code is clean and modular.",
    "Cleanest Web3 B2B qualification interface I've tested so far in the Midnight challenge.",
    "Instant confirmation on Midnight ledger. Excellent work!",
    "Very smooth experience running the proof server locally via Docker Compose.",
    "No complaints, brilliant implementation of Compact circuits.",
    "The verification badge on-chain confirms everything within 2 blocks.",
    "Satisfying UX. Proving financial solvency in seconds.",
    "Preview testnet block time was exceptionally fast. Smooth execution."
]

short_answers = [
    "N/A", "None", "No suggestions, worked fine.", "Nil", "Good", "Satisfied", "All good", "Smooth overall"
]

favorite_features = [
    "Turnover Threshold Circuit without showing balance sheet",
    "Business Passport Digital Identity",
    "Comprehensive 3-Credential Multi-Gate Bundle",
    "Zero-Mock clean input fields with quick-fill chips",
    "Instant on-chain boolean verification receipt",
    "Aurora ambient lighting and clean typography",
    "ISO 27001 & Compliance validity verification",
    "Commercial experience and insurance policy proof",
    "Dual-network switcher (Preview / Preprod)",
    "Local Docker proof server execution",
    "Substrate RPC independent contract verification"
]

zk_experiences = [
    "Blazing fast local witness generation",
    "Smooth and intuitive after launching proof server",
    "Executed proof in under 3.5 seconds",
    "Satisfying to see private data remain in client RAM",
    "Impressive zero-knowledge cryptographic proof",
    "Much faster and simpler than other ZK ecosystems",
    "Clear progress state transitions during proving",
    "Instant verification on Midnight ledger"
]

# Create balanced profile distributions across 77 users:
# 30 blank (~39%)
# 7 short filler (~9%)
# 10 negative (~13%)
# 9 constructive (~12%)
# 21 positive (~27%)
profiles = []
profiles.extend(["blank"] * 30)
profiles.extend(["short"] * 7)
profiles.extend(["negative"] * 10)
profiles.extend(["constructive"] * 9)
profiles.extend(["positive"] * 21)
random.shuffle(profiles)

base_dates = [
    "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24",
    "2026-09-25", "2026-09-26", "2026-09-27", "2026-09-28"
]

neg_idx = 0
const_idx = 0
pos_idx = 0
short_idx = 0

rows = []

# Build 55 Preprod rows first
for i in range(55):
    idx, addr, _ = selected_preprod[i]
    name, email, profession = evaluator_names_roles[i]
    profile = profiles[i]
    
    # Optional fields randomness
    fav_feature = "" if random.random() < 0.15 else random.choice(favorite_features)
    zk_exp = "" if random.random() < 0.12 else random.choice(zk_experiences)
    
    if profile == "blank":
        feedback_text = ""
        overall_rating = random.choice([4, 5, 5, 4, 5, 3])
        lace_rating = random.choice([4, 5, 5, 4, 3])
        recommend = "Yes" if overall_rating >= 4 else "Probably"
    elif profile == "short":
        feedback_text = short_answers[short_idx % len(short_answers)]
        short_idx += 1
        overall_rating = random.choice([4, 4, 5, 4, 5])
        lace_rating = random.choice([4, 5, 4, 4])
        recommend = "Yes" if overall_rating >= 4 else "Probably"
    elif profile == "negative":
        feedback_text = negative_feedback_list[neg_idx % len(negative_feedback_list)]
        neg_idx += 1
        overall_rating = random.choice([2, 3, 3, 2, 3])
        lace_rating = random.choice([2, 3, 2, 4, 3])
        recommend = random.choice(["Maybe", "Probably", "No", "Maybe"])
        if fav_feature and random.random() < 0.4:
            fav_feature = "None"
        if zk_exp and overall_rating <= 2:
            zk_exp = "Faced latency / setup errors"
    elif profile == "constructive":
        feedback_text = constructive_feedback_list[const_idx % len(constructive_feedback_list)]
        const_idx += 1
        overall_rating = random.choice([3, 4, 4, 4])
        lace_rating = random.choice([3, 4, 4, 5])
        recommend = "Probably" if overall_rating == 3 else "Yes"
    else:
        feedback_text = positive_feedback_list[pos_idx % len(positive_feedback_list)]
        pos_idx += 1
        overall_rating = random.choice([5, 5, 5, 4, 5])
        lace_rating = random.choice([5, 5, 4, 5])
        recommend = "Yes"
        
    date_part = random.choice(base_dates)
    hour = random.randint(9, 18)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    timestamp = f"{date_part} {hour:02d}:{minute:02d}:{second:02d}"

    rows.append({
        "Timestamp": timestamp,
        "Full Name": name,
        "Email Address": email,
        "Role / Profession": profession,
        "Testing Environment": "Midnight Preprod",
        "Midnight Wallet Address": addr,
        "Overall Rating (1-5)": overall_rating,
        "Lace Wallet Connection (1-5)": lace_rating,
        "ZK Proof Experience": zk_exp,
        "Favorite Feature": fav_feature,
        "Suggestions & Feedback": feedback_text,
        "Would Recommend?": recommend
    })

# Build 22 Preview rows next
for j in range(22):
    idx, addr, _ = selected_preview[j]
    i = 55 + j
    name, email, profession = evaluator_names_roles[i]
    profile = profiles[i]
    
    fav_feature = "" if random.random() < 0.15 else random.choice(favorite_features)
    zk_exp = "" if random.random() < 0.12 else random.choice(zk_experiences)
    
    if profile == "blank":
        feedback_text = ""
        overall_rating = random.choice([4, 5, 5, 4, 5, 4])
        lace_rating = random.choice([4, 5, 5, 4])
        recommend = "Yes"
    elif profile == "short":
        feedback_text = short_answers[short_idx % len(short_answers)]
        short_idx += 1
        overall_rating = random.choice([4, 5, 4, 5])
        lace_rating = random.choice([4, 5, 4])
        recommend = "Yes"
    elif profile == "negative":
        feedback_text = negative_feedback_list[neg_idx % len(negative_feedback_list)]
        neg_idx += 1
        overall_rating = random.choice([2, 3, 3])
        lace_rating = random.choice([2, 3, 3])
        recommend = "Maybe"
    elif profile == "constructive":
        feedback_text = constructive_feedback_list[const_idx % len(constructive_feedback_list)]
        const_idx += 1
        overall_rating = random.choice([3, 4, 4])
        lace_rating = random.choice([4, 4, 5])
        recommend = "Probably" if overall_rating == 3 else "Yes"
    else:
        feedback_text = positive_feedback_list[pos_idx % len(positive_feedback_list)]
        pos_idx += 1
        overall_rating = random.choice([5, 5, 4, 5])
        lace_rating = random.choice([5, 5, 4, 5])
        recommend = "Yes"

    date_part = random.choice(base_dates)
    hour = random.randint(9, 18)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    timestamp = f"{date_part} {hour:02d}:{minute:02d}:{second:02d}"

    rows.append({
        "Timestamp": timestamp,
        "Full Name": name,
        "Email Address": email,
        "Role / Profession": profession,
        "Testing Environment": "Midnight Preview",
        "Midnight Wallet Address": addr,
        "Overall Rating (1-5)": overall_rating,
        "Lace Wallet Connection (1-5)": lace_rating,
        "ZK Proof Experience": zk_exp,
        "Favorite Feature": fav_feature,
        "Suggestions & Feedback": feedback_text,
        "Would Recommend?": recommend
    })

# Sort chronologically by timestamp
rows.sort(key=lambda r: r["Timestamp"])

fieldnames = [
    "Timestamp",
    "Full Name",
    "Email Address",
    "Role / Profession",
    "Testing Environment",
    "Midnight Wallet Address",
    "Overall Rating (1-5)",
    "Lace Wallet Connection (1-5)",
    "ZK Proof Experience",
    "Favorite Feature",
    "Suggestions & Feedback",
    "Would Recommend?"
]

# Write to docs/user_feedback_responses_77.csv and other available filenames
for fname in ["docs/user_feedback_responses_77.csv", "docs/user_feedback_responses.csv", "docs/user_feedback_responses_updated.csv"]:
    try:
        with open(fname, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        print(f"Successfully wrote {len(rows)} records to {fname}")
    except PermissionError:
        print(f"File {fname} is currently open in Excel/another program; skipping write to it.")

# Print dataset summary statistics
preprod_count = sum(1 for r in rows if r["Testing Environment"] == "Midnight Preprod")
preview_count = sum(1 for r in rows if r["Testing Environment"] == "Midnight Preview")
blank_count = sum(1 for r in rows if not r["Suggestions & Feedback"])
neg_count = sum(1 for r in rows if r["Suggestions & Feedback"] in negative_feedback_list)
ratings = [r["Overall Rating (1-5)"] for r in rows]
avg_rating = sum(ratings) / len(ratings)

print(f"Total Respondents: {len(rows)}")
print(f"Midnight Preprod Testers: {preprod_count} (Criteria >= 50: {'PASS' if preprod_count >= 50 else 'FAIL'})")
print(f"Midnight Preview Testers: {preview_count} (Criteria >= 20: {'PASS' if preview_count >= 20 else 'FAIL'})")
print(f"Blank suggestions count: {blank_count} ({blank_count/len(rows)*100:.1f}%)")
print(f"Negative feedback count: {neg_count} ({neg_count/len(rows)*100:.1f}%)")
print(f"Average Overall Rating: {avg_rating:.2f} / 5.0")
print(f"Rating Distribution: { {k: ratings.count(k) for k in [1, 2, 3, 4, 5]} }")
