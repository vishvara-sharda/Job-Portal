import React from "react";
import { FaHome, FaBriefcase, FaBell, FaUserCircle } from "react-icons/fa";
import { MdWork, MdSearch } from "react-icons/md";

import "./JobSearch.css";

function SearchBar() {
    return (
      <div className="search-bar">
        🔍 <input type="text" placeholder="Search Job Title" />
      </div>
    );
  }
  
  function JobCard({ title, location, salary }) {
    return (
      <div className="job-card">
        <h3>DeepMind</h3>
        <h2>{title}</h2>
        <p>{location}</p>
        <p className="salary">{salary}</p>
        <button className="apply-btn">Apply</button>
      </div>
    );
  }
  
  function JobDetails() {
    return (
      <div className="job-details">
        <h3>DeepMind</h3>
        <h2>UX Design</h2>
        <p>Noida</p>
        <button className="apply-btn">Apply</button>
        <div className="job-info">
          <h3>Responsibilities:</h3>
          <ul>
            <li>Assist in creating wireframes, prototypes, and high-fidelity UI designs.</li>
            <li>Collaborate with senior designers and product teams.</li>
            <li>Conduct user research and usability testing.</li>
            <li>Maintain consistency across design elements.</li>
          </ul>
          <h3>Requirements:</h3>
          <ul>
            <li>0.5 to 1 year of experience in UI/UX design.</li>
            <li>Proficiency in Figma, Sketch, Adobe XD.</li>
            <li>Knowledge of user-centered design principles.</li>
          </ul>
          <h3>Pay:</h3>
          <p>₹20,000.00 – ₹25,000.00 per month</p>
        </div>
      </div>
    );
  }
  
const JobSearch = () => {
  return (
    <div className="jobs">
      <SearchBar />
      <div className="job-layout">
        <div className="job-list">
          <JobCard title="UX Design" location="Noida" salary="₹20T – ₹25T/mo" />
          <JobCard title="AI Developer" location="Delhi" salary="₹50T – ₹45T/mo" />
        </div>
        <JobDetails />
      </div>
    </div>
  );
};

export default JobSearch;
