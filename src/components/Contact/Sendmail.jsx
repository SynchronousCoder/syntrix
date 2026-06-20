import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import KnowMore from "./KnowMore";

const EMAILJS_SERVICE_ID = "service_tb2wvho";
const EMAILJS_TEMPLATE_ID = "template_klt9wgh";
const EMAILJS_PUBLIC_KEY = "1J7fH4cp7wrWp4L04";

// ── Budget options per region ──────────────────────────────────────────────
const BUDGET_OPTIONS = {
  India: [
    { value: "under-25k", label: "Under ₹25,000" },
    { value: "25k-50k", label: "₹25,000 - ₹50,000" },
    { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
    { value: "1l-3l", label: "₹1,00,000 - ₹3,00,000" },
    { value: "3l+", label: "₹3,00,000+" },
    { value: "custom", label: "Custom Budget" },
  ],
  "USA / Canada": [
    { value: "under-500", label: "Under $500" },
    { value: "500-1k", label: "$500 - $1,000" },
    { value: "1k-5k", label: "$1,000 - $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k+", label: "$15,000+" },
    { value: "custom", label: "Custom Budget" },
  ],
  Europe: [
    { value: "under-500", label: "Under €500" },
    { value: "500-1k", label: "€500 - €1,000" },
    { value: "1k-5k", label: "€1,000 - €5,000" },
    { value: "5k+", label: "€5,000+" },
    { value: "custom", label: "Custom Budget" },
  ],
  Other: [
    { value: "small", label: "Small (Under $1,000)" },
    { value: "medium", label: "Medium ($1,000 - $10,000)" },
    { value: "large", label: "Large ($10,000+)" },
    { value: "custom", label: "Custom Budget" },
  ],
};

const SERVICE_OPTIONS = [
  "Website Design & Development",
  "E-Commerce Store",
  "SEO",
  "Branding",
  "Web Application / SaaS",
  "Website Maintenance",
  "Other",
];

const REGION_OPTIONS = ["India", "USA / Canada", "Europe", "Other"];
const LEAD_SOURCE_OPTIONS = [
  "Google",
  "LinkedIn",
  "Instagram",
  "Referral",
  "Other",
];
const MEETING_TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Weekend"];

const Sendmail = () => {
  // ── Dropdown open states ───────────────────────────────────────────────
  const [openDropdown, setOpenDropdown] = useState(null); // 'budget'|'service'|'region'|'lead'|'meeting'
  const [selectedBudget, setSelectedBudget] = useState("");

  const [loading, setLoading] = useState(false);

  // ── Form state ─────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    goal: "",
    date: "",
    budget: "",
    customBudget: "",
    email: "",
    phone: "",
    service: "",
    region: "",
    discoveryCall: "Yes",
    preferredMeetingTime: "",
    leadSource: "",
    details: "",
  });

  // ── Helpers ────────────────────────────────────────────────────────────
  const set = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleDropdown = (name) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const closeAll = () => setOpenDropdown(null);

  const currentBudgetOptions =
    BUDGET_OPTIONS[formData.region] || BUDGET_OPTIONS["Other"];

  const handleBudgetSelect = (option) => {
    setSelectedBudget(option.label);
    set("budget", option.label);
    if (option.value !== "custom") set("customBudget", "");
    closeAll();
  };

  const handleRegionSelect = (region) => {
    set("region", region);
    set("budget", "");
    set("customBudget", "");
    setSelectedBudget("");
    closeAll();
  };

  // ── Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validation
    if (
      !formData.name ||
      !formData.goal ||
      !formData.email ||
      !formData.budget ||
      !formData.phone ||
      !formData.service ||
      !formData.region
    ) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.budget === "Custom Budget" && !formData.customBudget.trim()) {
      alert("Please enter your custom budget");
      return;
    }

    const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    if (formData.discoveryCall === "Yes" && !formData.preferredMeetingTime) {
      alert("Please select your preferred meeting time");
      return;
    }

    setLoading(true);

    try {
      // ✅ Original emailjs.send() — only extended, never altered
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // ── original fields ──────────────────
          name: formData.name,
          company: formData.company,
          goal: formData.goal,
          date: formData.date,
          budget: formData.budget,
          email: formData.email,
          details: formData.details,
          // ── new fields ───────────────────────
          customBudget: formData.customBudget,
          phone: formData.phone,
          service: formData.service,
          region: formData.region,
          discoveryCall: formData.discoveryCall,
          preferredMeetingTime: formData.preferredMeetingTime || "N/A",
          leadSource: formData.leadSource || "Not specified",
        },
        EMAILJS_PUBLIC_KEY,
      );

      alert("Proposal Request Sent Successfully 🚀");

      setFormData({
        name: "",
        company: "",
        goal: "",
        date: "",
        budget: "",
        customBudget: "",
        email: "",
        phone: "",
        service: "",
        region: "",
        discoveryCall: "Yes",
        preferredMeetingTime: "",
        leadSource: "",
        details: "",
      });
      setSelectedBudget("");
      closeAll();
    } catch (error) {
      console.error("EMAILJS ERROR:", error);
      alert("Failed to submit form! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Styles ─────────────────────────────────────────────────────────────
  const premiumInput =
    "border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent px-2 pb-2 transition-all duration-300 hover:border-gray-500 placeholder:text-gray-400";

  const dropdownMenu =
    "absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 min-w-[240px] overflow-hidden";

  const dropdownItem =
    "px-5 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors duration-150 font-[font2] text-sm";

  const inlineDropdownTrigger = (value, placeholder) =>
    `cursor-pointer border-b-2 ${
      value ? "border-gray-500" : "border-gray-300"
    } hover:border-gray-500 transition-all duration-300 px-2 pb-2 lg:min-w-[20vw] min-w-[100%]`;

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[150vh] w-full bg-[#F1F1F1] px-[4vw] py-[2vh] overflow-y-auto text-[#212121]"
    >
      {/* Header */}
      <div className="pt-[17vh] pb-[6vh]">
        {["Let's Start", "a project together"].map((item, index) => (
          <div
            key={index}
            className="font-[font1] lg:text-[8vw] lg:leading-[6.2vw] text-[13vw] leading-[12vw] uppercase font-bold text-[#212121]"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="lg:pt-[8vh] lg:pb-[8vh] pt-[0vh] pb-[2vh]">
        <h3 className="font-[font2] font-medium lg:text-[1.7vw] text-[4vw] text-gray-600 leading-relaxed">
          Fill the form below:
        </h3>
      </div>

      <div className="w-full">
        <div className="font-[font2] lg:text-[3vw] lg:leading-[2vw] text-[7vw] leading-[6vw] font-medium text-gray-900">
          {/* ── Name + Company ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Hi! My name is</span>
            <input
              type="text"
              placeholder="Enter your name*"
              value={formData.name}
              onChange={(e) => set("name", e.target.value)}
              className={`${premiumInput} text-[2.2vw] lg:min-w-[18vw] min-w-[100%]`}
            />
            <span>and I work with</span>
            <input
              type="text"
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => set("company", e.target.value)}
              className={`${premiumInput} text-[2.2vw] lg:min-w-[23vw] min-w-[100%]`}
            />
          </div>

          {/* ── Phone ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>You can reach me on</span>

            <input
              type="tel"
              placeholder="+91 9810098300 Phone / WhatsApp*"
              value={formData.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`${premiumInput} 
    lg:min-w-[22vw] 
    lg:max-w-[28vw] 
    min-w-[100%]
    placeholder:text-[1.25vw]
    text-[1.2vw]
  `}
            />

            <span className="text-gray-500 lg:text-[1vw] text-[3.5vw]">
              (WhatsApp preferred)
            </span>
          </div>

          {/* ── Service ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I need help with</span>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("service")}
                className={inlineDropdownTrigger(
                  formData.service,
                  "Select service*",
                )}
              >
                {formData.service ? (
                  <span className="text-gray-700">{formData.service}</span>
                ) : (
                  <span className="text-gray-400">Select service*</span>
                )}
              </div>
              {openDropdown === "service" && (
                <div className={dropdownMenu}>
                  {SERVICE_OPTIONS.map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        set("service", s);
                        closeAll();
                      }}
                      className={dropdownItem}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Goal ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I'm looking for a partner to help me with</span>
            <input
              type="text"
              placeholder="Your goal*"
              value={formData.goal}
              onChange={(e) => set("goal", e.target.value)}
              className={`${premiumInput} lg:min-w-[37vw] min-w-[100%]`}
            />
          </div>

          {/* ── Region ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I am based in</span>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("region")}
                className={inlineDropdownTrigger(
                  formData.region,
                  "Select region*",
                )}
              >
                {formData.region ? (
                  <span className="text-gray-700">{formData.region}</span>
                ) : (
                  <span className="text-gray-400">Select region*</span>
                )}
              </div>
              {openDropdown === "region" && (
                <div className={dropdownMenu}>
                  {REGION_OPTIONS.map((r) => (
                    <div
                      key={r}
                      onClick={() => handleRegionSelect(r)}
                      className={dropdownItem}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Budget (dynamic) ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>with a budget range of</span>
            <div className="relative">
              <input type="hidden" name="budget" value={formData.budget} />
              <div
                onClick={() => formData.region && toggleDropdown("budget")}
                className={`${inlineDropdownTrigger(selectedBudget, "Select budget*")} ${
                  !formData.region ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {selectedBudget ? (
                  <span className="text-gray-700">{selectedBudget}</span>
                ) : (
                  <span className="text-gray-400">
                    {formData.region
                      ? "Select budget*"
                      : "Select region first*"}
                  </span>
                )}
              </div>
              {openDropdown === "budget" && formData.region && (
                <div className={dropdownMenu}>
                  {currentBudgetOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleBudgetSelect(option)}
                      className={dropdownItem}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom budget input */}
            {formData.budget === "Custom Budget" && (
              <input
                type="text"
                placeholder="Enter your budget"
                value={formData.customBudget}
                onChange={(e) => set("customBudget", e.target.value)}
                className={`${premiumInput} lg:min-w-[20vw] min-w-[100%]`}
              />
            )}
          </div>

          {/* ── Date ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>With an idea of having that completed</span>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => set("date", e.target.value)}
              className={`${premiumInput} lg:min-w-[40vw] min-w-[100%] text-gray-600 font-light cursor-pointer`}
            />
          </div>

          {/* ── Email ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>You can reach me at</span>
            <input
              type="email"
              placeholder="name@example.com*"
              value={formData.email}
              onChange={(e) => set("email", e.target.value)}
              className={`${premiumInput} lg:min-w-[32vw] min-w-[100%]`}
            />
            <span>to start the conversation.</span>
          </div>

          {/* ── Discovery Call ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Would you like a free discovery call?</span>
            <div className="flex gap-4 min-w-[100%] lg:min-w-0">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    set("discoveryCall", opt);
                    if (opt === "No") set("preferredMeetingTime", "");
                  }}
                  className={`px-6 py-2 rounded-full border-2 font-[font2] text-[3.5vw] lg:text-[1.2vw] transition-all duration-300 ${
                    formData.discoveryCall === opt
                      ? "bg-[#212121] text-white border-[#212121]"
                      : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* ── Preferred Meeting Time ── */}
          {formData.discoveryCall === "Yes" && (
            <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
              <span>I prefer calls in the</span>
              <div className="relative">
                <div
                  onClick={() => toggleDropdown("meeting")}
                  className={inlineDropdownTrigger(
                    formData.preferredMeetingTime,
                    "Select time*",
                  )}
                >
                  {formData.preferredMeetingTime ? (
                    <span className="text-gray-700">
                      {formData.preferredMeetingTime}
                    </span>
                  ) : (
                    <span className="text-gray-400">Select time*</span>
                  )}
                </div>
                {openDropdown === "meeting" && (
                  <div className={dropdownMenu}>
                    {MEETING_TIME_OPTIONS.map((t) => (
                      <div
                        key={t}
                        onClick={() => {
                          set("preferredMeetingTime", t);
                          closeAll();
                        }}
                        className={dropdownItem}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Lead Source ── */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I found you via</span>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("lead")}
                className={inlineDropdownTrigger(
                  formData.leadSource,
                  "Select source",
                )}
              >
                {formData.leadSource ? (
                  <span className="text-gray-700">{formData.leadSource}</span>
                ) : (
                  <span className="text-gray-400">Select source</span>
                )}
              </div>
              {openDropdown === "lead" && (
                <div className={dropdownMenu}>
                  {LEAD_SOURCE_OPTIONS.map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        set("leadSource", s);
                        closeAll();
                      }}
                      className={dropdownItem}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Details (textarea) ── */}
          <div className="flex flex-wrap items-start gap-3 mb-[3vh]">
            <span className="mt-2">Optionally, I'm sharing more:</span>
            <textarea
              rows={4}
              placeholder="Tell us more about your project, goals, requirements, references, timeline, etc."
              value={formData.details}
              onChange={(e) => set("details", e.target.value)}
              className={`${premiumInput} lg:min-w-[55vw] min-w-[100%] resize-none lg:text-[1.4vw] text-[4vw]`}
            />
          </div>
        </div>

        {/* ── Privacy + Submit ── */}
        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between mt-[6vh] pt-[2vh]">
          <button
            type="submit"
            disabled={loading}
            className="
              group relative overflow-hidden
              bg-[#212121] text-white font-[font2] font-medium
              rounded-full lg:px-10 lg:py-4 p-3
              uppercase tracking-wider transition-all duration-300
              hover:scale-105 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
              disabled:opacity-60 disabled:cursor-not-allowed
              lg:mt-0 mt-6
            "
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity=".25"
                    />
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Get Free Proposal
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </form>
  );
};

export default Sendmail;


