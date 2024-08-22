import React, { useState } from "react";
import styles from "./InterfacePage.module.css"; // Updated import

const InterfacePage = () => {
  const [activeTab, setActiveTab] = useState("Course Tools");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles["interface-page"]}>
      <header className={styles["top-bar"]}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li><a href="/classes">Classes</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </nav>
      </header>
      <div className={styles["main-content"]}>
        <h2 className={styles["welcome-text"]}>Welcome, Professor</h2>
        <div className={styles["content-wrapper"]}>
          <div className={styles["sidebar"]}>
            <div className={styles["course-header"]}>
              <span className={styles["right-bracket"]}>[</span> Courses
            </div>
            <button className={styles["sidebar-button"]}>AM104</button>
            <button className={styles["sidebar-button"]}>Add new</button>
          </div>
          <div className={styles["content-area"]}>
            <div className={styles["tabs"]}>
              <button className={`${styles["tab-button"]} ${activeTab === "Course Tools" ? styles["active"] : ""}`} onClick={() => handleTabClick("Course Tools")}>Course Tools</button>
              <button className={`${styles["tab-button"]} ${activeTab === "Setup" ? styles["active"] : ""}`} onClick={() => handleTabClick("Setup")}>Setup</button>
              <button className={`${styles["tab-button"]} ${activeTab === "Description" ? styles["active"] : ""}`} onClick={() => handleTabClick("Description")}>Description</button>
              <button className={`${styles["tab-button"]} ${activeTab === "Students" ? styles["active"] : ""}`} onClick={() => handleTabClick("Students")}>Students</button>
              <button className={`${styles["tab-button"]} ${activeTab === "Billing" ? styles["active"] : ""}`} onClick={() => handleTabClick("Billing")}>Billing</button>
            </div>
            <div className={styles["content-display"]}>
              {activeTab} Content
            </div>
          </div>
        </div>
      </div>
      <footer className={styles["footer"]}>
        © 2024 Physics Department. All rights reserved. This is beta access.
      </footer>
    </div>
  );
};

export default InterfacePage;
