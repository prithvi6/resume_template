"use strict";

const container_id = document.getElementById("container");

const trimLength = (length, content) => {
  const trimmedText = content.innerHTML.trim();
  const clippedText =
    trimmedText.length > length
      ? trimmedText.substring(0, length) + "..."
      : trimmedText;
  const txt = document.createElement("p");
  txt.className = "commonTextSize";
  txt.textContent = clippedText;
  return txt;
};

const createTextElement = (length, text) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  return trimLength(length, tempDiv);
};

const trimExpData = (data) => {
  let tempData = [...data];

  if (data.length >= 3) {
    tempData = data.slice(0, 3).map((exp) => {
      return {
        companyName: exp.companyName,
        yearFromTo: exp.yearFromTo,
        projects: exp.projects.slice(0, 1),
      };
    });
  } else if (data.length === 2) {
    tempData = data.map((exp, index) => {
      let project = [...exp.projects];
      let formattedProjects = [];

      if (index === 0) {
        if (exp.projects.length >= 2 && data[1].projects.length >= 2) {
          formattedProjects = project.slice(0, 2);
        } else if (exp.projects.length >= 2 && data[1].projects.length === 1) {
          formattedProjects = project.slice(0, 2);
        } else {
          formattedProjects = project.slice(0, 1);
        }
      }

      if (index === 1) {
        if (exp.projects.length >= 2 && data[0].projects.length === 1) {
          formattedProjects = project.slice(0, 2);
        } else {
          formattedProjects = project.slice(0, 1);
        }
      }

      return {
        companyName: exp.companyName,
        yearFromTo: exp.yearFromTo,
        projects: formattedProjects,
      };
    });
  } else if (data.length === 1) {
    tempData = data.map((exp) => {
      return {
        companyName: exp.companyName,
        yearFromTo: exp.yearFromTo,
        projects: exp.projects.slice(0, 3),
      };
    });
  }

  console.log(tempData);
  return tempData;
};

// Header elements
const header = document.createElement("header");
header.className = "header";
const personalInfo__1 = document.createElement("div");
const personalInfo__2 = document.createElement("div");
personalInfo__1.className = "personalInfo__1";
personalInfo__2.className = "personalInfo__2";

// About Self Element
const selfInfo = document.createElement("div");
selfInfo.className = "selfInfo";

// Experience and skill Elements
const proficiency = document.createElement("div");
proficiency.className = "proficiency";

const experience = document.createElement("div");
experience.className = "experience";
const experienceTitle = document.createElement("h3");
experienceTitle.className = "sectionTitle";
experienceTitle.textContent = "Experience";

const yourGithubLink = document.createElement("div");
yourGithubLink.className = "yourGithubLink";
const experienceContent = document.createElement("div");
experienceContent.className = "experienceContent";
const companyNameTitle = document.createElement("p");
companyNameTitle.className = "companyNameTitle";
const yearFromTo = document.createElement("p");

const projectTitle = document.createElement("p");
projectTitle.className = "project-title";

const projectBreakPoints = document.createElement("ul");
projectBreakPoints.className = "projectBreakPoints";

// Skill elements
const skills = document.createElement("div");
skills.className = "skills";
const skillsTitle = document.createElement("h3");
skillsTitle.className = "sectionTitle";
skillsTitle.textContent = "Skills";

const skillList = document.createElement("ul");
skillList.className = "skillList";

// Education Elements
const education = document.createElement("div");
education.className = "education";

const educationTitle = document.createElement("h3");
educationTitle.className = "sectionTitle";
educationTitle.textContent = "Education";

const educationList = document.createElement("div");
educationList.className = "educationList";

// Render resume
const resume = async () => {
  try {
    const response = await fetch("./resume.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(typeof data);

    // Update personalInfo__1 and personalInfo__2
    personalInfo__1.innerHTML =
      `<H3>${data.yourName}</H3>` + `<p>${data.jobRole}</p>`;
    personalInfo__2.innerHTML =
      `<p><a href='mailto:${data.yourEmail}'>Email: ${data.yourEmail}</a></p>` +
      `<p>LinkedIn: <span><a href='${data.yourLinkedIn}''>${data.yourName}</a></span></p>`;

    header.append(personalInfo__1, personalInfo__2);

    //Update header
    container_id.appendChild(header);

    // Update selfInfo
    selfInfo.innerHTML = `${data.aboutSelf}`;

    container_id.appendChild(trimLength(370, selfInfo));

    // Experience
    const experienceData = trimExpData(data.experience);

    yourGithubLink.innerHTML = data.yourGithub
      ? `<p>Github Link: ${data.yourGithub}</p>`
      : "";

    experienceData.map((exp, index) => {
      const companyNameTitle = document.createElement("p");
      companyNameTitle.className = "project-title";
      companyNameTitle.textContent = exp.companyName;

      const yearFromTo = document.createElement("p");
      yearFromTo.className = "project-title";
      yearFromTo.textContent = exp.yearFromTo;

      experienceContent.append(companyNameTitle, yearFromTo);

      exp.projects.forEach((project) => {
        const projectTitle = document.createElement("p");
        projectTitle.className = "project-title";
        projectTitle.textContent = "Project Title: " + project.title;

        const projectBreakPoints = document.createElement("ul");
        projectBreakPoints.className = "projectBreakPoints";

        if (project.breakPoints && project.breakPoints.length > 0) {
          project.breakPoints.forEach((point) => {
            const li = document.createElement("li");

            li.appendChild(createTextElement(110, point.trim()));

            projectBreakPoints.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.textContent = "No breakpoints available";
          projectBreakPoints.appendChild(li);
        }
        experienceContent.append(projectTitle, projectBreakPoints);
      });
    });

    experience.append(experienceTitle, yourGithubLink, experienceContent);

    // Skills
    const proficiencyData =
      data.proficiency.length > 10
        ? data.proficiency.slice(0, 10)
        : data.proficiency;

    skillList.innerHTML = proficiencyData
      .map(
        (skill) =>
          `<li><label for='file'><p>${skill.skillName}</p></label>` +
          `<div class='progress-container'>${skill.skillScore}</div></li>`
      )
      .join("");

    skills.append(skillsTitle, skillList);

    proficiency.append(experience, skills);
    container_id.appendChild(proficiency);

    // Update education
    const educationData =
      data.education.length > 2 ? data.education.slice(0, 2) : data.education;

    educationList.innerHTML = educationData
      .map((edu) => {
        return (
          createTextElement(90, edu.eduTitle).outerHTML +
          createTextElement(50, edu.batch).outerHTML +
          createTextElement(90, edu.instituteName).outerHTML
        );
      })
      .join("");

    education.append(educationTitle, educationList);
    container_id.appendChild(education);
  } catch (error) {
    console.error("Error fetching resume:", error);
  }
};

resume();
