// Initial NRC data for different time periods
export const nrcDataByPeriod = {
  thisMonth: {
    total: 1248,
    accepted: 742,
    rejected: 186,
    pending: 320,
    growth: 24.5,
    reviewed: 928,
    target: 1500,
  },
  lastMonth: {
    total: 1100,
    accepted: 650,
    rejected: 210,
    pending: 240,
    growth: 18.2,
    reviewed: 860,
    target: 1500,
  },
  custom: {
    // This will be dynamically calculated based on date range
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    growth: 0,
    reviewed: 0,
    target: 1500,
  },
}

// Monthly trend data for the current year
export const monthlyTrendData = [
  { name: "Jan", total: 420, accepted: 300, rejected: 40, pending: 80 },
  { name: "Feb", total: 520, accepted: 350, rejected: 70, pending: 100 },
  { name: "Mar", total: 620, accepted: 400, rejected: 90, pending: 130 },
  { name: "Apr", total: 720, accepted: 450, rejected: 110, pending: 160 },
  { name: "May", total: 820, accepted: 500, rejected: 120, pending: 200 },
  { name: "Jun", total: 920, accepted: 550, rejected: 150, pending: 220 },
  { name: "Jul", total: 1020, accepted: 600, rejected: 170, pending: 250 },
  { name: "Aug", total: 1120, accepted: 650, rejected: 180, pending: 290 },
  { name: "Sep", total: 1220, accepted: 700, rejected: 190, pending: 330 },
  { name: "Oct", total: 1210, accepted: 842, rejected: 186, pending: 182 },
  { name: "Nov", total: 1100, accepted: 722, rejected: 150, pending: 228 },
  { name: "Dec", total: 1248, accepted: 742, rejected: 186, pending: 320 },
]

// Activities data with proper dates
export const activitiesData = [
  {
    id: "NRC-1001",
    title: "New NRC Submission",
    status: "Accepted",
    color: "green",
    note: "Approved by Rakesh Kumar",
    updatedAt: "2025-05-18T00:00:00Z", // This month
    priority: "High",
    department: "Engineering",
  },
  {
    id: "NRC-1002",
    title: "Process Improvement Suggestion",
    status: "Rejected",
    color: "red",
    note: "Rejected by Aryan Singh - Not feasible",
    updatedAt: "2025-05-17T00:00:00Z", // This month
    priority: "Medium",
    department: "Operations",
  },
  {
    id: "NRC-1003",
    title: "Cost Reduction Initiative",
    status: "Pending",
    color: "blue",
    note: "Awaiting review from Finance team",
    updatedAt: "2025-05-16T07:00:00Z", // This month
    priority: "High",
    department: "Finance",
  },
  {
    id: "NRC-1004",
    title: "Safety Protocol Update",
    status: "Accepted",
    color: "green",
    note: "Approved by Aryan Singh - Implementing next week",
    updatedAt: "2025-05-15T00:00:00Z", // This month
    priority: "Critical",
    department: "Safety",
  },
  {
    id: "NRC-1005",
    title: "New Vendor Proposal",
    status: "Rejected",
    color: "red",
    note: "Rejected by Pranav Gupta - Cost concerns",
    updatedAt: "2025-05-14T00:00:00Z", // This month
    priority: "Low",
    department: "Procurement",
  },
  {
    id: "NRC-1006",
    title: "Employee Wellness Program",
    status: "Pending",
    color: "blue",
    note: "Awaiting review from HR department",
    updatedAt: "2025-05-13T00:00:00Z", // This month
    priority: "Medium",
    department: "HR",
  },
  {
    id: "NRC-1007",
    title: "IT Infrastructure Upgrade",
    status: "Accepted",
    color: "green",
    note: "Approved by Pranav Gupta - Scheduled for next month",
    updatedAt: "2025-05-12T00:00:00Z", // This month
    priority: "High",
    department: "IT",
  },
  {
    id: "NRC-1008",
    title: "Marketing Campaign Proposal",
    status: "Pending",
    color: "blue",
    note: "Under review by Marketing team",
    updatedAt: "2025-05-11T00:00:00Z", // This month
    priority: "High",
    department: "Marketing",
  },
  {
    id: "NRC-1009",
    title: "Supply Chain Optimization",
    status: "Accepted",
    color: "green",
    note: "Approved by Logistics head - Implementation in progress",
    updatedAt: "2025-05-10T00:00:00Z", // This month
    priority: "Medium",
    department: "Logistics",
  },
  {
    id: "NRC-1010",
    title: "Customer Feedback System",
    status: "Pending",
    color: "blue",
    note: "Awaiting IT department resources",
    updatedAt: "2025-05-09T00:00:00Z", // This month
    priority: "Medium",
    department: "Customer Service",
  },
  // Last month data
  {
    id: "NRC-0901",
    title: "Quality Assurance Protocol",
    status: "Accepted",
    color: "green",
    note: "Approved by Quality team",
    updatedAt: "2025-04-28T00:00:00Z", // Last month
    priority: "High",
    department: "Quality",
  },
  {
    id: "NRC-0902",
    title: "Inventory Management System",
    status: "Pending",
    color: "blue",
    note: "Under review by Operations team",
    updatedAt: "2025-04-25T00:00:00Z", // Last month
    priority: "Medium",
    department: "Operations",
  },
  {
    id: "NRC-0903",
    title: "Employee Training Program",
    status: "Accepted",
    color: "green",
    note: "Approved by HR department",
    updatedAt: "2025-04-22T00:00:00Z", // Last month
    priority: "Medium",
    department: "HR",
  },
  {
    id: "NRC-0904",
    title: "Security System Upgrade",
    status: "Rejected",
    color: "red",
    note: "Rejected due to budget constraints",
    updatedAt: "2025-04-18T00:00:00Z", // Last month
    priority: "Critical",
    department: "IT",
  },
  {
    id: "NRC-0905",
    title: "New Product Development",
    status: "Accepted",
    color: "green",
    note: "Approved by Product team",
    updatedAt: "2025-04-15T00:00:00Z", // Last month
    priority: "High",
    department: "R&D",
  },
  {
    id: "NRC-0906",
    title: "Office Expansion Plan",
    status: "Pending",
    color: "blue",
    note: "Awaiting approval from management",
    updatedAt: "2025-04-12T00:00:00Z", // Last month
    priority: "Low",
    department: "Administration",
  },
  {
    id: "NRC-0907",
    title: "Customer Support Enhancement",
    status: "Accepted",
    color: "green",
    note: "Approved by Customer Service team",
    updatedAt: "2025-04-08T00:00:00Z", // Last month
    priority: "High",
    department: "Customer Service",
  },
  {
    id: "NRC-0908",
    title: "Sustainability Initiative",
    status: "Rejected",
    color: "red",
    note: "Rejected due to implementation challenges",
    updatedAt: "2025-04-05T00:00:00Z", // Last month
    priority: "Medium",
    department: "Operations",
  },
]

// Helper function to calculate days ago from a date string
export function timeAgo(date) {
  const now = new Date("2025-05-19T00:00:00Z") // Current reference date
  const past = new Date(date)
  const diff = Math.floor((now - past) / (1000 * 60 * 60 * 24)) // in days

  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  return `${diff} days ago`
}

// Helper function to filter activities by date period
export function filterActivitiesByPeriod(activities, period) {
  const now = new Date("2025-05-19T00:00:00Z") // Current reference date
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // First day of current month
  const firstDayThisMonth = new Date(currentYear, currentMonth, 1)

  // First day of last month
  const firstDayLastMonth = new Date(currentYear, currentMonth - 1, 1)

  // Last day of last month
  const lastDayLastMonth = new Date(currentYear, currentMonth, 0)

  switch (period) {
    case "thisMonth":
      return activities.filter((activity) => {
        const activityDate = new Date(activity.updatedAt)
        return activityDate >= firstDayThisMonth
      })

    case "lastMonth":
      return activities.filter((activity) => {
        const activityDate = new Date(activity.updatedAt)
        return activityDate >= firstDayLastMonth && activityDate <= lastDayLastMonth
      })

    case "custom":
      // This would be handled with the custom date range
      return activities

    default:
      return activities
  }
}

// Helper function to calculate NRC data based on filtered activities
export function calculateNrcDataFromActivities(activities) {
  const accepted = activities.filter((a) => a.status === "Accepted").length
  const rejected = activities.filter((a) => a.status === "Rejected").length
  const pending = activities.filter((a) => a.status === "Pending").length
  const total = activities.length
  const reviewed = accepted + rejected

  // Calculate growth compared to previous period (simplified)
  const growth = ((total / 1000) * 100 - 100).toFixed(1)

  return {
    total,
    accepted,
    rejected,
    pending,
    growth,
    reviewed,
    target: 1500,
  }
}

// Helper function to generate pie data from NRC data
export function generatePieData(nrcData) {
  return [
    { name: "Accepted", value: nrcData.accepted, color: "#0FA644" },
    { name: "Rejected", value: nrcData.rejected, color: "#EF4444" },
    { name: "Pending", value: nrcData.pending, color: "#27418C" },
  ]
}
