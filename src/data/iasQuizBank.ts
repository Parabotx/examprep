import type { QuizQuestion } from "../types";

interface QuestionSeed {
  question: string;
  scenario: string;
  answer: string;
  distractors: [string, string, string];
  explanation: string;
}

function buildBank(prefix: string, seeds: QuestionSeed[]): QuizQuestion[] {
  return seeds.flatMap((seed, index) => {
    const baseOptions = [seed.answer, ...seed.distractors];
    const directShift = index % 4;
    const scenarioShift = (index + 2) % 4;
    const directOptions = baseOptions.map((_, optionIndex) => baseOptions[(optionIndex + directShift) % 4]);
    const scenarioOptions = baseOptions.map((_, optionIndex) => baseOptions[(optionIndex + scenarioShift) % 4]);

    return [
      {
        id: `${prefix}-${String(index + 1).padStart(2, "0")}-a`,
        question: seed.question,
        options: directOptions,
        answerIndex: directOptions.indexOf(seed.answer),
        explanation: seed.explanation,
      },
      {
        id: `${prefix}-${String(index + 1).padStart(2, "0")}-b`,
        question: seed.scenario,
        options: scenarioOptions,
        answerIndex: scenarioOptions.indexOf(seed.answer),
        explanation: seed.explanation,
      },
    ];
  });
}

const chapter1Seeds: QuestionSeed[] = [
  {
    question: "According to the lecture, what is information?",
    scenario: "A university organizes raw marks into a meaningful student result report. What has the university produced?",
    answer: "Processed data shaped into a meaningful and useful form",
    distractors: ["An unauthorized attack", "A physical vulnerability", "A security protocol"],
    explanation: "The lecture defines information as organized, processed data that has meaning and usefulness to people."
  },
  {
    question: "What is the main purpose of information security in the lecture?",
    scenario: "A company wants to stop unauthorized people from reading, changing, disrupting or destroying its records. Which field addresses this purpose?",
    answer: "Protection of information and its critical elements",
    distractors: ["Increasing network speed only", "Replacing all hardware", "Publishing all system records"],
    explanation: "Information security protects information and critical elements from unauthorized modification, disruption, destruction, inspection and access."
  },
  {
    question: "Which protection activity aims to stop assets from being damaged?",
    scenario: "An organization installs controls before an incident occurs to reduce the chance of damage. Which protection activity is this?",
    answer: "Prevention",
    distractors: ["Detection", "Reaction", "Traffic analysis"],
    explanation: "Prevention means taking measures that prevent assets from being damaged."
  },
  {
    question: "Which protection activity identifies whether damage occurred, how it happened and who caused it?",
    scenario: "A security team reviews alerts and logs to determine how a record was changed and who performed the action. Which activity is being performed?",
    answer: "Detection",
    distractors: ["Prevention", "Reaction", "Authorization"],
    explanation: "Detection measures reveal whether an asset was damaged, how it was damaged and who caused the damage."
  },
  {
    question: "Which protection activity focuses on recovering an asset after damage?",
    scenario: "After a system incident, the team restores data from a clean backup. Which protection activity does this represent?",
    answer: "Reaction",
    distractors: ["Prevention", "Reconnaissance", "Authentication"],
    explanation: "Reaction includes measures that recover assets or recover from damage."
  },
  {
    question: "What is a threat?",
    scenario: "A company identifies the possibility that its money could be stolen. Which security idea does this possibility represent?",
    answer: "Threat",
    distractors: ["Vulnerability", "Attack", "Countermeasure"],
    explanation: "A threat is something harmful that may happen."
  },
  {
    question: "What is a vulnerability?",
    scenario: "A door has a weak lock that makes unauthorized entry easier. In security terminology, what is the weak lock?",
    answer: "Vulnerability",
    distractors: ["Threat", "Reaction", "Non-repudiation"],
    explanation: "A vulnerability is a weakness in defenses that can be exploited."
  },
  {
    question: "What is an attack in the threat-vulnerability model?",
    scenario: "Someone guesses a weak password to exploit an account. What is the password-guessing action?",
    answer: "Attack",
    distractors: ["Asset", "Security criterion", "Prevention"],
    explanation: "An attack is a method or action through which a threat is actualized by exploiting a vulnerability."
  },
  {
    question: "Why do attackers target information systems, according to the lecture?",
    scenario: "An attacker seeks credit-card details and valuable product designs. What general motivation does this illustrate?",
    answer: "Exploiting vulnerabilities for personal or financial gain",
    distractors: ["Improving system modularity", "Performing peer review", "Reducing user permissions"],
    explanation: "The slides describe attackers as individuals or groups seeking to exploit vulnerabilities for personal or financial gain."
  },
  {
    question: "What typically characterizes an amateur or script kiddie?",
    scenario: "A person with little technical skill downloads existing tools and follows Internet instructions to launch attacks. How does the lecture classify this person?",
    answer: "Amateur / script kiddie",
    distractors: ["White-hat consultant", "Trusted third party", "Database administrator"],
    explanation: "The slides describe script kiddies as attackers with little or no skill who use existing tools or instructions."
  },
  {
    question: "What is the purpose of a white-hat hacker in the lecture?",
    scenario: "A company authorizes a tester to break into its systems to find weaknesses and help improve security. Which hacker category fits?",
    answer: "White hat",
    distractors: ["Black hat", "Gray hat", "Script kiddie"],
    explanation: "White-hat attackers test systems to discover weaknesses so the systems can be made more secure."
  },
  {
    question: "How does the lecture describe a gray-hat attacker?",
    scenario: "A person discovers a vulnerability and may report it if doing so fits their own agenda. Which category is this?",
    answer: "Gray hat",
    distractors: ["White hat", "Black hat", "State-sponsored attacker"],
    explanation: "Gray hats are described as being between white and black hats; they may report a vulnerability when it suits their agenda."
  },
  {
    question: "Which hacker category is described as unethical or criminal and acting for personal gain or malicious reasons?",
    scenario: "A person breaks into a network to steal data and cause harm. Which category from the slides applies?",
    answer: "Black hat",
    distractors: ["White hat", "Gray hat", "Security auditor"],
    explanation: "Black-hat attackers violate security unethically or criminally for personal gain or malicious reasons."
  },
  {
    question: "Which group is described as professional criminal groups focused on control, power and wealth?",
    scenario: "A professional criminal group steals customer data to generate income. Which organized attacker group does this represent?",
    answer: "Cybercriminals",
    distractors: ["Hacktivists", "White hats", "Insider auditors"],
    explanation: "The slide describes cybercriminals as professional criminal groups focused on control, power and wealth."
  },
  {
    question: "What is the stated purpose of hacktivists?",
    scenario: "An attacker disrupts an organization to make a political statement and raise awareness of an issue. Which group does the lecture name?",
    answer: "Hacktivists",
    distractors: ["Script kiddies", "Database testers", "White hats"],
    explanation: "Hacktivists use attacks to make political statements or create awareness about issues important to them."
  },
  {
    question: "What may state-sponsored attackers attempt to do?",
    scenario: "An attacker gathers intelligence and steals government secrets on behalf of a state. Which organized attacker category matches?",
    answer: "State-sponsored attacker",
    distractors: ["Amateur attacker", "White-hat tester", "Spam filter"],
    explanation: "The slides say state-sponsored attackers steal government secrets, gather intelligence and sabotage networks."
  },
  {
    question: "Which is a physical vulnerability listed in Chapter 1?",
    scenario: "A laptop or hard disk can be stolen because it is not physically secured. Which vulnerability category is this?",
    answer: "Physical vulnerability",
    distractors: ["Communication vulnerability", "Non-validated input", "Transport-layer attack"],
    explanation: "The lecture lists computers and hard disks being stolen as physical vulnerabilities."
  },
  {
    question: "Which example best represents a communication vulnerability?",
    scenario: "An attacker can tap an exposed communication wire. Which vulnerability type is shown?",
    answer: "Communication vulnerability",
    distractors: ["Physical-only vulnerability", "Human vulnerability", "Availability criterion"],
    explanation: "The slides give wires being tapped as an example of communication vulnerabilities."
  },
  {
    question: "What is non-validated input?",
    scenario: "An application accepts a submitted value without checking whether the value is safe or correct. Which weakness is illustrated?",
    answer: "Non-validated input",
    distractors: ["Traffic analysis", "Non-repudiation", "Reaction"],
    explanation: "Non-validated input means data entering a program may contain malicious content because it is not properly checked."
  },
  {
    question: "Which password example is used to illustrate a poorly chosen password?",
    scenario: "A user protects an account with a very simple password such as 123 or abc. Which vulnerability does this illustrate?",
    answer: "Poorly chosen password",
    distractors: ["Boot-sector infection", "Port redirection", "Availability loss"],
    explanation: "The slide explicitly gives simple passwords such as 123 and abc as examples of weak password choices."
  },
  {
    question: "Which is one consequence of a security breach listed in Chapter 1?",
    scenario: "After a breach, customers, providers and shareholders trust the organization less. Which consequence is this?",
    answer: "Decrease in trust from partners",
    distractors: ["Improved availability", "Encapsulation", "Key distribution"],
    explanation: "The lecture lists reduced trust from partners such as clients, providers and shareholders."
  },
  {
    question: "Which human impact of a security breach is specifically mentioned?",
    scenario: "A breach exposes medical or insurance information about individuals. Which consequence does this illustrate?",
    answer: "Human consequences involving personal or sensitive data",
    distractors: ["Improved quality of service", "Modularity", "Port scanning"],
    explanation: "The slides identify human consequences involving personal and sensitive data, including medical and insurance information."
  },
  {
    question: "What does confidentiality protect?",
    scenario: "A person who is not authorized reads a private email. Which security objective has been compromised?",
    answer: "Confidentiality",
    distractors: ["Integrity", "Availability", "Modularity"],
    explanation: "Confidentiality ensures assets are accessed only by authorized parties; unauthorized reading compromises it."
  },
  {
    question: "What does integrity require?",
    scenario: "A transmitted message is changed by an unauthorized person while it travels across a network. Which security objective is lost?",
    answer: "Integrity",
    distractors: ["Availability", "Confidentiality", "Traffic analysis"],
    explanation: "Integrity requires that messages be modified only by authorized parties and protects against unauthorized alteration."
  },
  {
    question: "What does availability ensure?",
    scenario: "A legitimate user should be able to reach a server when needed, but an attacker prevents access. Which security objective is defeated?",
    answer: "Availability",
    distractors: ["Confidentiality", "Non-repudiation", "Encapsulation"],
    explanation: "Availability means assets are accessible to authorized parties at appropriate times."
  },
  {
    question: "What is authentication?",
    scenario: "A user proves that they are the person they claim to be before a message is accepted. Which security requirement is being used?",
    answer: "Authentication",
    distractors: ["Authorization", "Availability", "Interruption"],
    explanation: "Authentication establishes the correct identity of communicating parties and helps distinguish genuine parties from impersonators."
  },
  {
    question: "What does authorization determine?",
    scenario: "A system allows only the network administrator to change router configurations. Which requirement controls that permission?",
    answer: "Authorization",
    distractors: ["Authentication", "Traffic analysis", "Interception"],
    explanation: "Authorization gives access rights to different types of users."
  },
  {
    question: "What is non-repudiation intended to guarantee?",
    scenario: "A sender later claims they never sent a bank transfer instruction. Which requirement provides evidence against this denial?",
    answer: "Non-repudiation",
    distractors: ["Confidentiality", "Availability", "Ping sweep"],
    explanation: "Non-repudiation helps ensure a sender cannot deny sending a message and a recipient cannot deny receiving it."
  },
  {
    question: "Which attack category targets availability?",
    scenario: "An attacker deletes or disables a resource so authorized users cannot use it. Which broad attack category is this?",
    answer: "Interruption",
    distractors: ["Interception", "Modification", "Fabrication"],
    explanation: "Interruption is an attack on availability."
  },
  {
    question: "Which attack category targets confidentiality?",
    scenario: "An unauthorized person secretly obtains a message while it is being transmitted. Which category is this?",
    answer: "Interception",
    distractors: ["Interruption", "Modification", "Fabrication"],
    explanation: "Interception is an attack on confidentiality."
  },
  {
    question: "Which attack category targets integrity?",
    scenario: "An attacker changes a message between sender and recipient. Which broad category is this?",
    answer: "Modification",
    distractors: ["Interruption", "Interception", "Fabrication"],
    explanation: "Modification is an attack on integrity."
  },
  {
    question: "Which attack category targets authenticity by inserting false information?",
    scenario: "An attacker creates and inserts a fake message that appears to be part of a communication. Which category is this?",
    answer: "Fabrication",
    distractors: ["Interruption", "Interception", "Modification"],
    explanation: "Fabrication is an attack on authenticity through creation or insertion of false information."
  },
  {
    question: "What makes an attack passive?",
    scenario: "An attacker observes transmitted information but neither changes the content nor disrupts communication. How is the attack classified?",
    answer: "Passive attack",
    distractors: ["Active attack", "Buffer overflow", "Denial of service"],
    explanation: "A passive attack attempts to learn or use information without changing message contents or disrupting the communication."
  },
  {
    question: "Which passive attack involves obtaining the actual message content?",
    scenario: "An unauthorized observer reads the content of messages sent between two users without changing them. What is this passive attack?",
    answer: "Release of message contents",
    distractors: ["Traffic analysis", "Masquerade", "Replay"],
    explanation: "Release of message contents is one of the two passive attack types named in the lecture."
  },
  {
    question: "What does traffic analysis examine?",
    scenario: "An observer studies communication patterns, such as when and how much data is exchanged, rather than changing messages. What is this?",
    answer: "Traffic analysis",
    distractors: ["Message modification", "Fabrication", "Port redirection"],
    explanation: "Traffic analysis is a passive attack that learns from communication patterns."
  },
  {
    question: "Which response does the lecture emphasize for preventing passive attacks?",
    scenario: "A network team wants to make observed traffic less useful to an eavesdropper. Which measure is specifically recommended in the passive-attack slides?",
    answer: "Encryption",
    distractors: ["Disabling all user accounts", "Port redirection", "Deduplication"],
    explanation: "Passive attacks are difficult to detect because communication looks normal, so the slides emphasize prevention by encryption."
  },
  {
    question: "Which list contains the four active attack categories from Chapter 1?",
    scenario: "A security review finds impersonation, replay of old messages, message changes and service denial. How does the lecture group these attacks?",
    answer: "Masquerade, replay, message modification and denial of service",
    distractors: ["Sniffing, ping sweep, port scan and nslookup", "Prevention, detection, reaction and recovery", "Modularity, encapsulation, data hiding and peer review"],
    explanation: "The lecture lists masquerade, replay, modification of messages and denial of service as four active attack categories."
  },
  {
    question: "What is a masquerade attack?",
    scenario: "An attacker pretends to be a legitimate user while communicating with another party. Which active attack is this?",
    answer: "Masquerade",
    distractors: ["Replay", "Traffic analysis", "Interruption"],
    explanation: "A masquerade occurs when one entity acts as another."
  },
  {
    question: "What is a replay attack?",
    scenario: "An attacker captures a previously valid message and sends that same message again later. Which active attack is this?",
    answer: "Replay",
    distractors: ["Masquerade", "Interception", "Ping sweep"],
    explanation: "Replay is the reuse or retransmission of a previous message."
  },
  {
    question: "What is an internal attack?",
    scenario: "A malicious node within an organization's network domain gains unauthorized access and disrupts normal operations. How is this attack described?",
    answer: "Internal attack / insider attack",
    distractors: ["External attack", "Passive traffic analysis", "Trusted-third-party exchange"],
    explanation: "Internal attacks originate from a malicious node within the network domain and are also called insider attacks."
  },
  {
    question: "What is an external attack?",
    scenario: "A host that does not belong to the organization's network domain sends false routing information to cause congestion. What kind of attack is this?",
    answer: "External attack",
    distractors: ["Internal attack", "Authorization", "Non-repudiation"],
    explanation: "External attacks are conducted by hosts outside the network domain; false routing information is an example in the slides."
  },
  {
    question: "Which examples does the Chapter 1 table place at the application layer?",
    scenario: "A question asks for the layer associated in the lecture table with email bombing and malicious-code attacks. Which layer should be selected?",
    answer: "Application layer",
    distractors: ["Transport layer", "Network layer", "Data-link layer"],
    explanation: "The slide's TCP/IP table lists email bombing, repudiation, data corruption and malicious code at the application layer."
  },
  {
    question: "Which attacks are listed at the transport layer?",
    scenario: "A student sees session hijacking, checksum alteration and SYN flooding in an attack-classification question. Which layer does the slide assign?",
    answer: "Transport layer",
    distractors: ["Application layer", "Network layer", "Data-link layer"],
    explanation: "The slide table lists session hijacking, altering checksum and SYN flooding at the transport layer."
  },
  {
    question: "Which examples are listed at the network layer?",
    scenario: "A question lists IP spoofing, ICMP echo, wormhole, black hole, gray hole, Byzantine and flooding. Which TCP/IP layer is this?",
    answer: "Network layer",
    distractors: ["Application layer", "Transport layer", "Data-link layer"],
    explanation: "These are the examples shown in the slide's network-layer row."
  },
  {
    question: "Which examples are listed at the data-link layer?",
    scenario: "A slide question asks for the layer associated with traffic analysis and MAC/IEEE 802.11 Wi-Fi disruption. Which layer is correct?",
    answer: "Data-link layer",
    distractors: ["Application layer", "Transport layer", "Network layer"],
    explanation: "The Chapter 1 table lists traffic analysis and disruption, including MAC and IEEE 802.11 Wi-Fi, at the data-link layer."
  },
  {
    question: "Which countermeasure is paired with finding a way into a network?",
    scenario: "An organization wants a control to regulate traffic entering its network. Which countermeasure is paired with network entry in the lecture?",
    answer: "Firewall",
    distractors: ["IPsec only", "User education only", "Data deduplication"],
    explanation: "The countermeasure slide pairs finding a way into the network with firewalls."
  },
  {
    question: "Which countermeasure is paired with packet sniffing?",
    scenario: "An organization wants intercepted network traffic to be unreadable to an observer. Which countermeasure from the slides fits?",
    answer: "Encryption such as SSL or HTTPS",
    distractors: ["Port redirection", "Disabling antivirus", "Traffic flooding"],
    explanation: "The slides pair packet sniffing with encryption and name SSL and HTTPS as examples."
  },
  {
    question: "Which countermeasure does the lecture pair with TCP hijacking?",
    scenario: "A network-security matching question asks which measure is paired with TCP hijacking. Which answer follows the slide?",
    answer: "IPsec",
    distractors: ["Spam filtering", "Deduplication", "Peer review"],
    explanation: "The countermeasure slide pairs TCP hijacking with IPsec."
  },
  {
    question: "Which sequence lists all four requirements of the network-security model?",
    scenario: "A team has designed an encryption algorithm and generated keys. What remaining tasks from the lecture are required?",
    answer: "Distribute/share keys and specify a protocol for using the transformation",
    distractors: ["Remove the recipient and publish the keys", "Disable the communication channel", "Replace encryption with traffic analysis"],
    explanation: "The model requires algorithm design, key generation, key distribution/sharing and a protocol for using them."
  },
  {
    question: "What is the role of a trusted third party in the network-security model?",
    scenario: "Two communicating parties may use an outside trusted entity to help with secret key information. What role is the outside entity performing?",
    answer: "A trusted third party supporting the security exchange",
    distractors: ["The attacker observing the channel", "The source of a denial-of-service flood", "A passive virus host"],
    explanation: "The network-security model allows a trusted third party, for example a key distributor, to be involved."
  },
  {
    question: "Which controls are shown in the network-access security model?",
    scenario: "A diagram shows a gatekeeper protecting an access channel and labels access control, firewall/proxy, antivirus and IDS. What does it represent?",
    answer: "A network-access security model with entry and system controls",
    distractors: ["The virus life cycle", "A TCP three-way handshake", "The history of ARPANET"],
    explanation: "The slide's access-security model shows a gatekeeper, access controls, firewall/proxy servers and antivirus/IDS."
  },
  {
    question: "What historical network project did ARPA examine in the 1960s?",
    scenario: "A history question asks which organization examined the feasibility of redundant networked communications during the 1960s. Which answer is correct?",
    answer: "Advanced Research Projects Agency (ARPA)",
    distractors: ["World Wide Web Consortium", "RAND Corporation's WAF team", "IEEE 802.11"],
    explanation: "The lecture says ARPA examined the feasibility of redundant networked communications in the 1960s."
  },
  {
    question: "Which security weaknesses did the lecture identify in early ARPANET?",
    scenario: "A historical review finds no safety procedures for dial-up connections and no user identification or authorization. Which era does the slide associate with these problems?",
    answer: "The 1970s and 1980s",
    distractors: ["The 1960s only", "The 1990s only", "The present only"],
    explanation: "The slides describe these weaknesses under the 1970s and 80s as ARPANET grew."
  },
  {
    question: "What did RAND Report R-609 signify in the lecture?",
    scenario: "A question asks which report marked the beginning of the study of computer security and expanded attention beyond physical security. Which report is named?",
    answer: "RAND Report R-609",
    distractors: ["IEEE 802.11", "TCP SYN report 609", "The Melissa report"],
    explanation: "The slides call RAND Report R-609 the start of the study of computer security."
  }
];

const chapter2Seeds: QuestionSeed[] = [
  {
    question: "What is malicious code?",
    scenario: "A script performs unauthorized actions, disrupts normal system functions and causes damage. How does the lecture classify it?",
    answer: "Malicious code",
    distractors: ["A security criterion", "A software-development control", "A trusted protocol"],
    explanation: "Malicious code is code intended to cause undesired effects, security breaches, damage, disruption or distress."
  },
  {
    question: "Which examples are host-dependent malicious code in the slides?",
    scenario: "A malicious fragment cannot exist independently of an application and is embedded in a host program. Which pair does the lecture use as examples of host-dependent code?",
    answer: "Viruses and logic bombs",
    distractors: ["Worms and zombie programs", "Firewalls and IDS", "Ping sweeps and port scans"],
    explanation: "The slides identify viruses and logic bombs as examples of threats needing a host program."
  },
  {
    question: "Which examples are independent malicious programs?",
    scenario: "A malicious program is self-contained and can be scheduled and run by the operating system. Which examples are listed for this category?",
    answer: "Worms and zombie programs",
    distractors: ["Viruses and logic bombs", "Buffer overflows and incomplete mediation", "Firewalls and proxies"],
    explanation: "The slides describe independent malicious software as self-contained and give worms and zombie programs as examples."
  },
  {
    question: "Which threats are non-replicating examples in the lecture?",
    scenario: "A threat activates when a condition is met but does not create copies of itself. Which examples does the lecture place in the non-replicating category?",
    answer: "Logic bombs and zombie programs",
    distractors: ["Viruses and worms", "Macro viruses and email viruses", "Sniffers and port scanners"],
    explanation: "Logic bombs and zombie programs are the stated examples of non-replicating threats."
  },
  {
    question: "Which malicious-code examples replicate?",
    scenario: "A program creates copies of itself that may later activate on the same or another system. Which pair represents replicating threats in the slides?",
    answer: "Viruses and worms",
    distractors: ["Logic bombs and zombies", "Firewalls and proxies", "Spyware and spam filters"],
    explanation: "The lecture identifies viruses and worms as replicating malicious software."
  },
  {
    question: "What defines a computer virus in Chapter 2?",
    scenario: "A malicious program hides inside another program and infects it by modifying it. Which malicious code is being described?",
    answer: "Virus",
    distractors: ["Worm", "Logic bomb", "Firewall"],
    explanation: "The lecture defines a virus as malicious code that replicates and hides in or modifies other programs."
  },
  {
    question: "What happens during the dormant phase of a virus?",
    scenario: "A virus remains idle until a date or another event activates it. Which life-cycle phase is this?",
    answer: "Dormant phase",
    distractors: ["Propagation phase", "Triggering phase", "Execution phase"],
    explanation: "During the dormant phase, the virus is idle and waits for an activation event."
  },
  {
    question: "What happens during the propagation phase of a virus?",
    scenario: "A virus places copies of itself into other programs or system areas on disk. Which phase is occurring?",
    answer: "Propagation phase",
    distractors: ["Dormant phase", "Triggering phase", "Execution phase"],
    explanation: "Propagation is the phase in which the virus makes copies of itself in other programs or disk areas."
  },
  {
    question: "What happens during a virus's triggering phase?",
    scenario: "A specified system event activates the virus so it can perform its intended function. Which phase is this?",
    answer: "Triggering phase",
    distractors: ["Dormant phase", "Propagation phase", "Execution phase"],
    explanation: "The triggering phase activates the virus to perform the function for which it was intended."
  },
  {
    question: "What happens during the execution phase of a virus?",
    scenario: "After activation, the virus displays a message or destroys data. Which life-cycle phase is occurring?",
    answer: "Execution phase",
    distractors: ["Dormant phase", "Propagation phase", "Triggering phase"],
    explanation: "Execution is when the virus performs its function, which may be harmless or damaging."
  },
  {
    question: "What is a parasitic virus?",
    scenario: "A virus attaches itself to executable files and replicates. Which virus type is this?",
    answer: "Parasitic virus",
    distractors: ["Boot-sector virus", "Stealth virus", "Metamorphic virus"],
    explanation: "The parasitic virus is described as the traditional and common type that attaches to executable files and replicates."
  },
  {
    question: "What characterizes a memory-resident virus?",
    scenario: "A virus stays in main memory as part of a resident system program and infects programs that execute afterward. Which type is this?",
    answer: "Memory-resident virus",
    distractors: ["Parasitic virus", "Boot-sector virus", "Macro virus"],
    explanation: "A memory-resident virus resides in main memory and can infect each program that executes afterward."
  },
  {
    question: "What does a boot-sector virus infect?",
    scenario: "A virus infects the master boot record or boot record and spreads when the system boots from an infected disk. What type is it?",
    answer: "Boot-sector virus",
    distractors: ["Memory-resident virus", "Polymorphic virus", "Email virus"],
    explanation: "The lecture says boot-sector viruses infect a master boot record or boot record."
  },
  {
    question: "What is the purpose of a stealth virus?",
    scenario: "A virus is specifically designed to hide itself from antivirus detection. Which type does this describe?",
    answer: "Stealth virus",
    distractors: ["Parasitic virus", "Boot-sector virus", "Macro virus"],
    explanation: "A stealth virus is designed to hide itself from detection by antivirus software."
  },
  {
    question: "What makes a polymorphic virus difficult to detect?",
    scenario: "A virus mutates with each infection, making a fixed signature ineffective. Which virus type is being described?",
    answer: "Polymorphic virus",
    distractors: ["Memory-resident virus", "Boot-sector virus", "Parasitic virus"],
    explanation: "The slides say polymorphic viruses mutate with every infection, making signature-based detection difficult."
  },
  {
    question: "What distinguishes a metamorphic virus from a polymorphic virus in the slides?",
    scenario: "A virus rewrites itself completely at each iteration and may change both behavior and appearance. Which type is this?",
    answer: "Metamorphic virus",
    distractors: ["Stealth virus", "Parasitic virus", "Boot-sector virus"],
    explanation: "The lecture says metamorphic viruses rewrite themselves completely each iteration and may change behavior as well as appearance."
  },
  {
    question: "What do macro viruses commonly infect according to the lecture?",
    scenario: "A malicious macro spreads through a document attachment. Which document category does the slide say is commonly infected?",
    answer: "Microsoft documents",
    distractors: ["Router firmware only", "Boot records only", "Database backups only"],
    explanation: "The slides say virtually all macro viruses infect Microsoft documents and are commonly spread by email."
  },
  {
    question: "What happened when a Melissa email attachment was opened?",
    scenario: "A recipient opens a Word attachment containing a macro. The macro activates and sends itself to addresses in the user's mailing list. Which example from the lecture is this?",
    answer: "Melissa email virus",
    distractors: ["Smurf attack", "TOCTTOU error", "Port scan"],
    explanation: "The lecture describes Melissa as a Word macro embedded in an attachment that emailed itself to the user's mailing-list contacts."
  },
  {
    question: "What distinguishes a worm from a virus?",
    scenario: "A self-contained malware program spreads from one computer to another through a network without attaching to a host application. What is it?",
    answer: "Worm",
    distractors: ["Logic bomb", "Trojan horse", "Stealth virus"],
    explanation: "The slides say a worm spreads through a network and does not need a host program to replicate."
  },
  {
    question: "What is the main objective of worms in the lecture?",
    scenario: "A network infection consumes memory and bandwidth until computers become very slow or stop responding. Which malware objective does this illustrate?",
    answer: "Consuming system resources",
    distractors: ["Encrypting data for ransom only", "Collecting traffic patterns only", "Changing a boot record only"],
    explanation: "The lecture says worms consume resources such as memory and bandwidth and can slow systems until they stop responding."
  },
  {
    question: "Which is a symptom of a worm listed in Chapter 2?",
    scenario: "A user notices emails being sent from their account without their knowledge, along with slow system performance. Which malware symptom is this?",
    answer: "Sending emails without the user's knowledge",
    distractors: ["A verified digital signature", "Successful backup encryption", "Improved browser performance"],
    explanation: "The worm symptom list includes email being sent without the user's knowledge."
  },
  {
    question: "What is a logic bomb?",
    scenario: "Code hidden inside a legitimate program activates when a specified condition is met. Which malicious-code type is it?",
    answer: "Logic bomb",
    distractors: ["Worm", "Keylogger", "Ping sweep"],
    explanation: "A logic bomb is embedded in a legitimate program and is triggered by a specified condition."
  },
  {
    question: "Which can trigger a logic bomb according to the slides?",
    scenario: "A hidden malicious instruction waits until a particular date before running. What kind of logic-bomb trigger is this?",
    answer: "A particular day or date",
    distractors: ["A port scan completing", "A firewall logging a packet", "A password being salted"],
    explanation: "The slides list a particular day or date among possible logic-bomb triggers."
  },
  {
    question: "What defines a Trojan horse?",
    scenario: "A program is advertised as a useful game, but when installed it performs harmful actions. Which malware type is this?",
    answer: "Trojan horse",
    distractors: ["Worm", "Ping sweep", "Buffer overflow"],
    explanation: "A Trojan horse misrepresents itself as useful or interesting to persuade a victim to install it."
  },
  {
    question: "Which Trojan type enables unauthorized remote access?",
    scenario: "A disguised program gives an attacker remote access to the victim's computer. Which Trojan classification is this?",
    answer: "Remote-access Trojan",
    distractors: ["Data-sending Trojan", "FTP Trojan", "Destructive Trojan"],
    explanation: "The Trojan classification table says remote-access Trojans enable unauthorized remote access."
  },
  {
    question: "Which Trojan type sends sensitive information such as passwords to an attacker?",
    scenario: "A malicious program secretly transmits saved credentials to a threat actor. Which Trojan category is described?",
    answer: "Data-sending Trojan",
    distractors: ["Proxy Trojan", "FTP Trojan", "DoS Trojan"],
    explanation: "Data-sending Trojans provide the threat actor with sensitive data such as passwords."
  },
  {
    question: "What does a proxy Trojan do?",
    scenario: "A Trojan turns the victim's computer into a source device for launching attacks and other illegal activities. Which classification fits?",
    answer: "Proxy Trojan",
    distractors: ["Destructive Trojan", "Remote-access Trojan", "Keylogger"],
    explanation: "A proxy Trojan uses the victim's computer as the source device for attacks or illegal activity."
  },
  {
    question: "What capability does an FTP Trojan enable?",
    scenario: "A Trojan creates an unauthorized file-transfer service on an end device. Which Trojan type is it?",
    answer: "FTP Trojan",
    distractors: ["Security-software disabler", "Data-sending Trojan", "DoS Trojan"],
    explanation: "The classification table says FTP Trojans enable unauthorized file-transfer services on end devices."
  },
  {
    question: "Which Trojan type stops antivirus programs or firewalls from functioning?",
    scenario: "A disguised malicious program disables the computer's antivirus protection. Which classification matches?",
    answer: "Security-software disabler Trojan",
    distractors: ["Remote-access Trojan", "Proxy Trojan", "FTP Trojan"],
    explanation: "The lecture lists a security-software-disabler Trojan as one that stops antivirus or firewall programs."
  },
  {
    question: "What does a keylogger do?",
    scenario: "A malicious program records the keys typed into a web form to capture confidential information. Which Trojan capability is this?",
    answer: "Keylogger",
    distractors: ["FTP service", "Port scanner", "Boot-sector infection"],
    explanation: "The lecture says keyloggers record keystrokes and may steal confidential information such as credit-card numbers."
  },
  {
    question: "What is spyware?",
    scenario: "Software is installed without a user's knowledge and reports the user's computer activity to another party. What is it?",
    answer: "Spyware",
    distractors: ["A firewall", "A logic bomb", "A ping sweep"],
    explanation: "Spyware is software placed on a computer, typically without the user's knowledge, that reports information about user activity."
  },
  {
    question: "Which information does the spyware slide say may be collected?",
    scenario: "A monitoring program records websites visited, browser and system details and a computer's IP address. Which threat type is involved?",
    answer: "Spyware",
    distractors: ["Buffer overflow", "DDoS", "Port redirection"],
    explanation: "The spyware slide lists visited websites, browser/system information and the computer IP address as gathered information."
  },
  {
    question: "What is ransomware?",
    scenario: "Malware prevents access to a computer or its data and demands payment to release it. Which malware type is this?",
    answer: "Ransomware",
    distractors: ["Spyware", "Macro virus", "Packet sniffer"],
    explanation: "Ransomware denies access to the infected system or data and demands payment."
  },
  {
    question: "Which technique does ransomware frequently use against files?",
    scenario: "A malware incident leaves system files encrypted and inaccessible until a ransom is demanded. What technique is being used?",
    answer: "Encryption of system files and data",
    distractors: ["Ping sweeping", "Port redirection", "Data deduplication"],
    explanation: "The slides say ransomware frequently uses an encryption algorithm to encrypt system files and data."
  },
  {
    question: "Which delivery vectors are named for ransomware campaigns?",
    scenario: "A campaign spreads through malicious advertising and email, and also uses social engineering. Which malware type is described in the slides?",
    answer: "Ransomware",
    distractors: ["Boot-sector virus", "Memory-resident virus", "Port scanner"],
    explanation: "The ransomware slides list email, malvertising and social engineering as campaign vectors."
  },
  {
    question: "What is spam?",
    scenario: "An email inbox is filled with unwanted junk messages. Which term from the lecture describes this?",
    answer: "Spam",
    distractors: ["SYN flooding", "Trust exploitation", "Buffer overflow"],
    explanation: "Spam is unsolicited junk mail that fills email inboxes."
  },
  {
    question: "Which action is recommended to fight spam?",
    scenario: "A user receives suspicious junk email and considers replying to ask the sender to stop. What does the lecture recommend?",
    answer: "Never reply to junk emails",
    distractors: ["Open every attachment", "Publish the actual email address", "Forward it to every contact"],
    explanation: "The slide recommends never replying to junk emails and avoiding suspicious attachments."
  },
  {
    question: "What is the purpose of a reconnaissance attack?",
    scenario: "An attacker collects IP addresses, hostnames and open-port information before attempting an intrusion. Which attack class is this?",
    answer: "Reconnaissance",
    distractors: ["Access attack", "Denial of service", "Buffer overflow"],
    explanation: "Reconnaissance surveys a network and gathers information for a future attack."
  },
  {
    question: "What does a packet sniffer do?",
    scenario: "A tool captures network traffic and decodes it for analysis. Which reconnaissance tool is being used?",
    answer: "Packet sniffer / network analyzer",
    distractors: ["Ping sweep", "Port redirection", "Logic bomb"],
    explanation: "A packet sniffer captures network traffic, which is then decoded and analyzed."
  },
  {
    question: "What does a ping sweep identify?",
    scenario: "A tool sends echo requests to many IP addresses and records the hosts that return echo replies. Which reconnaissance technique is this?",
    answer: "Ping sweep",
    distractors: ["Port scan", "Packet modification", "Keylogging"],
    explanation: "A ping sweep sends echo requests to numerous host addresses to see which hosts respond."
  },
  {
    question: "What does a port scanner look for?",
    scenario: "A tool surveys a host network to identify open service ports and associated applications. Which reconnaissance tool is this?",
    answer: "Port scanner",
    distractors: ["Packet sniffer", "Spam filter", "WAF"],
    explanation: "A port scanner surveys a host network for open ports, which are associated with applications."
  },
  {
    question: "What is nslookup used for in the lecture?",
    scenario: "An administrator wants to resolve a hostname to an IP address or an IP address to a hostname. Which command is identified?",
    answer: "nslookup",
    distractors: ["Wireshark", "TCP intercept", "IPsec"],
    explanation: "The information-query slide names nslookup as a common way to resolve hostnames and IP addresses."
  },
  {
    question: "What is a password attack in the access-attack section?",
    scenario: "An attacker cracks a router or switch password and then changes its configuration or redirects traffic. Which access method is this?",
    answer: "Password attack",
    distractors: ["Ping sweep", "Traffic analysis", "Logic bomb"],
    explanation: "The slides describe password attacks as attempts to crack device passwords to gain access and change configurations."
  },
  {
    question: "What is trust exploitation?",
    scenario: "A user with limited access exploits an application to obtain administrator privileges. Which access attack is this?",
    answer: "Trust exploitation",
    distractors: ["Port scanning", "Smurf attack", "Spyware"],
    explanation: "Trust exploitation occurs when an attacker elevates privileges by exploiting trust or an application."
  },
  {
    question: "Which two trust relationships are named in the lecture?",
    scenario: "A system design relies on trust from the client to the server or from the server to the client. Which concept is being described?",
    answer: "Trust exploitation through client-to-server or server-to-client trust",
    distractors: ["Host-dependent and independent malware", "Confidentiality and availability", "Dormant and execution phases"],
    explanation: "The slide says trust exploitation can rely on the client's trust in the server or the server's trust in the client."
  },
  {
    question: "What is port redirection?",
    scenario: "A compromised internal machine passes traffic through a firewall port that normally denies it, creating a communication tunnel. Which access attack is this?",
    answer: "Port redirection",
    distractors: ["Ping sweep", "Traffic analysis", "Macro infection"],
    explanation: "Port redirection uses a machine with internal access to pass traffic through a port or ACL that would normally deny it."
  },
  {
    question: "What is a man-in-the-middle attack?",
    scenario: "An attacker places themselves between two legitimate parties and can read or modify the exchanged data. Which attack is this?",
    answer: "Man-in-the-middle attack",
    distractors: ["Port scan", "Logic bomb", "Buffer overflow"],
    explanation: "A man-in-the-middle attacker positions themselves between two communicating entities and reads or alters their data."
  },
  {
    question: "What is a distributed denial-of-service attack?",
    scenario: "Many compromised systems send traffic to one target so legitimate users can no longer use the service. Which DoS form is this?",
    answer: "Distributed DoS (DDoS)",
    distractors: ["Reconnaissance", "Trust exploitation", "Incomplete mediation"],
    explanation: "A DDoS attack uses multiple compromised systems; the slides call them zombies or slaves."
  },
  {
    question: "Why does a TCP SYN flood fill connection queues?",
    scenario: "An attacker sends SYN packets with spoofed source addresses and does not acknowledge the resulting SYN-ACK responses. What is being exploited?",
    answer: "The TCP three-way handshake",
    distractors: ["DNS hostname resolution", "A virus propagation phase", "The application-layer WAF"],
    explanation: "The lecture says the attacker fails to ACK SYN-ACK responses, causing connection queues to fill and preventing new connections."
  },
  {
    question: "What is the basic mechanism of a Smurf attack?",
    scenario: "A forged echo request is sent to a broadcast network; many hosts reply to the spoofed source address, overwhelming the target. Which DoS attack is this?",
    answer: "Smurf attack",
    distractors: ["TCP SYN flood", "Teardrop", "Port redirection"],
    explanation: "The Smurf attack uses a spoofed source address and broadcast amplification to generate many ICMP replies toward a target."
  },
  {
    question: "Which three terms does the lecture attribute to IEEE Standard 729?",
    scenario: "A software quality question distinguishes a human mistake, an incorrect software element and an observable departure from desired behavior. Which three terms are used?",
    answer: "Error, fault and failure",
    distractors: ["Threat, vulnerability and attack", "Confidentiality, integrity and availability", "Dormant, propagation and execution"],
    explanation: "The slides define Error as a human mistake, Fault as an incorrect software step or definition, and Failure as a departure from desired behavior."
  },
  {
    question: "What is a buffer overflow?",
    scenario: "A process writes more data into a fixed-length memory block than it is permitted to hold. Which program flaw is this?",
    answer: "Buffer overflow",
    distractors: ["Incomplete mediation", "TOCTTOU", "Traffic analysis"],
    explanation: "A buffer overflow occurs when more data is written to a finite buffer than the buffer can hold."
  },
  {
    question: "What is incomplete mediation?",
    scenario: "An application accepts an incorrect user value or an altered request parameter without sufficiently checking it. Which program flaw does this illustrate?",
    answer: "Incomplete mediation",
    distractors: ["Memory-resident virus", "Smurf attack", "DDoS"],
    explanation: "The lecture defines incomplete mediation as an application accepting incorrect data from the user or a compromised system component."
  },
  {
    question: "What is a TOCTTOU error?",
    scenario: "A program checks a resource, but another process changes the resource before the first program uses it. Which flaw is this?",
    answer: "Time-of-check to time-of-use (TOCTTOU)",
    distractors: ["Buffer overflow", "Stealth virus", "Port scan"],
    explanation: "TOCTTOU is a race condition that exploits the time gap between a security check and later use."
  },
  {
    question: "What is black-box testing in the software-development controls section?",
    scenario: "A tester checks a program by providing input and observing output without analyzing the internal code. Which testing type is this?",
    answer: "Black-box testing",
    distractors: ["Clear-box testing", "Configuration management", "Hazard analysis"],
    explanation: "The slides define black-box testing as seeing only input and output."
  },
  {
    question: "What is Clear-Box testing in the lecture?",
    scenario: "A tester can inspect the program code and create test scenarios based on the code. Which testing approach is described?",
    answer: "Clear-Box testing",
    distractors: ["Black-box testing", "Spam filtering", "Access filtering"],
    explanation: "The slide calls the code-aware approach Clear-Box testing and says the tester can analyze code and develop scenarios."
  },
  {
    question: "Which operating-system protection measures are listed?",
    scenario: "A system administrator installs endpoint antivirus, applies OS patches, monitors network traffic with a firewall and enforces least privilege. Which control group is this?",
    answer: "Operating-system protection controls",
    distractors: ["Reconnaissance techniques", "Virus life-cycle phases", "Attack categories"],
    explanation: "The OS protection slide lists antivirus/endpoint protection, regular patches, firewall monitoring and least-privilege user controls."
  },
  {
    question: "What does File Integrity Monitoring do in the database-security slides?",
    scenario: "A monitoring system logs actions on a database server and alerts administrators to possible breaches. Which database control is this?",
    answer: "File Integrity Monitoring (FIM)",
    distractors: ["Ping sweep", "Port redirection", "Macro virus"],
    explanation: "The lecture says FIM can log database-server actions and alert about potential breaches."
  },
  {
    question: "What is the role of a Web Application Firewall in the lecture?",
    scenario: "An application-layer control detects SQL-injection traffic and blocks it before it can harm a database. Which control is described?",
    answer: "Web Application Firewall (WAF)",
    distractors: ["Packet sniffer", "Boot-sector protection", "Ping sweep"],
    explanation: "The slides say a WAF operates at Layer 7 and can detect and block malicious web-application traffic such as SQL injection."
  }
];

export const chapter1QuizBank = buildBank("ias1", chapter1Seeds);
export const chapter2QuizBank = buildBank("ias2", chapter2Seeds);
