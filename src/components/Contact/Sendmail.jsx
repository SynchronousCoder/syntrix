import React, { useState } from "react";
import KnowMore from "./KnowMore";

const Sendmail = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const budgetOptions = [
    { value: "1k-5k", label: "$1,000 - 5,000" },
    { value: "5k-15k", label: "$5,000 - 15,000" },
    { value: "15k-25k", label: "$15,000 - 25,000" },
    { value: "25k-50k", label: "$25,000 - 50,000" },
  ];

  // ✅ STEP 1 — Form Data State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    goal: "",
    date: "",
    budget: "",
    email: "",
    details: "",
    privacy: false,
  });

  const handleBudgetSelect = (option) => {
    setSelectedBudget(option.label);
    setFormData({ ...formData, budget: option.label }); // ✅ update budget in formData
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[150vh] w-full bg-[#F1F1F1] px-[4vw] py-[2vh] overflow-y-auto text-[#212121]"
    >
      {/* Header Section */}
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

      {/* Instructions */}
      <div className="lg:pt-[8vh] lg:pb-[8vh] pt-[0vh] pb-[2vh]">
        <h3 className="font-[font2] font-medium lg:text-[1.7vw] text-[4vw] text-gray-600 leading-relaxed">
          Fill the form below:
        </h3>
      </div>

      {/* Form Section */}
      <div className="w-full">
        <div className="font-[font2] lg:text-[3vw] lg:leading-[2vw] text-[7vw] leading-[6vw] font-medium text-gray-900">
          {/* Name + Company */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Hi! My name is</span>
            <input
              type="text"
              placeholder="Enter your name*"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:min-w-[18vw] min-w-[100%]"
            />
            <span>and I work with</span>
            <input
              type="text"
              placeholder="Company name type here*"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:min-w-[23vw] min-w-[100%]"
            />
          </div>

          {/* Goal */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I'm looking for a partner to help me with</span>
            <input
              type="text"
              placeholder="Your goal type here*"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 lg:min-w-[37vw] min-w-[100%]"
            />
          </div>

          {/* Date */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>With an idea of having that completed</span>
            <div className="relative lg:min-w-[16vw] min-w-[100%]">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setFormData({ ...formData, date: e.target.value });
                }}
                className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 lg:min-w-[40vw] min-w-[100%] text-gray-600 font-light cursor-pointer"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I am hoping to stay around a budget range of</span>
            <div className="relative lg:min-w-[14vw] min-w-[100%]">
              <div
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="cursor-pointer border-b-2 border-gray-400 px-1 pb-1 lg:min-w-[31.2vw]"
              >
                {selectedBudget ? (
                  <span className="text-gray-600">{selectedBudget}</span>
                ) : (
                  <span className="text-gray-400">Select*</span>
                )}
              </div>

              {isSelectOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[220px]">
                  {budgetOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleBudgetSelect(option)}
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                    >
                      <span>{option.label}</span>
                      <span className="text-gray-400 text-[1vw]">USD</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>You can reach me at</span>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 lg:min-w-[32vw] min-w-[100%]"
            />
            <span>to start the conversation.</span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Optionally, I'm sharing more:</span>
            <input
              type="text"
              placeholder="Product details type here..."
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="border-b-2 border-gray-400 focus:border-gray-700 bg-transparent px-1 pb-1 lg:min-w-[48vw] min-w-[100%]"
            />
          </div>
        </div>

        {/* Privacy + Submit */}
        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between mt-[6vh] pt-[2vh]">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacy}
              onChange={(e) =>
                setFormData({ ...formData, privacy: e.target.checked })
              }
              className="w-5 h-5 accent-gray-800 cursor-pointer"
            />
            <label
              htmlFor="privacy"
              className="font-[font2] lg:text-[1.3vw] text-[4.5vw] text-gray-600 cursor-pointer"
            >
              I agree with the{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white font-[font2] font-semibold lg:text-[1.1vw] lg:px-10 lg:py-4 p-2 rounded-full uppercase flex items-center gap-2"
          >
            SEND INQUIRY <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {isSelectOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSelectOpen(false)}
        />
      )}
    </form>
  );
};

export default Sendmail;
