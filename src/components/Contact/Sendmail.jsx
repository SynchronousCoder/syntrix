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

  const handleBudgetSelect = (option) => {
    setSelectedBudget(option.label);
    setIsSelectOpen(false);
  };

  return (
    <div className="min-h-[150vh] w-full bg-[#F1F1F1] px-[4vw] py-[2vh] overflow-y-auto">
      {/* Header Section */}
      <div className="pt-[17vh] pb-[6vh]">
        {["Let's Start", "a project together"].map((item, index) => {
          return (
            <div
              key={index}
              className="font-[font1] lg:text-[8vw] lg:leading-[6.2vw] text-[13vw] leading-[12vw] uppercase font-bold  text-[#212121]"
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Form Instructions */}
      <div className="lg:pt-[8vh] lg:pb-[8vh] pt-[0vh] pb-[2vh]">
        <h3 className="font-[font2] font-medium lg:text-[1.7vw] text-[4vw] text-gray-600 leading-relaxed">
          Fill the form below:
        </h3>
      </div>

      {/* Contact Form */}
      <div className="w-full">
        <div className="font-[font2] lg:text-[3vw] lg:leading-[2vw] text-[7vw] leading-[6vw] font-medium text-gray-900">
          {/* First Line */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Hi! My name is</span>
            <input
              type="text"
              placeholder="Enter your name*"
              className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:placeholder:text-[1.3vw] placeholder:text-[4.5vw] placeholder:font-light lg:min-w-[18vw] min-w-[100%] transition-all duration-300"
            />
            <span>and I work with</span>
            <input
              type="text"
              placeholder="Company name type here*"
              className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:placeholder:text-[1.3vw] placeholder:text-[4.5vw] placeholder:font-light lg:min-w-[23vw] min-w-[100%] transition-all duration-300"
            />
          </div>

          {/* Second Line */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I'm looking for a partner to help me with</span>
            <input
              type="text"
              placeholder="Your goal type here*"
              className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:placeholder:text-[1.3vw] placeholder:text-[4.5vw] placeholder:font-light lg:min-w-[37vw] min-w-[100%] transition-all duration-300"
            />
          </div>

          {/* Third Line - Clean Date Input */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>With an idea of having that completed</span>
            <div className="relative lg:min-w-[16vw] min-w-[100%]">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 lg:text-[1.6vw] text-[5.5vw] text-gray-600 font-light lg:min-w-[40vw] min-w-[100%] transition-all duration-300 cursor-pointer
                [&::-webkit-calendar-picker-indicator]:opacity-0 
                [&::-webkit-calendar-picker-indicator]:absolute 
                [&::-webkit-calendar-picker-indicator]:inset-0 
                [&::-webkit-calendar-picker-indicator]:w-full 
                [&::-webkit-calendar-picker-indicator]:h-full 
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                [&::-webkit-datetime-edit-text]:opacity-0
                [&::-webkit-datetime-edit-month-field]:opacity-0
                [&::-webkit-datetime-edit-day-field]:opacity-0
                [&::-webkit-datetime-edit-year-field]:opacity-0"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
              />
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 pointer-events-none text-[1.3vw] text-gray-400 font-light">
                {selectedDate ? selectedDate : "Date*"}
              </div>
            </div>
          </div>

          {/* Fourth Line - Simple Select Dropdown */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>I am hoping to stay around a budget range of</span>
            <div className="relative lg:min-w-[14vw] min-w-[100%]">
              <div
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="cursor-pointer border-b-2 border-gray-400 hover:border-gray-700 px-1 pb-1 lg:text-[1.6vw] text-[4vw] font-light transition-all duration-300 lg:min-w-[31.2vw]"
              >
                {selectedBudget ? (
                  <span className="text-gray-600">{selectedBudget}</span>
                ) : (
                  <span className="text-gray-400 lg:text-[1.3vw] text-[4.5vw]">Select*</span>
                )}
              </div>

              {/* Table-style Dropdown */}
              {isSelectOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[220px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                    <div className="lg:text-[1.2vw] text-[4.5vw] font-medium text-gray-700">
                      Budget Range
                    </div>
                  </div>
                  {budgetOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => handleBudgetSelect(option)}
                      className="px-4 py-3 lg:text-[1.3vw] text-[4vw] text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                    >
                      <span>{option.label}</span>
                      <span className="text-gray-400 text-[1vw]">USD</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fifth Line */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>You can reach me at</span>
            <input
              type="email"
              placeholder="name@example.com"
              className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:placeholder:text-[1.3vw] placeholder:text-[4.5vw] placeholder:font-light lg:min-w-[32vw] min-w-[100%] transition-all duration-300"
            />
            <span>to start the conversation.</span>
          </div>

          {/* Sixth Line */}
          <div className="flex flex-wrap items-center gap-3 mb-[3vh]">
            <span>Optionally, I'm sharing more:</span>
            <input
              type="text"
              placeholder="Product details type here..."
              className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none bg-transparent px-1 pb-1 text-[2.2vw] placeholder:text-gray-400 lg:placeholder:text-[1.3vw] placeholder:text-[4.5vw] placeholder:font-light lg:min-w-[48vw] min-w-[100%] transition-all duration-300"
            />
          </div>
        </div>

        {/* Privacy Policy and Submit Button */}
        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between mt-[6vh] pt-[2vh]">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="privacy"
              className="w-5 h-5 accent-gray-800 cursor-pointer transform scale-110"
            />
            <label
              htmlFor="privacy"
              className="font-[font2] lg:text-[1.3vw] text-[4.5vw] text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200"
            >
              I agree with the{" "}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-gray-900 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <button className="bg-gray-900 hover:bg-black lg:mt-0 mt-[2vh] text-white font-[font2] font-semibold lg:text-[1.1vw] lg:px-10 lg:py-4 p-2 rounded-full transition-all duration-400 ease-out transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] tracking-wider uppercase flex items-center gap-2">
            SEND INQUIRY
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isSelectOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSelectOpen(false)}
        />
      )}
    </div>
  );
};

export default Sendmail;
