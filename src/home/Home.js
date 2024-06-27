import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import GitHubIcon from "../assets/github-1.svg";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header-bar">
        <text className="title">Algorithm Visualizers</text>
      </div>
      <div className="project-links">
        <div className="project-link">
          <header className="project-title">
            Pathfinding Algorithm Project
          </header>
          <p>
            A React app that showcases several prominent pathfinding algorithms
            that can explore mazes that are either user generated or created by
            the included maze generation algorithms. Users can adjust the speed and introduce weights to the grid.
          </p>
          <Link to="/pathfinding">Go</Link>
        </div>
        <div className="project-link">
          <header className="project-title">Sorting Algorithm Project</header>
          <p>
            A front-end website built in React that visualizes multiple classic
            sorting algorithms such as quick sort, merge sort, heap sort, etc.
            It includes options to adjust speed of visualizations and element size.
          </p>
          <Link to="/sorting">Go</Link>
        </div>
      </div>
      <div className="footer-bar">
        <a
          className="footer-item"
          href="https://github.com/vhcent/Algorithm-Visualizer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={GitHubIcon}
            alt="GitHub"
            style={{ width: "24px", height: "24px", marginRight: "8px" }}
          />
          GitHub Repository
        </a>
        <div>
          <text className="">
            Made by <a href="https://github.com/vhcent">Vincent</a> and{" "}
            <a href="https://github.com/AroopBiswal">Aroop</a>
          </text>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
