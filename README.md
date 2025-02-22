# resume-template

Dynamic Resume Template - Single Page
This repository contains a Single Page Resume Template that dynamically generates a professional resume based on your projects and experience data. Simply update the JSON file, and your resume will be automatically generated in an optimized HTML format.

🚀 Features:
✅ Single-page responsive design
✅ Dynamic content from JSON data
✅ Easily customizable
✅ SEO-friendly and print-ready

Perfect for designers, developers, and professionals looking for a quick and efficient way to create a standout resume!

JSON strictly follows instructions:
✅ aboutSelf is within 370 characters.
✅ proficiency contains up to 10 skills.
✅ experience You can have either:
1 company with 3 projects, or
2 companies (one with 2 projects, one with 1 project), or
3 companies with 1 project each
Do not exceed 3 total companies/projects in the array
✅ education includes exactly 2 entries.

Everything in the JSON should be a string, except for skillScore, which should be a number (integer between 0-100).

# JSON Structure Guide

This document describes the structure of the JSON file, detailing each field and its constraints.

Schema Overview
The JSON consists of the following main sections:

- Personal Information
- Proficiency (Skills)
- Experience (Work History & Projects)
- Education

1.  Personal Information
    json
    "yourName": "John Doe",
    "yourEmail": "johndoe@example.com",
    "yourLinkedIn": "https://www.linkedin.com/in/johndoe",
    "yourGithub": "https://github.com/johndoe",
    "jobRole": "Full Stack Developer",
    "aboutSelf": "Passionate developer with expertise in JavaScript, React, and Node.js. Experienced in building scalable web applications..."

Constraints:

- aboutSelf: Should not exceed 370 characters.
- yourEmail , yourLinkedIn & yourGithub: Must be valid email , LinkedIn and Github profile URLs.

2.  Proficiency (Skills)
    json
    "proficiency": [
    {
    "skillName": "JavaScript",
    "skillScore": 90
    },
    {
    "skillName": "React.js",
    "skillScore": 85
    }
    ]

Constraints:

- Must be an array of objects.
- skillName: A string.
- skillScore: A string.
- Maximum of 10 skills.

3.  Experience
    json
    "experience": [
    {
    "companyName": "Tech Solutions Inc.",
    "yearFromTo": "2021 - Present",
    "projects": [
    {
    "title": "E-commerce Platform",
    "breakPoints": [
    "Developed frontend with React",
    "Integrated Stripe payments",
    "Optimized performance",
    "Led a team of 5 developers"
    ]
    }
    ]
    }
    ]

Constraints:

- Can have up to 3 companies/projects in total.
- Each company must have:
  - `companyName`: String
  - `yearFromTo`: String (Format: `YYYY - YYYY` or `YYYY - Present`)
  - `projects`: Array (Max 3 projects per company)
    - `title`: String (Project title)
    - `breakPoints`: Array of exactly 4 bullet points (strings)
    - `breakPoints characters do not exceed the 110-character limit`

Valid options:
✅ 1 Company with 3 Projects  
✅ 2 Companies (1 with 2 projects, 1 with 1 project)  
✅ 3 Companies with 1 Project Each

4.  Education
    json
    "education": [
    {
    "batch": "2015 - 2019",
    "eduTitle": "Bachelor of Computer Science",
    "instituteName": "XYZ University"
    }
    ]

Constraints:

- Must contain exactly 2 objects.
- Each object should have:
  - `batch`: String (Format: `YYYY - YYYY`)
  - `eduTitle`: String
  - `instituteName`: String
  - `The eduTitle and instituteName characters do not exceed the 90-character limit`.

Final Notes
✅ All fields except `skillScore` should be strings.  
✅ Follow the character limits and structured constraints.  
✅ Ensure JSON follows the correct nesting and formatting.

For any modifications, refer to this document as a guideline. 🚀
