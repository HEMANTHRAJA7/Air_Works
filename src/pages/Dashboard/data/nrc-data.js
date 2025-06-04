import Image from "../../../assets/logo.jpg"
import Image2 from "../../../assets/image.png"
import Image3 from "../../../assets/image.webp"
import Image4 from "../../../assets/draw2.jpg"


export const mockNrcData = [
  {
    id: "nrc-001",
    nrcNumber: "NRC-2024-001",
    status: "pending",
    priority: "critical",
    aircraftNumber: "VT-ABC",
    aircraftModel: "Boeing 737-800",
    customerName: "Air India Express",
    reportedBy: "John Smith",
    date: "2024-01-15",
    description:
      "Structural crack found in wing panel during routine inspection. Immediate attention required for safety compliance.",
    ata: "57-10",
    subAta: "57-10-01",
    authNo: "AUTH-001",
    tradeToAction: "Structural",
    visitPackage: "VP-2024-001",
    findingFromTaskNo: "TASK-001",
    duplicateInspReq: "No",
    zoneTradeCode: "ZONE-A",
    subTask: "ST-001",
    authorityOfCertification: "DGCA",
    time: "14:30",
    estimatedManHours: "8.5",
    callOuts: [
      {
        id: 1,
        title: "Initial Finding",
        description:
          "During routine inspection of wing panel, a hairline crack was discovered extending approximately 2 inches along the structural beam. The crack appears to be stress-related and requires immediate assessment.",
      },
    ],
    actionsTaken: [
      {
        id: 1,
        title: "Immediate Actions",
        description:
          "Aircraft grounded immediately. Area cordoned off and marked. Engineering team notified. Detailed inspection scheduled.",
      },
    ],
    oemInstructionAttachments: ["Boeing_SB_737-57-1234.pdf", "Inspection_Procedure_WP-001.pdf"],
    maintenanceData:
      "Refer to Boeing Service Bulletin 737-57-1234 for detailed repair procedures. Ensure compliance with all safety protocols.",
    images: [
      Image,
      Image2,
      Image3,
      Image4,
      
    ],
    materials: [
      {
        id: 1,
        description: "Aluminum Alloy Sheet",
        offPartNo: "AL-7075-001",
        offSNo: "SN001",
        reqOnPartNo: "REQ-001",
        reqOnPartType: "Sheet",
        alternatePartNo: "ALT-001",
        onSNo: "ON001",
        docType: "Material Certificate",
        docRefNo: "DOC-001",
        pos: "1",
        availableQty: "5",
        reqQty: "2",
        uom: "SQM",
        usedQty: "0",
        status: "Active",
        needDate: "2024-01-20",
        traceabilityRef: "TRACE-001",
        reason: "Structural repair",
        grnNo: "GRN-001",
        materialIssueNo: "MI-001",
        inward: "IN-001",
        updatedBy: "material.manager@airline.com",
        fileList: "material_cert.pdf",
      },
    ],
    tools: [
      {
        id: 1,
        description: "Torque Wrench",
        toolPartNo: "TW-001",
        toolSerialNo: "TW-SN-001",
        calibrationDate: "2024-01-01",
        needDate: "2024-01-20",
        toolStatus: "Calibrated",
        remarks: "Ready for use",
        updatedBy: "tool.manager@airline.com",
        fileList: "calibration_cert.pdf",
      },
    ],
    feedbackConversations: [
      {
        id: 1,
        customerFeedback:
          "Initial inspection shows potential structural damage on wing panel. Need immediate review and assessment.",
        engineerReply:
          "Acknowledged. Structural team has been notified. Detailed inspection scheduled for tomorrow morning. Will provide update within 24 hours.",
        customerTimestamp: "3 days ago",
        engineerTimestamp: "3 days ago",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        customerFeedback:
          "Follow-up: Additional cracks found during detailed inspection. Requesting priority handling and expedited repair timeline.",
        engineerReply:
          "Priority status confirmed. Repair team assigned. Estimated completion time is 48 hours. Will monitor progress closely.",
        customerTimestamp: "2 days ago",
        engineerTimestamp: "2 days ago",
        createdAt: "2024-01-16T14:15:00Z",
      },
      {
        id: 3,
        customerFeedback:
          "Customer requesting update on repair progress. Aircraft needed for scheduled flight tomorrow.",
        engineerReply:
          "Repair work is 80% complete. On track for completion by end of day. Aircraft will be ready for pre-flight inspection tomorrow morning.",
        customerTimestamp: "1 day ago",
        engineerTimestamp: "1 day ago",
        createdAt: "2024-01-17T09:45:00Z",
      },
      {
        id: 4,
        customerFeedback:
          "Final inspection completed. All repairs look good. Ready for return to service documentation.",
        engineerReply:
          "Excellent. Documentation package being prepared. Aircraft cleared for return to service. All certifications will be ready within 2 hours.",
        customerTimestamp: "4 hours ago",
        engineerTimestamp: "2 hours ago",
        createdAt: "2024-01-18T12:00:00Z",
      },
    ],
  },
  {
    id: "nrc-002",
    nrcNumber: "NRC-2024-002",
    status: "accepted",
    priority: "high",
    aircraftNumber: "VT-DEF",
    aircraftModel: "Airbus A320",
    customerName: "IndiGo",
    reportedBy: "Sarah Johnson",
    date: "2024-01-14",
    description: "Engine oil leak detected during pre-flight inspection. Requires immediate investigation and repair.",
    ata: "72-00",
    subAta: "72-00-01",
    authNo: "AUTH-002",
    tradeToAction: "Powerplant",
    visitPackage: "VP-2024-002",
    findingFromTaskNo: "TASK-002",
    duplicateInspReq: "Yes",
    zoneTradeCode: "ZONE-B",
    subTask: "ST-002",
    authorityOfCertification: "EASA",
    time: "09:15",
    estimatedManHours: "12.0",
    callOuts: [
      {
        id: 1,
        title: "Oil Leak Detection",
        description:
          "Significant oil leak observed from engine compartment during pre-flight check. Leak appears to be from oil filter housing area.",
      },
       {
        id: 2,
        title: "Oil Leak Detection",
        description:
          "Significant oil leak observed from engine compartment during pre-flight check. Leak appears to be from oil filter housing area.",
      },
    ],
    actionsTaken: [
      {
        id: 1,
        title: "Immediate Response",
        description:
          "Flight cancelled. Engine inspection initiated. Oil filter and housing inspected. Replacement parts ordered.",
      },
    ],
    oemInstructionAttachments: ["Airbus_AMM_A320-72-001.pdf"],
    maintenanceData: "Follow Airbus AMM procedures for oil system inspection and repair.",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    materials: [],
    tools: [],
    feedbackConversations: [
      {
        id: 1,
        customerFeedback: "Engine oil leak needs urgent attention. Flight schedule is impacted.",
        engineerReply: "Understood. Engine team is on-site. Leak source identified. Repair in progress.",
        customerTimestamp: "1 day ago",
        engineerTimestamp: "1 day ago",
        createdAt: "2024-01-17T08:30:00Z",
      },
    ],
  },
  {
    id: "nrc-003",
    nrcNumber: "NRC-2024-003",
    status: "rejected",
    priority: "medium",
    aircraftNumber: "VT-GHI",
    aircraftModel: "Boeing 777-300ER",
    customerName: "Air India",
    reportedBy: "Mike Wilson",
    date: "2024-01-13",
    description:
      "Landing gear hydraulic pressure warning during approach. System checked and found within normal parameters.",
    ata: "32-10",
    subAta: "32-10-02",
    authNo: "AUTH-003",
    tradeToAction: "Hydraulics",
    visitPackage: null,
    findingFromTaskNo: "TASK-003",
    duplicateInspReq: "No",
    zoneTradeCode: "ZONE-C",
    subTask: "ST-003",
    authorityOfCertification: "FAA",
    time: "16:45",
    estimatedManHours: "4.0",
    callOuts: [
      {
        id: 1,
        title: "Hydraulic Warning",
        description:
          "Landing gear hydraulic pressure warning light activated during approach phase. Crew followed emergency procedures.",
      },
    ],
    actionsTaken: [
      {
        id: 1,
        title: "System Check",
        description:
          "Comprehensive hydraulic system check performed. All parameters within normal limits. Warning attributed to sensor malfunction.",
      },
    ],
    oemInstructionAttachments: [],
    maintenanceData:
      "System check completed. No further action required. Sensor replacement scheduled for next maintenance cycle.",
    images: [],
    materials: [],
    tools: [],
    feedbackConversations: [
      {
        id: 1,
        customerFeedback: "Hydraulic warning was false alarm. System operating normally.",
        engineerReply: "Confirmed. Sensor issue identified. Will be replaced during next scheduled maintenance.",
        customerTimestamp: "2 days ago",
        engineerTimestamp: "2 days ago",
        createdAt: "2024-01-16T11:20:00Z",
      },
    ],
  },
]
