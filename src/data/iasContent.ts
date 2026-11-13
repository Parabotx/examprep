import type { ChapterLearningContent, StudyTopic, SummaryTopic, InteractiveScenario } from "../types";
import { chapter1QuizBank, chapter2QuizBank } from "./iasQuizBank";

const chapter1Notes: StudyTopic[] = [
  {
    title: "1. Course orientation and learning objectives",
    overview: "The Information Assurance & Security course (ITec4151) is organized into five chapters: Introduction, Computer Threat, Cryptography, Network Security, and Administering Security. Chapters 1 and 2 establish the foundations used by the later chapters.",
    keyPoints: [
      "The course learning objectives include recognizing security attacks and threats, vulnerabilities, security criteria, security models and mechanisms.",
      "The course also introduces malicious code and ways to secure computers and operating systems.",
      "The remaining course objectives include elementary cryptography (plaintext, ciphertext, cryptanalysis, symmetric and asymmetric cryptography, digital signatures, message authentication codes, hash functions and Public Key Infrastructure), network protection (protocols, firewalls, VPN, IDS and IPS), and security administration (planning, risk analysis, organizational policies and physical security).",
      "The slide deck gives the assessment weights as Test 30%, Assignment 20%, Quiz 10% and Final Exam 40%, for a total of 100%."
    ],
    examFocus: "Know the five-chapter course map and the assessment weights as shown in the lecture slides."
  },
  {
    title: "2. Meaning of information and security",
    overview: "Information is organized, processed data that has meaning and usefulness to people. It provides answers to who, what and when questions. Security is the quality or state of being secure and protected from danger or adversaries.",
    keyPoints: [
      "Information is data shaped into a meaningful and useful form for human beings.",
      "Information security protects information and its critical elements against unauthorized modification, disruption, destruction, inspection and access.",
      "The lecture treats information security as protection of both information and the important elements that support it."
    ],
    example: "A student record is more than isolated numbers: when the data is organized into a named student's grades and results, it becomes information. Information security prevents an unauthorized person from reading or changing that record."
  },
  {
    title: "3. Three broad protection activities",
    overview: "The lecture groups protection into prevention, detection and reaction. These activities complement one another: avoid damage where possible, recognize damage when it occurs, and recover from it.",
    keyPoints: [
      "Prevention means taking measures that stop or reduce the chance that assets will be damaged.",
      "Detection means using measures that reveal whether an asset has been damaged, how it was damaged and who caused the damage.",
      "Reaction means taking measures to recover the asset or recover from the damage."
    ],
    example: "A firewall is a preventive measure; a security alert that identifies suspicious activity is a detection measure; restoring a clean backup after an incident is part of reaction and recovery."
  },
  {
    title: "4. Threats, vulnerabilities and attacks",
    overview: "Security is discussed through three related ideas. A threat is something bad that may happen. A vulnerability is a weakness in the defenses. An attack is a way in which a threat is made real by exploiting a vulnerability.",
    keyPoints: [
      "Threat: a possible harmful event or danger to an asset.",
      "Vulnerability: a weakness that makes an asset or defense susceptible to harm.",
      "Attack: an action or method that exploits a vulnerability and realizes a threat.",
      "The lecture's physical analogy is a thief (threat) breaking through a weak front door (vulnerability) while residents are away (an attack scenario)."
    ],
    example: "A weak password is a vulnerability; unauthorized account access is a threat; trying guessed passwords until one works is an attack."
  },
  {
    title: "5. Types of attackers",
    overview: "Attackers are individuals or groups who try to exploit vulnerabilities for personal or financial gain. Their targets can include credit-card information, product designs and other valuable information.",
    keyPoints: [
      "Amateurs or script kiddies have little or no skill and commonly rely on existing tools or instructions found on the Internet.",
      "Hackers is a broad label in the slides for people who break into computers or networks for different reasons.",
      "White-hat hackers test systems to find weaknesses so that security can be improved.",
      "Gray-hat hackers sit between white-hat and black-hat behavior; they may report a vulnerability when doing so fits their agenda.",
      "Black-hat hackers act unethically or criminally, violating computer or network security for personal gain or malicious reasons.",
      "Organized attackers include cybercriminals, hacktivists, terrorists and state-sponsored hackers.",
      "Cybercriminals are described as professional criminal groups focused on control, power and wealth. Hacktivists use attacks to make political statements or raise awareness. State-sponsored attackers steal government secrets, gather intelligence or sabotage networks; targets can include foreign governments, terrorist groups and corporations.",
      "The diagram also distinguishes outsiders from insiders. The later slides describe insiders as employees (current or former), contractors, vendors and business partners who already have some level of access."
    ],
    example: "A security consultant hired to test a company's defenses is acting as a white hat. A criminal group stealing customer records for money is a cybercriminal organization. A disgruntled employee misusing an authorized account is an insider."
  },
  {
    title: "6. Security vulnerabilities",
    overview: "A vulnerability is a weakness that an attacker can exploit. The lecture groups examples across software, hardware, input handling, security practices, access control, physical protection, communications, people and passwords.",
    keyPoints: [
      "Software or hardware defects include operating-system or application-code errors, buffer overflows and hardware design flaws.",
      "Non-validated input occurs when incoming data is not properly checked and may contain malicious content.",
      "Weak security practices include failing to educate people about security.",
      "Access-control problems arise when access permissions are improperly designed or used.",
      "Physical vulnerabilities include the possibility of a computer or hard disk being stolen.",
      "Communication vulnerabilities include wires that can be tapped.",
      "Human vulnerabilities include insiders and mistakes or misuse by people.",
      "Poorly chosen passwords such as simple examples like 123 or abc are weak points."
    ],
    examFocus: "Be able to identify which vulnerability category is illustrated by an example; do not treat all weaknesses as software flaws."
  },
  {
    title: "7. Consequences of security breaches",
    overview: "A security breach can harm service delivery, an organization's internal operations, its relationships and trust, its technology and people whose data is held.",
    keyPoints: [
      "Failure or end of service.",
      "Reduction in quality of service, potentially reaching denial of service (the slide also mentions DDoS).",
      "Internal problems within the enterprise.",
      "Reduced trust from partners such as clients, providers and shareholders.",
      "Technology leakage.",
      "Human consequences involving personal or sensitive information, including medical and insurance information."
    ],
    example: "A leaked medical database affects individuals' privacy, can damage the organization's reputation and may reduce customers' trust."
  },
  {
    title: "8. Security criteria: the CIA triad",
    overview: "The three fundamental security objectives are confidentiality, integrity and availability. The lecture uses them to understand attacks and think about appropriate solutions.",
    keyPoints: [
      "Confidentiality means computer-related assets are accessed only by authorized parties. It is also called secrecy or privacy.",
      "Integrity means information or messages are modified only by authorized parties. It protects against unauthorized or accidental writing, changing, deleting or creating of messages.",
      "Availability means assets remain accessible to authorized parties at appropriate times. Legitimate access should not be prevented; denial of service is the opposite of availability.",
      "The lecture gives examples: an unauthorized person reading a private email breaks confidentiality; a check changed from $100 to $1,000 breaks integrity; an attacker preventing a user from contacting a server breaks availability."
    ],
    example: "For a university portal: hiding grades from unauthorized students supports confidentiality; preventing an unauthorized grade change supports integrity; keeping the portal reachable at registration time supports availability."
  },
  {
    title: "9. Other security requirements",
    overview: "The slides identify authentication, authorization and non-repudiation as additional security requirements beyond the CIA objectives.",
    keyPoints: [
      "Authentication establishes the correct identity of communicating parties and helps distinguish genuine parties from impersonators.",
      "Authorization assigns access rights to different users. For example, only a network administrator may be allowed to perform network management.",
      "Non-repudiation provides evidence so that a sender cannot later deny sending a message and a recipient cannot deny receiving it.",
      "The lecture's example is a funds-transfer instruction sent to a bank: non-repudiation helps prevent the sender from later denying that the instruction was sent."
    ],
    examFocus: "Authentication asks 'Who are you?'; authorization asks 'What are you allowed to do?'; non-repudiation addresses later denial of sending or receiving."
  },
  {
    title: "10. Examples of threats against security criteria",
    overview: "The slide deck compares possible harm to hardware, software, data and communication lines or networks under availability, confidentiality and integrity.",
    keyPoints: [
      "Hardware availability can be affected when equipment is stolen or disabled; confidentiality can be affected when an unauthorized person reads or copies device information; integrity can be affected when a device is modified.",
      "Software availability can be affected when programs are deleted or become inaccessible; confidentiality can be affected by unauthorized copies; integrity can be affected when a working program is modified.",
      "Data availability can be affected by deleting files or making storage unavailable; confidentiality can be affected by unauthorized reading; integrity can be affected by changing or deleting existing files or adding false files.",
      "Communication availability can be affected when messages are deleted or lines are disrupted; confidentiality can be affected when messages are read; integrity can be affected when messages are modified, delayed, duplicated or fabricated."
    ],
    examFocus: "When given an asset and an incident, identify whether the primary impact is availability, confidentiality or integrity."
  },
  {
    title: "11. Attack categories based on security criteria",
    overview: "The lecture names four broad attack categories and connects each to a security property.",
    keyPoints: [
      "Interruption is an attack on availability: a resource or service is made unavailable.",
      "Interception is an attack on confidentiality: an unauthorized party obtains information.",
      "Modification is an attack on integrity: information is altered.",
      "Fabrication is an attack on authenticity: false information or messages are inserted or created.",
      "The diagram contrasts normal information flow from source to destination with the four ways an attacker can disrupt or interfere with it."
    ],
    example: "Deleting a file is interruption; secretly reading a message is interception; changing the message is modification; inserting a fake message is fabrication."
  },
  {
    title: "12. Passive and active attacks",
    overview: "Attacks can be classified as passive or active. The difference is whether the attacker only observes information or changes information/system operation.",
    keyPoints: [
      "A passive attack attempts to learn or use transmitted information without changing message contents or disrupting communication.",
      "The two passive attack types named are release of message contents and traffic analysis.",
      "Passive attacks are difficult to detect because communication can appear normal and the data is not altered. The lecture therefore emphasizes prevention, especially encryption.",
      "An active attack tries to alter system resources or affect their operation, including modifying data or creating false data.",
      "The four active attack categories listed are masquerade, replay, modification of messages and denial of service.",
      "Active attacks are difficult to prevent completely; the slides emphasize detecting them and recovering."
    ],
    example: "Listening to an unencrypted conversation is passive. Pretending to be another user, replaying an old instruction, changing a message or blocking the service is active."
  },
  {
    title: "13. Passive attack types",
    overview: "The lecture identifies two passive attacks: release of message contents and traffic analysis.",
    keyPoints: [
      "Release of message contents means an unauthorized party obtains the actual content being communicated.",
      "Traffic analysis means studying communication patterns or traffic information even where the content itself may not be read.",
      "The diagrams show an observer, labelled Darth, observing message contents or patterns as Bob and Alice communicate through the Internet or another communications facility.",
      "Because passive monitoring may leave communication apparently unchanged, encryption is highlighted as a preventive measure."
    ],
    examFocus: "Distinguish reading message contents from learning information through traffic patterns."
  },
  {
    title: "14. Active attack types",
    overview: "Active attacks interfere with communication or system operation by impersonating, replaying, modifying or preventing communication.",
    keyPoints: [
      "Masquerade: one entity pretends to be another.",
      "Replay: an attacker captures a previous message and sends it again.",
      "Modification of messages: an attacker changes a message while it is being communicated.",
      "Denial of service: an attacker prevents normal use of a target or an entire network.",
      "The lecture diagrams depict an attacker between communicating parties for masquerade, replay and modification, and an attacker disrupting service from a server for denial of service.",
      "Active attacks are generally difficult to prevent completely, so detection and recovery are important."
    ],
    example: "If an attacker records a valid payment instruction and sends it again later, that is a replay attack. If the amount is changed in transit, it is message modification."
  },
  {
    title: "15. Internal and external attacks",
    overview: "Attacks can also be classified by whether their source is inside or outside the network domain.",
    keyPoints: [
      "External attacks are conducted by hosts that do not belong to the network domain; these attackers are sometimes called outsiders.",
      "The slides give false routing information that creates congestion and makes services unavailable as an external-attack example.",
      "An internal attack occurs when a malicious node within the network domain gains unauthorized access, acts as a genuine node and disrupts normal operation. Internal attackers are also called insiders.",
      "Internal attackers may be current or former employees, contractors or vendors with access, or business partners with system privileges.",
      "Motivations listed for insiders include disgruntlement or revenge, financial gain, espionage and accidental misuse or negligence.",
      "External attacker examples include hackers or cybercriminals, state-sponsored actors, script kiddies and organized-crime groups. Motivations include financial gain, political or ideological goals, espionage and disruption."
    ],
    examFocus: "The defining distinction is the attacker's relationship to the network and its authorized access, not simply the attacker's motivation."
  },
  {
    title: "16. Attacks at TCP/IP model layers",
    overview: "The lecture classifies common attacks by the TCP/IP layer at which they occur. The slide table lists examples for the application, transport, network and data-link layers.",
    keyPoints: [
      "Application layer: email bombing, repudiation, data corruption and malicious-code attacks, with Trojan, malware and virus given as examples.",
      "Transport layer: session hijacking, altering checksums and SYN flooding.",
      "Network layer: IP spoofing, ICMP echo, wormhole, black hole, gray hole, Byzantine and flooding attacks.",
      "Data-link layer: traffic analysis and disruption, with MAC and IEEE 802.11 Wi-Fi given as examples.",
      "These are examples from the slide's layer table; an attack may involve more than one layer in a real network."
    ],
    examFocus: "Memorize the layer-to-example mapping as presented in the lecture table."
  },
  {
    title: "17. Common attacks and countermeasures",
    overview: "The lecture pairs common security problems with controls that can reduce their impact.",
    keyPoints: [
      "Finding a way into a network: use firewalls.",
      "Exploiting software bugs or buffer overflows: use Intrusion Detection Systems (IDS), as listed in the slides.",
      "Denial of service: use access filtering and IDS.",
      "TCP hijacking: use IPsec.",
      "Packet sniffing: use encryption, with SSL and HTTPS named as examples.",
      "Social problems: use education."
    ],
    examFocus: "Recall the pairs shown in the lecture. IDS is the slide's stated response for detecting exploitation and DoS activity."
  },
  {
    title: "18. Model for network security",
    overview: "The network-security model describes two principals exchanging information over an insecure communications channel while possible opponents are present.",
    keyPoints: [
      "The sender and recipient are the principals in the transaction and must cooperate for the exchange to occur.",
      "They can apply a suitable security transformation, such as an encryption algorithm.",
      "The transformation uses suitable keys, which are secret information.",
      "A trusted third party may be involved, for example to help with key information or its distribution.",
      "The diagram shows a sender applying a security-related transformation using secret information, the message travelling through an information channel, and the recipient applying a corresponding transformation. An opponent may observe or interfere with the channel."
    ],
    examFocus: "Know the sender, recipient, insecure channel, opponent, security transformation, secret key and possible trusted third party."
  },
  {
    title: "19. Four requirements for using the network-security model",
    overview: "The slides list four tasks required to use the network-security model.",
    keyPoints: [
      "Design a suitable algorithm for the security transformation.",
      "Generate the secret information (keys) used by the algorithm.",
      "Develop methods to distribute and share the secret information or key.",
      "Specify a protocol that enables the principals to use the transformation and secret information to provide a security service."
    ],
    examFocus: "Remember the sequence: design the algorithm, generate keys, distribute/share keys, and specify the protocol."
  },
  {
    title: "20. Model for network access security",
    overview: "The network-access security diagram focuses on protecting the path into an information system.",
    keyPoints: [
      "The diagram identifies an access channel and a gatekeeper function between an opponent and the information system.",
      "Access control, firewalls and proxy servers are shown as measures associated with controlling access.",
      "Antivirus and Intrusion Detection Systems (IDS) are shown as controls associated with the information system.",
      "The information system is shown as including communications processors, data, software, processor, software and internal security controls."
    ],
    examFocus: "Be able to distinguish network access controls (access control, firewall/proxy) from endpoint or system protections (antivirus/IDS) in the diagram."
  },
  {
    title: "21. History of information security",
    overview: "The lecture traces computer security from early mainframes and military computing through ARPANET, the Internet and the present interconnected environment.",
    keyPoints: [
      "Computer security began soon after the first mainframes were developed.",
      "Groups working on code-breaking computations during World War II created the first modern computers. Physical controls restricted access to sensitive military locations, but only rudimentary controls existed against physical theft, espionage and sabotage.",
      "In the 1960s, the Department of Defense's Advanced Research Projects Agency (ARPA) examined the feasibility of redundant networked communications. Larry Roberts developed the project from its inception.",
      "During the 1970s and 1980s, ARPANET grew in popularity and so did its potential for misuse. Fundamental weaknesses included no safety procedures for dial-up connections and non-existent user identification and authorization. The late-1970s microprocessor expanded computing capabilities and security threats.",
      "The lecture identifies RAND Report R-609 as the start of the study of computer security. The scope expanded from physical security to data safety, limiting unauthorized data access and involving personnel at multiple organizational levels.",
      "In the 1990s, computer networks became more common and were interconnected, resulting in the Internet as a global network of networks. Early Internet deployments treated security as a low priority.",
      "In the present, millions of networks communicate, many are unsecured, and the security of one network is influenced by the security of every computer to which it connects."
    ],
    examFocus: "Study the timeline in order: early mainframes/World War II, 1960s ARPA, 1970s-80s ARPANET, RAND R-609, 1990s Internet, present interconnection."
  },
  {
    title: "22. Chapter 1 exit-exam themes",
    overview: "The final slide tests recognition of packet sniffing and eavesdropping, database integrity threats and the principle of least privilege.",
    keyPoints: [
      "Eavesdropping and packet sniffing are associated with confidentiality because an unauthorized party observes information.",
      "Creating, inserting, updating, changing the status of or deleting database data can threaten integrity.",
      "A student should not receive administrator rights merely to install software when those rights are not required for the student's role. The principle named in the options is least privilege."
    ],
    examFocus: "This section restates the themes in the deck's exit questions; use the full explanations in the earlier sections to answer similar scenarios."
  }
];

const chapter1Short: StudyTopic[] = [
  { title: "1. Course orientation", overview: "Five chapters: Introduction, Computer Threat, Cryptography, Network Security and Administering Security.", keyPoints: ["Assessment: Test 30%, Assignment 20%, Quiz 10%, Final 40%.", "Chapters 1-2 introduce security foundations and computer threats."] },
  { title: "2. Information security", overview: "Information is processed data with meaning; information security protects information and its critical elements from unauthorized access, inspection, modification, disruption and destruction.", keyPoints: ["Information answers who, what and when.", "Security means protection from danger and adversaries."] },
  { title: "3. Protection activities", overview: "Prevention avoids damage; detection identifies damage, how it happened and who caused it; reaction supports recovery.", keyPoints: ["Prevention → stop; Detection → discover; Reaction → recover."] },
  { title: "4. Threats, vulnerabilities and attacks", overview: "Threat = possible harm; vulnerability = weakness; attack = action that exploits the weakness.", keyPoints: ["A weak password is a vulnerability; guessing it is an attack."] },
  { title: "5. Attackers", overview: "Script kiddies, white hats, gray hats, black hats, cybercriminals, hacktivists, terrorists, state-sponsored attackers and insiders.", keyPoints: ["White hat improves security; gray hat is between; black hat acts maliciously.", "Insiders already have some legitimate access."] },
  { title: "6. Vulnerabilities", overview: "Software/hardware defects, non-validated input, poor practices, access-control issues, physical weaknesses, communication weaknesses, human weaknesses and weak passwords.", keyPoints: ["Examples: stolen hard disk, tapped wire, insider misuse, 123/abc password."] },
  { title: "7. Breach consequences", overview: "Service failure, reduced QoS/DoS, enterprise problems, loss of partner trust, technology leakage and harm to personal or sensitive data.", keyPoints: ["Consequences can affect systems, organizations and people."] },
  { title: "8. CIA triad", overview: "Confidentiality = authorized access only; Integrity = authorized modification only; Availability = authorized access at the right time.", keyPoints: ["Read without permission → confidentiality.", "Unauthorized alteration → integrity.", "Service unavailable → availability."] },
  { title: "9. Other requirements", overview: "Authentication verifies identity; authorization assigns permissions; non-repudiation prevents later denial of sending or receiving.", keyPoints: ["Identity / access rights / proof of action."] },
  { title: "10. Security criteria examples", overview: "Hardware, software, data and communication systems can suffer availability, confidentiality and integrity failures.", keyPoints: ["Deletion or disruption → availability; unauthorized reading → confidentiality; alteration → integrity."] },
  { title: "11. Four attack categories", overview: "Interruption attacks availability; interception attacks confidentiality; modification attacks integrity; fabrication attacks authenticity.", keyPoints: ["Remember I-I-M-F and the affected property."] },
  { title: "12. Passive vs active", overview: "Passive attacks observe without changing communication; active attacks modify, create, interrupt or disrupt.", keyPoints: ["Passive: message-content release and traffic analysis.", "Active: masquerade, replay, message modification, DoS.", "Passive attacks are hard to detect; encryption helps prevent them. Active response emphasizes detection and recovery."] },
  { title: "13. Internal vs external", overview: "External attackers are outside the network domain; insiders have a level of legitimate access and misuse it.", keyPoints: ["Insider sources: employees, former employees, contractors, vendors, business partners.", "Motives: revenge, money, espionage, negligence; external motives include financial, political, espionage and disruption."] },
  { title: "14. TCP/IP layer attacks", overview: "Application: email bombing, repudiation, corruption, malware. Transport: session hijacking, checksum alteration, SYN flooding. Network: spoofing, ICMP, wormhole, black/gray hole, Byzantine, flooding. Data link: traffic analysis and MAC/Wi-Fi disruption.", keyPoints: ["Learn the slide's layer-to-attack examples."] },
  { title: "15. Countermeasures", overview: "Firewalls, IDS, access filtering, IPsec, SSL/HTTPS encryption and user education are paired with common attacks.", keyPoints: ["Network entry → firewall; bugs/buffer overflow → IDS; DoS → filtering + IDS; TCP hijack → IPsec; sniffing → encryption; social problems → education."] },
  { title: "16. Network-security model", overview: "Sender and recipient exchange data over an insecure channel using security transformations and secret keys, possibly with a trusted third party.", keyPoints: ["Design algorithm; generate keys; distribute/share keys; define protocol."] },
  { title: "17. Network-access model", overview: "A gatekeeper protects the access channel. The diagram shows access control, firewall/proxy, and antivirus/IDS controls.", keyPoints: ["Access controls protect entry; endpoint controls protect the information system."] },
  { title: "18. History", overview: "Mainframes and WWII physical controls → 1960s ARPA → 1970s-80s ARPANET weaknesses → RAND R-609 → 1990s Internet → today's interconnected networks.", keyPoints: ["Early ARPANET lacked dial-up safety, identification and authorization.", "R-609 expanded security from physical protection to data and organizational responsibility."] },
  { title: "19. Exit-exam themes", overview: "Packet sniffing/eavesdropping threaten confidentiality; data changes/deletion threaten integrity; administrator rights should follow least privilege.", keyPoints: ["Apply the concept to the scenario rather than memorizing only the option."] }
];

const chapter1Summary: SummaryTopic[] = [
  { title: "Course orientation", description: "Course structure, objectives and assessment weights." },
  { title: "Information and information security", description: "Meaning of information and its protection." },
  { title: "Prevention, detection and reaction", description: "Three broad protection activities." },
  { title: "Threats, vulnerabilities and attacks", description: "The danger, weakness and action relationship." },
  { title: "Types of attackers", description: "Amateurs, hacker categories, organized groups and insiders." },
  { title: "Security vulnerabilities", description: "Technical, physical, communication, human and access weaknesses." },
  { title: "Consequences of breaches", description: "Service, enterprise, trust, technology and human impacts." },
  { title: "Security criteria: CIA", description: "Confidentiality, integrity and availability." },
  { title: "Authentication, authorization and non-repudiation", description: "Identity, permissions and proof of action." },
  { title: "Examples of threats", description: "Security impacts on hardware, software, data and communication." },
  { title: "Attack categories", description: "Interruption, interception, modification and fabrication." },
  { title: "Passive and active attacks", description: "Observation compared with interference." },
  { title: "Internal and external attacks", description: "Attacker position, access and motivations." },
  { title: "TCP/IP-layer attacks", description: "Application, transport, network and data-link attack examples." },
  { title: "Countermeasures", description: "Firewalls, IDS, filtering, IPsec, encryption and education." },
  { title: "Network-security model", description: "Principals, insecure channel, transformations, keys and protocol." },
  { title: "Network-access security model", description: "Gatekeeper, access controls, firewall/proxy and antivirus/IDS." },
  { title: "History of information security", description: "Early computing, ARPA, ARPANET, RAND R-609 and the Internet." },
  { title: "Exit-exam themes", description: "Confidentiality, integrity and least privilege in scenarios." }
];

const chapter1Interactive: InteractiveScenario[] = [
  {
    id: "cia-record",
    title: "Protect the student record",
    situation: "A university portal stores grades. A student changes another student's grade without permission. The portal remains online and the record is still readable.",
    question: "Which security objective is directly violated?",
    options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
    answerIndex: 1,
    explanation: "The record was altered by an unauthorized party. The lecture defines integrity as protection against unauthorized modification, addition or deletion.",
    takeaway: "Integrity is about keeping information correct and unchanged except by authorized parties."
  },
  {
    id: "attack-map",
    title: "Map the attack to the security property",
    situation: "An attacker secretly reads a confidential email sent between two employees. The attacker does not change it or stop delivery.",
    question: "Which attack category best describes this event?",
    options: ["Interruption", "Interception", "Modification", "Fabrication"],
    answerIndex: 1,
    explanation: "The attacker obtains information without authorization. The slides classify this as interception, an attack on confidentiality.",
    takeaway: "Interception = unauthorized observation or access to information."
  },
  {
    id: "passive-watch",
    title: "Observe or interfere?",
    situation: "A person captures network traffic and studies who communicates, when they communicate and how much data is exchanged. The messages are not changed.",
    question: "Is this passive or active, and what specific passive technique is it?",
    options: ["Active; replay", "Passive; traffic analysis", "Active; modification", "Passive; denial of service"],
    answerIndex: 1,
    explanation: "The attacker observes communication patterns without changing the messages. The lecture calls this traffic analysis, a passive attack.",
    takeaway: "Passive attacks seek information while leaving communication apparently normal."
  },
  {
    id: "insider-route",
    title: "Identify the attacker",
    situation: "A contractor has a legitimate account for a company network. After a disagreement with the company, the contractor uses that account to copy confidential files.",
    question: "How is this attacker best classified in the lecture?",
    options: ["External attacker", "Insider / internal attacker", "Script kiddie by definition", "Trusted third party"],
    answerIndex: 1,
    explanation: "The contractor already has a level of legitimate access and misuses it. The slides include contractors and vendors among possible insiders.",
    takeaway: "Internal attackers are identified by their existing relationship and access to the organization."
  },
  {
    id: "security-model",
    title: "Build a secure message exchange",
    situation: "Two departments must send information over a network that other people may observe. They agree to use an encryption method and secret keys.",
    question: "Which item is also one of the four tasks the lecture says is required for the network-security model?",
    options: ["Remove the recipient", "Develop a method to distribute and share the key", "Send the key publicly without controls", "Stop using a protocol"],
    answerIndex: 1,
    explanation: "The four tasks are designing the transformation algorithm, generating keys, distributing/sharing keys and specifying a protocol.",
    takeaway: "A strong algorithm alone is not enough; keys and the protocol for using them also matter."
  },
  {
    id: "least-privilege",
    title: "Choose the minimum required access",
    situation: "A student needs to use a lab application. The student asks for permanent administrator rights, but the application can be used with a standard account.",
    question: "Which principle supports giving only the access needed for the task?",
    options: ["Least privilege", "Traffic analysis", "Non-repudiation", "Fabrication"],
    answerIndex: 0,
    explanation: "The lecture's exit question describes not giving a student administrator rights when those rights are not required. This is least privilege.",
    takeaway: "Give users only the permissions required for their responsibilities."
  }
];

export const chapter1: ChapterLearningContent = {
  id: "chapter1",
  title: "Chapter 1 — Introduction",
  subtitle: "Information Assurance & Security",
  studyNotes: chapter1Notes,
  shortNotes: chapter1Short,
  summary: chapter1Summary,
  interactive: chapter1Interactive,
  quizzes: chapter1QuizBank
};

const chapter2Notes: StudyTopic[] = [
  {
    title: "1. Malicious code: meaning and examples",
    overview: "Malicious code is code or a script intended to cause undesired effects, security breaches or damage, disrupt normal computer or network functions, or distress a user. It performs unauthorized functions and makes normal information-system operation abnormal.",
    keyPoints: [
      "Examples listed include viruses, worms, logic bombs, Trojan horses and spyware.",
      "The lecture also lists spam/scam, Slammer, telecom fraud and e-payment frauds among newer examples.",
      "The central idea is unauthorized or harmful behavior, not merely whether a program is visible or familiar."
    ]
  },
  {
    title: "2. Two ways to classify malicious software",
    overview: "The slides provide two separate classification schemes. One asks whether the malicious code needs a host program; the other asks whether it replicates.",
    keyPoints: [
      "Host-dependent code consists of fragments that cannot exist independently of an actual application, utility or system program. Viruses and logic bombs are examples in the slides.",
      "Independent malicious software is self-contained and can be scheduled and run by the operating system. Worms and zombie programs are examples.",
      "Non-replicating threats are programs or program fragments activated by a trigger. Logic bombs and zombie programs are examples.",
      "Replicating threats make one or more copies of themselves for later activation on the same system or another system. Viruses and worms are examples.",
      "Do not confuse the two classification axes: host dependence and replication are different questions."
    ],
    examFocus: "Be able to classify examples under both schemes independently."
  },
  {
    title: "3. Viruses: definition and behavior",
    overview: "A computer virus is malicious code that replicates and hides inside other programs, usually without the user's knowledge. It infects other programs by modifying them and can spread like a biological virus.",
    keyPoints: [
      "A virus is a piece of software that can infect other programs by modifying them.",
      "It replicates and spreads, and may cause serious damage such as erasing files.",
      "The defining relationship in the slides is that a virus attaches to or modifies a host program."
    ]
  },
  {
    title: "4. Four phases in a virus's life cycle",
    overview: "The lecture describes four phases: dormant, propagation, triggering and execution.",
    keyPoints: [
      "Dormant phase: the virus is idle. It may later be activated by a date, the presence of another program or file, or disk capacity exceeding a limit.",
      "Propagation phase: the virus places an identical copy of itself into other programs or selected disk system areas. Each infected program contains a clone that can propagate.",
      "Triggering phase: the virus is activated to perform the function for which it was intended. System events may cause the trigger.",
      "Execution phase: the intended function is carried out. It may be harmless (for example, displaying a message) or damaging (for example, destroying programs or data files)."
    ],
    examFocus: "Keep the order exact: dormant → propagation → triggering → execution."
  },
  {
    title: "5. Types of viruses",
    overview: "The slides distinguish virus types by where they attach, where they reside or how they evade detection.",
    keyPoints: [
      "Parasitic virus: the traditional and still most common form; it attaches to executable files and replicates.",
      "Memory-resident virus: resides in main memory as part of a resident system program and can infect every program that executes afterward.",
      "Boot-sector virus: infects a master boot record or boot record and spreads when a system is booted from a disk containing the virus.",
      "Stealth virus: is designed to hide from antivirus detection. The slide gives compression as an example of making an infected program the same length as its uninfected version.",
      "Polymorphic virus: mutates with each infection, making signature-based detection difficult.",
      "Metamorphic virus: also mutates with each infection, but rewrites itself completely at each iteration and may change behavior as well as appearance."
    ],
    examFocus: "Polymorphic changes its form; metamorphic rewrites itself completely and may change behavior too."
  },
  {
    title: "6. Macro viruses and email viruses",
    overview: "The lecture highlights macro viruses and email viruses as examples of viruses that spread through documents and attachments.",
    keyPoints: [
      "Macro viruses are described as platform independent. The slides say virtually all macro viruses infect Microsoft documents and that email is a common spreading method.",
      "Melissa is given as an email-virus example. It used a Microsoft Word macro embedded in an attachment.",
      "When the recipient opened the attachment, the Word macro activated, sent itself to everyone on the user's email mailing list and caused local damage."
    ],
    example: "A recipient opens an unexpected document attachment; its embedded macro activates and sends copies to contacts. This follows the lecture's Melissa example."
  },
  {
    title: "7. Worms",
    overview: "A worm is malware that replicates itself and spreads to different computers through a network. Unlike a virus, it does not need a host program to replicate from one computer to another.",
    keyPoints: [
      "The lecture says the main objective of worms is to consume system resources such as memory and bandwidth.",
      "Resource consumption can slow a system so much that it stops responding.",
      "The slides state that worms can be controlled remotely.",
      "The listed symptoms are slow computer performance, automatic opening and running of programs, emails sent without the user's knowledge, reduced web-browser performance and operating-system or system error messages.",
      "The lecture says antivirus software and firewalls can detect and remove worms."
    ],
    examFocus: "Virus attaches to a host program; a worm is independent and spreads over a network."
  },
  {
    title: "8. Logic bombs",
    overview: "A logic bomb is code embedded in a legitimate program that is set to activate when specified conditions are met.",
    keyPoints: [
      "Triggers can include the presence or absence of certain files, a particular day or date, or a particular user running the application.",
      "Once triggered, it may alter or delete data or entire files, halt a machine or cause other damage.",
      "The trigger condition is the key identifying feature."
    ],
    example: "A hidden instruction inside a legitimate payroll program activates on a specified date and deletes files. The date is the trigger."
  },
  {
    title: "9. Trojan horses and their classifications",
    overview: "A Trojan horse is a malicious program that misrepresents itself as useful or interesting to persuade a victim to install it. It claims to do one thing but performs harmful actions when run.",
    keyPoints: [
      "The lecture's example is a program presented as a game that instead damages the computer, potentially erasing a hard disk.",
      "Trojan horses do not replicate themselves like viruses.",
      "Remote-access Trojans enable unauthorized remote access.",
      "Data-sending Trojans send sensitive data, such as passwords, to a threat actor.",
      "Destructive Trojans corrupt or delete files.",
      "Proxy Trojans use the victim's computer as the source device for attacks or other illegal activity.",
      "FTP Trojans enable an unauthorized file-transfer service on end devices.",
      "Security-software-disabler Trojans stop antivirus programs or firewalls from functioning.",
      "DoS Trojans slow or halt network activity.",
      "Keyloggers record keystrokes entered into forms and may steal confidential information such as credit-card numbers."
    ],
    examFocus: "The Trojan is identified by disguise and deceptive installation; the classification names describe the capability or damage."
  },
  {
    title: "10. Spyware",
    overview: "Spyware is software placed on a computer, typically without the user's knowledge, that reports information about the user's activities.",
    keyPoints: [
      "Some spyware operates through monitoring cookies.",
      "The lecture describes spyware as software that spies on what a user does on a computer.",
      "Examples listed on the slide are simple cookies, mobile codes, web crawlers and Xerox.",
      "Information gathered can include websites visited, browser and system information, and the computer's IP address."
    ],
    examFocus: "Know the definition and the information categories the slide says may be collected."
  },
  {
    title: "11. Ransomware",
    overview: "Ransomware is malware that denies access to an infected computer system or its data and demands payment to release the system. The slides describe it as highly dominant and profitable.",
    keyPoints: [
      "Ransomware frequently uses encryption to encrypt system files and data.",
      "The lecture says payments are typically made in Bitcoin because users can remain anonymous.",
      "Email and malicious advertising (malvertising) are listed as campaign vectors.",
      "Social engineering is also used.",
      "The slides note that there are dozens of ransomware variants."
    ],
    examFocus: "Recognize the combination of denied access, encrypted data and a ransom demand."
  },
  {
    title: "12. Spam (junk mail) and prevention",
    overview: "Spam is unwanted junk mail sent to email inboxes. The slides state that anyone using email is likely to receive spam and describe ways spammers obtain addresses.",
    keyPoints: [
      "Address sources listed include web searches, sending test emails and exchanging or buying addresses from other spammers.",
      "Do not reply to junk emails.",
      "Do not open files or executable attachments from suspicious junk email.",
      "Delete malicious email immediately.",
      "Do not publish your actual email address on websites.",
      "The slides name antivirus products such as Norton and McAfee as examples of products that include spam protection and recommend spam-filtering applications.",
      "The Chapter 2 quiz associates spamming attacks that prevent legitimate activity through a flood of messages with denial of service."
    ]
  },
  {
    title: "13. Three classes of network attacks",
    overview: "The lecture lists three common classes of attack in today's network environment.",
    keyPoints: [
      "Reconnaissance attacks survey a network and gather information for a future attack.",
      "Access attacks attempt to gain unauthorized access to another user account or network device.",
      "Denial-of-service attacks deny a service normally available to a user or organization."
    ],
    examFocus: "Classify an attack by its primary purpose: gather information, gain unauthorized access or deny service."
  },
  {
    title: "14. Reconnaissance attacks",
    overview: "A reconnaissance attacker surveys a network and collects information that may support a later attack.",
    keyPoints: [
      "Information gathered can include open ports on servers and firewalls, IP addresses on the host network and hostnames associated with IP addresses.",
      "The four subcategories named are packet sniffers, ping sweeps, port scans and information queries.",
      "Packet sniffers are also called network monitors, network analyzers, packet analyzers or Ethernet sniffers. They can be software or hardware with software; they capture network traffic, which is decoded and analyzed. Wireshark (formerly Ethereal) is given as an example.",
      "Ping validates whether an IP address exists and can accept requests by sending an echo request and waiting for an echo reply. A ping sweep sends echo requests to many host IP addresses to identify responding hosts.",
      "A port scanner surveys a host network for open ports. Since ports are associated with applications, open-port information can help an attacker identify possible ways to attack.",
      "Information queries can resolve hostnames from IP addresses or IP addresses from hostnames. The slides give nslookup as a common query and show running nslookup followed by a hostname or IP address in Command Prompt."
    ],
    examFocus: "Sniffer = capture traffic; ping sweep = find responding hosts; port scan = find open ports; nslookup = resolve names and addresses."
  },
  {
    title: "15. Access attacks",
    overview: "An access attack attempts to reach another user's account or a network device through improper means. The administrator is responsible for ensuring that only authorized users access the network.",
    keyPoints: [
      "The slides list four methods that attempt to bypass some part of authentication: password attacks, trust exploitation, port redirection and man-in-the-middle attacks.",
      "Password attacks target passwords configured on routers, switches or other systems. If a password is cracked, an attacker may access and change configurations, take down the network or redirect traffic to another computer where it can be read, replayed, altered or destroyed.",
      "Trust exploitation occurs when an attacker elevates privileges. The slide's example is a user with limited network access exploiting an application to gain administrator access.",
      "Trust exploitation can rely on the trust a client has in a server or the trust a server has in a client.",
      "Port redirection uses a machine with internal-network access to pass traffic through a firewall or ACL port that would normally deny it. It can bypass security measures and create a communication tunnel; a session-redirection intrusion tool may be installed on the compromised system.",
      "A man-in-the-middle attacker places themselves between two legitimate communicating entities and can read or modify the exchanged data."
    ],
    examFocus: "Be able to distinguish the four access-attack methods and explain what is being bypassed."
  },
  {
    title: "16. Denial-of-service attacks",
    overview: "A denial-of-service attack is intended to deny users or organizations a service that would normally be available. A common method described is flooding the target with a very large number of requests over the web or network.",
    keyPoints: [
      "The slides mention teardrop as an example that can crash a system by driving CPU usage to 100%.",
      "The listed forms include distributed DoS (DDoS), TCP SYN attack and Smurf attack.",
      "A DDoS uses multiple compromised systems to attack one target. The compromised systems are called zombies or slaves; valid users then lose service.",
      "A TCP SYN attack exploits the TCP three-way handshake. A SYN request is sent with a spoofed source IP; the attacking system does not acknowledge the resulting SYN-ACK. The session queues can fill and stop accepting new connection requests.",
      "The slide states that TCP intercept can be configured on a router to block a SYN attack by terminating sessions that are not established within an allotted time.",
      "A Smurf attack uses misconfigured network devices that forward packets to all hosts through a network broadcast address. It is an amplification attack.",
      "In the slide's Smurf scenario, malware sends a fake echo request with a spoofed source address equal to the target server; the request goes to an intermediate broadcast network; all hosts receive it; each sends an ICMP response to the spoofed target; enough responses can bring the target down."
    ],
    examFocus: "SYN flood = incomplete handshake/connection queue; DDoS = many compromised sources; Smurf = broadcast amplification using spoofed source IP."
  },
  {
    title: "17. Program security flaws",
    overview: "A program security flaw is undesired program behavior caused by a program vulnerability. The lecture cites IEEE Standard 729 for three quality-related terms.",
    keyPoints: [
      "Error: a human mistake in a software-related activity such as specification or coding.",
      "Fault: an incorrect step, command, process or data definition in software.",
      "Failure: a departure from the system's desired behavior.",
      "Non-malicious flaws are introduced when a programmer overlooks something. The lecture lists buffer overflow, incomplete mediation and time-of-check to time-of-use (TOCTTOU) errors.",
      "Malicious flaws are introduced deliberately, possibly by exploiting a non-malicious vulnerability. Examples listed are virus, worm, rabbit, Trojan horse, trapdoor, logic bomb and time bomb."
    ],
    examFocus: "Error is the human mistake; fault is the incorrect software element; failure is the observable departure from desired behavior."
  },
  {
    title: "18. Buffer overflow attacks",
    overview: "A buffer (array or string) is a memory space that holds data. Since memory is finite, a buffer has a finite capacity.",
    keyPoints: [
      "A buffer overflow occurs when a process writes more data to a fixed-length memory block than the block is permitted to hold.",
      "The excess data may occupy adjacent memory addresses.",
      "The lecture says attackers may use the excess data in adjacent addresses as a starting point for an attack.",
      "The quiz example is specially crafted, excessively long input in a field."
    ],
    example: "A form field expects a short value but accepts a much longer string than its buffer can hold. The key concept being tested is writing beyond the buffer's allowed capacity."
  },
  {
    title: "19. Incomplete mediation",
    overview: "Incomplete mediation occurs when an application accepts incorrect or insufficiently checked data from a user or another system component.",
    keyPoints: [
      "The slide uses an excessively long date-of-birth input as a possible buffer-overflow example.",
      "It also uses a date-of-birth field containing SQL text such as a DROP DATABASE statement to illustrate SQL injection.",
      "Data exchanged between system components, such as a web client and server, may be compromised or altered.",
      "The GET URL example includes a user and an operation parameter. An attacker who intercepts and changes the operation from viewaccount to changepassword can confuse the server or cause invalid behavior.",
      "The essential weakness is accepting data or requests without sufficiently verifying that they are valid and authorized."
    ],
    examFocus: "Distinguish incomplete input validation/mediation from a buffer overflow: they can be related in an example, but they name different flaws."
  },
  {
    title: "20. Time-of-check to time-of-use (TOCTTOU)",
    overview: "TOCTTOU errors are also known as race-condition errors. They occur when a system that is designed to handle tasks in a specific sequence is forced to handle two or more operations concurrently, creating a gap between a check and the later use.",
    keyPoints: [
      "The attack exploits the time gap between when a service or operation is initiated and when a security control takes effect.",
      "The lecture says this attack depends on multithreaded applications.",
      "It may involve interference by an untrusted process that slips into a sequence between steps of a secure program.",
      "It may also involve interference by a trusted process that may have the same privileges.",
      "Without proper controls, different processes can interfere with each other.",
      "The race-condition quiz describes several processes accessing and manipulating the same data concurrently."
    ],
    example: "A program checks that a file is safe, but before it uses the file, another process changes what the file refers to. The check and use no longer apply to the same state."
  },
  {
    title: "21. Controls against program flaws",
    overview: "The lecture groups controls against program flaws into software development controls, operating-system controls, administrative controls and database security.",
    keyPoints: [
      "Software-development controls focus on creating software that is easier to review, test and manage.",
      "Operating-system controls protect the system and its execution environment.",
      "Administrative controls define standards and responsibilities.",
      "Database security controls protect database users, data, activity, network exposure and stored files or backups."
    ]
  },
  {
    title: "22. Software-development controls",
    overview: "The slides connect secure software development to core software-engineering principles, review, hazard analysis, testing and configuration management.",
    keyPoints: [
      "Modularity makes software easier to review and test.",
      "Encapsulation exposes only well-defined interfaces.",
      "Data hiding shares only inputs and outputs, not the internal process.",
      "Peer review allows others to inspect the work.",
      "Hazard analysis identifies risky application states. The slide also lists change process, more edits and more auditing in this context.",
      "Black-box testing examines input and output without relying on internal code visibility.",
      "The slide calls the code-aware approach Clear-Box testing: the reviewer can analyze code and develop scenarios.",
      "Configuration management provides code control."
    ],
    examFocus: "Black-box = test using inputs/outputs; Clear-Box = inspect code and build test scenarios."
  },
  {
    title: "23. Administrative controls",
    overview: "Administrative controls enforce consistent standards and divide responsibilities.",
    keyPoints: [
      "Standards should cover design, documentation, coding and testing.",
      "Separation of duties is also listed as an administrative control."
    ],
    example: "Separating development, approval and deployment responsibilities reduces the chance that one person can make and release an unchecked change."
  },
  {
    title: "24. Protecting operating systems",
    overview: "The lecture lists four common operating-system protection techniques.",
    keyPoints: [
      "Use antivirus software and other endpoint-protection measures.",
      "Install regular operating-system patches and updates.",
      "Use a firewall to monitor network traffic.",
      "Enforce secure access through least privilege and user controls."
    ],
    examFocus: "Remember all four controls: endpoint protection, patching, firewall monitoring and least privilege/user controls."
  },
  {
    title: "25. Database security: accounts and access",
    overview: "Database security begins with actively managing passwords and user access.",
    keyPoints: [
      "Enforce strong passwords.",
      "The slide states that password hashes must be salted and stored encrypted; this is the wording used in the provided lecture.",
      "Lock accounts after multiple login attempts.",
      "Review accounts regularly and deactivate them when staff change roles, leave the company or no longer need the same access level."
    ]
  },
  {
    title: "26. Database security: testing and monitoring",
    overview: "The slides recommend testing database security and monitoring activity in real time.",
    keyPoints: [
      "Penetration testers should investigate and remediate vulnerabilities quickly.",
      "Run a penetration test on a critical database system at least once per year.",
      "Use real-time database monitoring.",
      "File Integrity Monitoring (FIM) can log actions carried out on the database server and alert administrators to potential breaches."
    ]
  },
  {
    title: "27. Database security: firewalls and physical protection",
    overview: "Database security includes filtering malicious application traffic and protecting the physical infrastructure and backups.",
    keyPoints: [
      "A Web Application Firewall (WAF) operates at Layer 7, detects malicious web-application traffic such as SQL-injection attacks and blocks it before it harms the database.",
      "Physical access to database servers should be logged and granted only to authorized individuals.",
      "Do not leave database backups in publicly accessible locations such as temporary partitions, web folders or unsecured cloud-storage buckets."
    ]
  },
  {
    title: "28. Database security: patching, network exposure and encryption",
    overview: "The final slides add database-server patching, restricting public network access and encrypting important files and backups.",
    keyPoints: [
      "Regularly patch database servers by deploying up-to-date service packs, critical security hotfixes and cumulative updates.",
      "Block public network access to database servers unless the organization is a hosting provider.",
      "For remote administrators, the slides recommend gateway servers such as VPN or SSH tunnels.",
      "Encrypt important application files, data files and backups so unauthorized users cannot read critical data."
    ],
    examFocus: "Keep database controls grouped: identity/access, test/monitor, WAF/physical security, patch/network restriction and encryption."
  },
  {
    title: "29. Chapter 2 lecture-quiz themes",
    overview: "The slide deck contains short questions throughout the chapter on spam/DoS, SYN flooding, DoS identification, buffer overflow, deduplication, race conditions, operating-system controls and employee termination.",
    keyPoints: [
      "A large volume of unsolicited messages that prevents legitimate activity is associated with denial of service.",
      "A SYN flood exploits TCP's three-way handshake.",
      "Among the listed examples, spoofing is not itself identified as a DoS attack in the slide quiz.",
      "Oversized crafted input to a field points to buffer overflow.",
      "Deduplication is the slide's best solution for redundant, unusable data filling storage.",
      "A race condition involves several processes accessing and manipulating the same data concurrently.",
      "The operating-system security-interface quiz asks about the reference monitor, Trusted Computing Base, time separation and security kernel; the deck does not mark an answer on that slide.",
      "The employee-termination question gives a scenario about disabling network access just before informing the employee; it is presented as a multiple-choice question without an answer marked in the deck."
    ],
    examFocus: "For the two final unmarked quiz slides, do not assume an answer from the PDF: review the underlying concepts and check the instructor's expected answer."
  }
];

const chapter2Short: StudyTopic[] = [
  { title: "1. Malicious code", overview: "Unauthorized code intended to harm, breach security, disrupt systems or distress users.", keyPoints: ["Examples: virus, worm, logic bomb, Trojan, spyware, spam/scam, Slammer, telecom/e-payment fraud."] },
  { title: "2. Malicious-code classifications", overview: "Host-dependent vs independent; non-replicating vs replicating.", keyPoints: ["Host-dependent: virus, logic bomb. Independent: worm, zombie.", "Non-replicating: logic bomb, zombie. Replicating: virus, worm."] },
  { title: "3. Virus", overview: "Replicates and hides in/modifies other programs; may damage files.", keyPoints: ["Phases: dormant → propagation → triggering → execution."] },
  { title: "4. Virus types", overview: "Parasitic, memory-resident, boot-sector, stealth, polymorphic and metamorphic.", keyPoints: ["Parasitic attaches to executables; memory-resident stays in RAM; boot-sector infects boot records.", "Stealth hides; polymorphic mutates each infection; metamorphic rewrites itself completely."] },
  { title: "5. Macro and email viruses", overview: "Macro viruses infect documents and commonly spread by email; Melissa used an embedded Word macro.", keyPoints: ["Opening the attachment activated it; it emailed itself to mailing-list contacts and caused local damage."] },
  { title: "6. Worm", overview: "Independent malware that replicates across networks without a host program.", keyPoints: ["Consumes memory/bandwidth; may slow or stop response; can be remotely controlled.", "Symptoms: slow system/browser, auto-running programs, emails sent without knowledge, system errors.", "Slides mention antivirus and firewall."] },
  { title: "7. Logic bomb", overview: "Code hidden in a legitimate program and activated by a condition.", keyPoints: ["Triggers: file presence/absence, date/day, particular user.", "May alter/delete files, halt machine or cause damage."] },
  { title: "8. Trojan horse", overview: "Malware disguised as useful/interesting software; does not replicate like a virus.", keyPoints: ["Types: remote-access, data-sending, destructive, proxy, FTP, security-software disabler, DoS and keylogger."] },
  { title: "9. Spyware", overview: "Usually hidden software that reports user activity.", keyPoints: ["May use cookies; gathers visited sites, browser/system details and IP address.", "Slide examples: cookies, mobile code, web crawlers and Xerox."] },
  { title: "10. Ransomware", overview: "Denies access to a system/data and demands payment.", keyPoints: ["Often encrypts files; slides mention Bitcoin, email, malvertising and social engineering."] },
  { title: "11. Spam", overview: "Unwanted junk email; addresses may be collected by web search, test emails, buying or exchanging.", keyPoints: ["Don't reply/open attachments; delete malicious mail; don't publish address; use filtering."] },
  { title: "12. Attack classes", overview: "Reconnaissance gathers information; access attacks gain unauthorized access; DoS denies service.", keyPoints: ["Remember the purpose of each class."] },
  { title: "13. Reconnaissance", overview: "Collect network information for a future attack.", keyPoints: ["Sniffer captures/decodes traffic; ping sweep finds responding IPs; port scan finds open ports; nslookup resolves host/IP."] },
  { title: "14. Access attacks", overview: "Improper attempts to access accounts/devices; methods bypass authentication.", keyPoints: ["Password cracking; trust exploitation/privilege elevation; port redirection/tunnel; man-in-the-middle read/modify."] },
  { title: "15. DoS attacks", overview: "Flooding or another method prevents normal service.", keyPoints: ["DDoS uses zombie/slave machines; SYN flood leaves handshake incomplete and fills queues; Smurf uses spoofed echo request and broadcast amplification; teardrop is listed."] },
  { title: "16. Program security flaws", overview: "Undesired behavior due to a vulnerability.", keyPoints: ["Error = human mistake; Fault = incorrect software step/command/process/data; Failure = departure from desired behavior.", "Non-malicious examples: buffer overflow, incomplete mediation, TOCTTOU. Malicious examples: virus, worm, rabbit, Trojan, trapdoor, logic/time bomb."] },
  { title: "17. Buffer overflow", overview: "Writing more data to a fixed-length memory buffer than it can hold.", keyPoints: ["Excess may occupy adjacent memory and can be used as a starting point for attacks."] },
  { title: "18. Incomplete mediation", overview: "Application accepts incorrect or insufficiently checked data.", keyPoints: ["Examples: oversized DOB field, SQL injection, altered URL operation parameter."] },
  { title: "19. TOCTTOU / race condition", overview: "Timing gap between check and use lets concurrent processes interfere.", keyPoints: ["Depends on multithreading; interference may come from untrusted or similarly privileged trusted processes."] },
  { title: "20. Program-flaw controls", overview: "Software-development, operating-system, administrative and database controls.", keyPoints: ["Software: modularity, encapsulation, data hiding, peer review, hazard analysis, testing, configuration management.", "Administrative: standards and separation of duties.", "OS: antivirus, patches, firewall, least privilege/user controls."] },
  { title: "21. Database access", overview: "Strong passwords, salted hashes (slide wording: stored encrypted), lockout, periodic access review and deactivation.", keyPoints: ["Review when staff change roles, leave or no longer need access."] },
  { title: "22. Database monitoring and testing", overview: "Pen-test critical databases at least annually; investigate and remediate findings; use real-time monitoring and FIM alerts.", keyPoints: ["FIM logs database-server activity and alerts possible breaches."] },
  { title: "23. Database perimeter and physical security", overview: "Use WAF at Layer 7; log and restrict physical server access; secure backup storage.", keyPoints: ["WAF can detect/block SQL-injection traffic; avoid public backup folders or unsecured cloud storage."] },
  { title: "24. Database patching and data protection", overview: "Patch database servers, block public access, use VPN/SSH gateways for remote admins, and encrypt important files/backups.", keyPoints: ["Keep application files, data files and backups protected from unauthorized reading."] }
];

const chapter2Summary: SummaryTopic[] = [
  { title: "Malicious code", description: "Definition, purpose and examples." },
  { title: "Malicious-software classifications", description: "Host dependency and replication." },
  { title: "Viruses", description: "Definition, infection and lifecycle." },
  { title: "Types of viruses", description: "Parasitic, memory-resident, boot-sector, stealth, polymorphic and metamorphic." },
  { title: "Macro and email viruses", description: "Document macros, email attachments and Melissa." },
  { title: "Worms", description: "Independent network replication, resource use and symptoms." },
  { title: "Logic bombs", description: "Condition-triggered malicious code." },
  { title: "Trojan horses", description: "Disguise and eight Trojan classifications." },
  { title: "Spyware", description: "Monitoring user activity and gathered information." },
  { title: "Ransomware", description: "Access denial, encryption, ransom and delivery vectors." },
  { title: "Spam", description: "Junk mail, address collection and prevention." },
  { title: "Three classes of attacks", description: "Reconnaissance, access and denial of service." },
  { title: "Reconnaissance", description: "Packet sniffers, ping sweeps, port scans and information queries." },
  { title: "Access attacks", description: "Password, trust exploitation, port redirection and man-in-the-middle." },
  { title: "DoS attacks", description: "DDoS, TCP SYN, Smurf and teardrop." },
  { title: "Program security flaws", description: "Error, fault, failure; malicious and non-malicious flaws." },
  { title: "Buffer overflow", description: "Writing beyond fixed buffer capacity." },
  { title: "Incomplete mediation", description: "Accepting incorrect or insufficiently validated data." },
  { title: "TOCTTOU", description: "Race condition and interference between check and use." },
  { title: "Controls against program flaws", description: "Software, operating-system, administrative and database controls." },
  { title: "Software-development controls", description: "Modularity, encapsulation, data hiding, review, hazard analysis, testing and configuration management." },
  { title: "Administrative controls", description: "Standards and separation of duties." },
  { title: "Operating-system protection", description: "Antivirus, patches, firewall, least privilege and user controls." },
  { title: "Database security", description: "Identity, access, testing, monitoring, WAF, physical protection, patching, network restrictions and encryption." }
];

const chapter2Interactive: InteractiveScenario[] = [
  {
    id: "virus-or-worm",
    title: "Virus or worm?",
    situation: "A malicious program copies itself from one computer to other computers over a network. It does not attach itself to another application or need a host program.",
    question: "Which type of malicious code best fits the lecture's definition?",
    options: ["Virus", "Worm", "Logic bomb", "Trojan horse"],
    answerIndex: 1,
    explanation: "A worm is independent and spreads through a network without needing a host program. A virus infects or modifies other programs.",
    takeaway: "Host-program dependence is the key distinction between a virus and a worm in this chapter."
  },
  {
    id: "bomb-trigger",
    title: "Find the trigger",
    situation: "A hidden code fragment is placed inside a legitimate application. It remains inactive until a particular date, when it deletes specified files.",
    question: "Which malicious-code type is described?",
    options: ["Spyware", "Logic bomb", "Memory-resident virus", "Packet sniffer"],
    answerIndex: 1,
    explanation: "A logic bomb is embedded in a legitimate program and activates when a specified condition, such as a date, is met.",
    takeaway: "A condition or trigger is the defining feature of a logic bomb."
  },
  {
    id: "trojan-match",
    title: "Match the Trojan capability",
    situation: "A fake utility records the keys typed by a user into an online payment form and sends that information to an attacker.",
    question: "Which Trojan classification from the slide best fits?",
    options: ["FTP Trojan", "Proxy Trojan", "Keylogger", "Security-software disabler"],
    answerIndex: 2,
    explanation: "A keylogger records keystrokes and can steal confidential information such as payment-card details.",
    takeaway: "Keyloggers focus on capturing what a user types."
  },
  {
    id: "recon-lab",
    title: "Choose the reconnaissance tool",
    situation: "A network administrator wants to determine which computers in a subnet respond to an ICMP echo request.",
    question: "Which reconnaissance technique matches the task?",
    options: ["Port redirection", "Ping sweep", "Keylogging", "DDoS"],
    answerIndex: 1,
    explanation: "A ping sweep sends echo requests to multiple host IP addresses to identify responding systems.",
    takeaway: "Ping sweep discovers responsive hosts; port scanning looks for open ports."
  },
  {
    id: "mitm-lab",
    title: "Spot the access attack",
    situation: "An attacker positions themselves between a customer and a bank. The attacker can read and change the data exchanged between them.",
    question: "Which access-attack technique is this?",
    options: ["Trust exploitation", "Man-in-the-middle", "Ping sweep", "Buffer overflow"],
    answerIndex: 1,
    explanation: "A man-in-the-middle attacker places themselves between two legitimate entities and reads or modifies their communication.",
    takeaway: "The attacker is positioned in the communication path."
  },
  {
    id: "smurf-lab",
    title: "Trace the amplification",
    situation: "An attacker sends an echo request with a forged source address to an intermediate network's broadcast address. Many hosts reply to the forged address, overwhelming the target.",
    question: "Which DoS technique is being simulated?",
    options: ["TCP SYN flood", "Smurf attack", "Teardrop", "Port scan"],
    answerIndex: 1,
    explanation: "A Smurf attack uses spoofed ICMP echo requests and a broadcast network so many hosts send replies to the target.",
    takeaway: "Smurf = spoofed source + broadcast + many ICMP replies."
  },
  {
    id: "race-condition-lab",
    title: "Find the timing weakness",
    situation: "A service checks a file's permissions. Before the service opens the file, another process changes the file reference. The service then uses a different file than the one it checked.",
    question: "Which program flaw does this demonstrate?",
    options: ["Buffer overflow", "TOCTTOU / race condition", "Macro virus", "Spam"],
    answerIndex: 1,
    explanation: "The check and use are separated by a time gap in which another process interferes. This is a TOCTTOU race condition.",
    takeaway: "TOCTTOU means the checked state can change before the resource is used."
  },
  {
    id: "database-layer7",
    title: "Protect a web-facing database",
    situation: "A web application is receiving SQL-injection traffic. The organization wants a control that operates at application Layer 7 and can detect and block malicious web requests before they reach the database.",
    question: "Which control is specifically described in the lecture?",
    options: ["WAF", "Ping sweep", "Boot-sector scanner", "Data deduplication"],
    answerIndex: 0,
    explanation: "The slide says a Web Application Firewall operates at Layer 7 and can detect and block malicious web-application traffic such as SQL injection.",
    takeaway: "A WAF filters web-application traffic before it can harm the database."
  },
  {
    id: "database-exit",
    title: "Close access when a role changes",
    situation: "An employee moves to a new role and no longer needs access to a sensitive database. The old account permissions are still active.",
    question: "Which database-security practice from the slides should be applied?",
    options: ["Keep every old permission", "Review accounts and deactivate or adjust access", "Publish the database backup", "Disable all database patches"],
    answerIndex: 1,
    explanation: "The lecture says accounts should be reviewed regularly and deactivated or adjusted when staff move roles, leave or no longer need the same access.",
    takeaway: "Access should track current job responsibilities and need."
  }
];

export const chapter2: ChapterLearningContent = {
  id: "chapter2",
  title: "Chapter 2 — Computer Threat",
  subtitle: "Information Assurance & Security",
  studyNotes: chapter2Notes,
  shortNotes: chapter2Short,
  summary: chapter2Summary,
  interactive: chapter2Interactive,
  quizzes: chapter2QuizBank
};

export const chapterMap = {
  chapter1,
  chapter2
} as const;
