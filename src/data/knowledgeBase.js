const knowledgeBase = [
  // Leave
  {
    question: "how to apply for leave",
    answer: "Go to ERP → Leave Section → Fill and submit the form. Approval will show in your dashboard."
  },
  {
    question: "mandatory attendance",
    answer: "You need at least 75% attendance in each subject to sit for exams."
  },
  {
    question: "leave status",
    answer: "Check ERP → Leave Section → Status tab to view leave approval or rejection."
  },
  {
    question: "apply sick leave",
    answer: "ERP → Leave → Apply Sick Leave → Submit your request along with medical certificate if needed."
  },
  {
    question: "leave cancellation",
    answer: "To cancel leave, go to ERP → Leave → Cancel Request → Submit cancellation."
  },

  // Library
  {
    question: "how to issue a book",
    answer: "Visit library, scan your ERP ID, and request the book. Check issued books in ERP → Library."
  },
  {
    question: "library due date",
    answer: "You can view due dates for your issued books in ERP → Library → My Books."
  },
  {
    question: "late fee for library",
    answer: "Late fees are ₹5 per day per book after the due date. Check ERP → Library for details."
  },
  {
    question: "renew library book",
    answer: "Go to ERP → Library → My Books → Select 'Renew' before the due date."
  },
  {
    question: "reserve book",
    answer: "ERP → Library → Search Book → Click 'Reserve' to hold a book."
  },

  // Hostel
  {
    question: "how to apply for hostel allotment",
    answer: "Go to ERP → Hostel Section → Fill Hostel Application Form. Hostel approval will be notified in dashboard."
  },
  {
    question: "hostel fees payment",
    answer: "Hostel fees can be paid online via ERP → Fees → Hostel Fee Payment section."
  },
  {
    question: "hostel rules",
    answer: "Hostel rules are available in ERP → Hostel → Rules & Guidelines. Ensure timely compliance."
  },
  {
    question: "check hostel room allotment",
    answer: "Check ERP → Hostel → My Room to see your allotted room and roommate details."
  },
  {
    question: "hostel leave",
    answer: "ERP → Hostel → Apply Leave → Submit request for out-of-hostel leave with parent consent if required."
  },
  {
    question: "hostel complaint",
    answer: "Submit complaints via ERP → Hostel → Complaints. Administration will respond within 48 hours."
  },

  // Fees
  {
    question: "how to pay fees",
    answer: "Go to ERP → Fees → Select the fee type → Pay online using netbanking, UPI, or card."
  },
  {
    question: "check fee receipt",
    answer: "After payment, download your receipt from ERP → Fees → Receipts."
  },
  {
    question: "fee due date",
    answer: "Fee due dates are mentioned in ERP → Fees → Fee Schedule."
  },
  {
    question: "late fee for tuition",
    answer: "A late fee of ₹500/day applies after the due date. Check ERP → Fees → Fee Schedule for exact dates."
  },
  {
    question: "scholarship application",
    answer: "Go to ERP → Scholarships → Apply → Fill the online form and submit supporting documents."
  },
  {
    question: "scholarship status",
    answer: "Check ERP → Scholarships → Status to see approval, rejection, or pending updates."
  },

  // Assignments
  {
    question: "view assignments",
    answer: "Go to ERP → Courses → Select Course → Assignments tab to view pending assignments."
  },
  {
    question: "submit assignments",
    answer: "Click on the assignment → Upload your file → Submit. Submission status will be updated."
  },
  {
    question: "assignment deadline",
    answer: "Deadlines are shown in ERP → Courses → Assignments → Deadline column."
  },
  {
    question: "late submission penalty",
    answer: "Late submissions may have 5-10% marks deduction depending on course policy. Check ERP → Courses → Assignments → Policies."
  },

  // Exams
  {
    question: "exam schedule",
    answer: "View ERP → Exams → Schedule to see upcoming exams and timings."
  },
  {
    question: "exam hall allotment",
    answer: "Check ERP → Exams → My Exam Hall to see your allocated hall and seating."
  },
  {
    question: "exam result",
    answer: "Results are published in ERP → Exams → Results."
  },
  {
    question: "revaluation request",
    answer: "Go to ERP → Exams → Revaluation → Submit request for answer sheet review."
  },
  {
    question: "exam syllabus",
    answer: "ERP → Courses → Select Course → Syllabus to view the complete syllabus."
  },

  // Profile
  {
    question: "change password",
    answer: "Go to ERP → Profile → Change Password to update your login credentials."
  },
  {
    question: "update personal details",
    answer: "Navigate to ERP → Profile → Edit Details to update contact info, address, and emergency contacts."
  },
  {
    question: "upload profile photo",
    answer: "ERP → Profile → Upload Photo to set or update your profile picture."
  },
  {
    question: "view grades",
    answer: "ERP → Profile → Grades shows your academic performance across semesters."
  },

  // Transport
  {
    question: "bus timings",
    answer: "Check ERP → Transport → Bus Schedule for daily timings and routes."
  },
  {
    question: "apply for transport pass",
    answer: "ERP → Transport → Apply Pass → Fill form to get your transport pass."
  },
  {
    question: "transport fee",
    answer: "Transport fee details are available in ERP → Fees → Transport Fee."
  },
  {
    question: "bus route",
    answer: "ERP → Transport → Routes shows all available bus routes and stops."
  },

  // Cafeteria / Mess
  {
    question: "meal timings",
    answer: "Check ERP → Cafeteria → Meal Schedule for breakfast, lunch, and dinner timings."
  },
  {
    question: "mess menu",
    answer: "Daily menu is updated in ERP → Cafeteria → Menu."
  },
  {
    question: "complaint about food",
    answer: "ERP → Cafeteria → Complaints to submit your feedback or complaint."
  },
  {
    question: "meal subscription",
    answer: "ERP → Cafeteria → Meal Plan → Subscribe to weekly or monthly meal plans."
  },

  // Complaints & IT support
  {
    question: "report a complaint",
    answer: "ERP → Helpdesk → New Complaint → Fill form to report an issue."
  },
  {
    question: "complaint status",
    answer: "ERP → Helpdesk → My Complaints shows the status of all submitted complaints."
  },
  {
    question: "IT support",
    answer: "ERP → Helpdesk → IT Support for technical issues related to ERP login, network, or software."
  },
  {
    question: "forgot password",
    answer: "Click 'Forgot Password' on login page → Enter registered email to reset password."
  },

  // Events & Calendar
  {
    question: "upcoming events",
    answer: "ERP → Events shows workshops, seminars, competitions, and other activities."
  },
  {
    question: "holiday list",
    answer: "ERP → Calendar → Holidays shows official holidays for the academic year."
  },
  {
    question: "college calendar",
    answer: "ERP → Calendar → Academic Calendar shows semester start/end, exams, holidays, and events."
  },

  // General FAQs
  {
    question: "ERP login issues",
    answer: "If you are unable to login, reset your password via ERP → Forgot Password or contact admin."
  },
  {
    question: "contact admin",
    answer: "ERP → Helpdesk → Contact Admin to send a message regarding issues or queries."
  },
  {
    question: "forgot ERP ID",
    answer: "Your ERP ID is provided at admission. Contact admin if lost."
  },
  {
    question: "how to reset email",
    answer: "ERP → Profile → Update Email → Verification OTP will be sent to confirm changes."
  },
  {
    question: "technical support",
    answer: "ERP → Helpdesk → Technical Support for software, network, or device issues."
  }
];

export default knowledgeBase;
