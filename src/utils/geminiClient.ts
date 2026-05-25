/**
 * Client-Side AI & Simulator Hub
 * Bypasses backend API dependencies so the React application operates as a standalone SPA.
 */

export interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export interface ParseResult {
  name: string;
  role: string;
  matchScore: string;
  keySkills: string[];
  highlights: string[];
}

/**
 * Handles Sourcing Chat assistant queries entirely client-side
 */
export async function simulateChatResponse(
  messages: ChatMessage[],
  userRole: string,
  companyName: string
): Promise<string> {
  // Add a slight latency to simulate network/AI deliberation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lastMsgObject = messages[messages.length - 1];
  const lastMsg = lastMsgObject?.text?.toLowerCase() || "";

  if (lastMsg.includes("react")) {
    return `I have located Staff React Architect Nolan Vasquez on our hotlist bench (98.2% Sourcing alignment). You can find his generated recruiter outreach email template ready in the "Email Generator" tab on the right panel. Let me know if you would like me to schedule a technical screening log.`;
  }
  
  if (lastMsg.includes("vendor") || lastMsg.includes("sourcing")) {
    return `Scanning connected VMS catalogs for ${companyName}... Synapse Sourcing, IT Elite Partners, and NextGen staffing leads are highly scored for contract delivery in your current region with 100% credential compliance.`;
  }

  if (lastMsg.includes("java")) {
    return `Checking active bench... I found principal cloud specialist Srinivasan Naidu with 8 years of Java 21 & Apache Kafka expertise. High qualification scores logged for enterprise scale pipeline workloads.`;
  }

  if (lastMsg.includes("devops") || lastMsg.includes("aws") || lastMsg.includes("kubernetes")) {
    return `Vetting DevOps candidate pools: Found Ethan Vance (Staff DevOps Architect, 10 Years EXP). Experienced with Terraform, automated pipeline isolation, and secure AWS multi-region cluster rollouts.`;
  }

  return `Hello! As a ${userRole} at ${companyName}, I have processed your inquiry: "${lastMsgObject?.text}". Try querying about candidates like "React developers", "Java recruiters", "DevOps specialists", or asking about "Vendor compliance statuses" to test our hotbench calibration rules.`;
}

/**
 * Parses resume profiles client-side
 */
export async function simulateResumeParse(
  resumeText: string,
  fileName: string
): Promise<ParseResult> {
  // Add parsing latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const text = resumeText.toLowerCase();

  if (text.includes("clara vance")) {
    return {
      name: "Clara Vance",
      role: "Senior Full Stack React Engineer",
      matchScore: "96/100",
      keySkills: ["React 19", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL"],
      highlights: [
        "Guided high fidelity UI design transformations at scale.",
        "Implemented speed-optimized router layouts for transactional portals.",
        "Reduced client-side state latency figures by 40% with memoization."
      ]
    };
  }

  if (text.includes("ethan vance")) {
    return {
      name: "Ethan Vance",
      role: "Staff DevOps Architect",
      matchScore: "94/100",
      keySkills: ["Kubernetes", "AWS Cloud", "Terraform", "Docker Core", "Python API"],
      highlights: [
        "Built isolated production-grade cluster orchestration nodes.",
        "Reduced developers environment staging setup timers by 75%.",
        "Migrated petabyte-scale cloud storage structures with zero downtime."
      ]
    };
  }

  if (text.includes("srinivasan naidu")) {
    return {
      name: "Srinivasan Naidu",
      role: "Principal Cloud Java Specialist",
      matchScore: "98/100",
      keySkills: ["Java 21", "Spring Boot", "Apache Kafka", "Docker Core", "Kubernetes"],
      highlights: [
        "Engineered ultra low latency capital transactions infrastructure.",
        "Scaled highly reliable heavy-load message event brokers.",
        "Mentored dual timezone agile engineering squads successfully."
      ]
    };
  }

  // Fallback parsed response
  const inferredName = fileName
    ? fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
    : "Alexander Reid";
  
  return {
    name: inferredName.charAt(0).toUpperCase() + inferredName.slice(1),
    role: "Senior Solutions Delivery Architect",
    matchScore: "95/100",
    keySkills: ["Cloud architecture", "TypeScript", "Node.js", "Docker", "Kubernetes"],
    highlights: [
      "Secured application pipelines using granular credential controls.",
      "Optimized React bundle sizes and offline-first local cache states.",
      "Vetted external APIs to establish secure container architectures."
    ]
  };
}

/**
 * Synthesizes recruiters outreach email drafts client-side
 */
export async function simulateEmailGeneration(
  candidateName: string,
  roleTrack: string,
  contextNotes: string,
  companyName: string
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return `Subject: Sourcing Pipeline Discovery - ${roleTrack} Match clearance
  
Dear Hiring Manager,

I wanted to share direct hotbench candidate discovery profiles vetted within our staffing network that align perfectly with your active requisitions:

• Profile Identified: ${candidateName}
• Target Alignment: ${roleTrack}
• Core Performance Context: ${contextNotes || "High integrity consultant ready for immediate integration project delivery."}

These benchmarks align fully with our standard master services agreement structures. Please let me know your level of interest, and I can coordinate direct interviews with the candidates immediately.

Best regards,

Staffing Lead
${companyName}`;
}
