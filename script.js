// Data for VTU 2022 Scheme (Example: 1st, 2nd, and 3rd Sem CSE)
const schemeData = {
    "1": [
        { code: "BMATS101", name: "Maths-I", credits: 4 },
        { code: "BPHYS102", name: "Applied Physics", credits: 4 },
        { code: "BPOPS103", name: "PRINCIPLE OF PROGRAMMING USING C", credits: 3 },
        { code: "BESCK104", name: "ESC-I", credits: 3 },
        { code: "BETCK105", name: "ETC-I", credits: 3 },
        { code: "BENGK106", name: "English", credits: 1 },
        { code: "BKSKK107", name: "Kannada", credits: 1 },
        { code: "BIDTK158", name: "IDT", credits: 1 }
    ],
    "2": [
        { code: "BMATS201", name: "Maths-II", credits: 4 },
        { code: "BCHES202", name: "Applied Chemistry", credits: 4 },
        { code: "BCEDK203", name: "CAED", credits: 3 },
        { code: "BESCK204", name: "ESC-II", credits: 3 },
        { code: "BPLCK205", name: "PLC-II", credits: 3 },
        { code: "BPWSK206", name: "PWS", credits: 1 },
        { code: "BICOK207", name: "Constitution", credits: 1 },
        { code: "BSFHK258", name: "SFH", credits: 1 }
    ],
    "3": [
        { code: "BCS301", name: "Maths for CS", credits: 4 },
        { code: "BCS302", name: "Digital Design", credits: 4 },
        { code: "BCS303", name: "Operating Systems", credits: 4 },
        { code: "BCS304", name: "Data Structures", credits: 3 },
        { code: "BCSL305", name: "DS Lab", credits: 1 },
        { code: "BCS306A", name: "OOP WITH JAVA", credits: 3 },
        { code: "BSCK307", name: "SOCIAL CONNECT AND RESPONSIBILITY", credits: 1 },
        { code: "BPEK359", name: "PHYSICAL EDUCATION", credits: 0 },
        { code: "BCS358", name: "AEC", credits: 1 }
    ],
    "4": [
        { code: "BCS401", name: "Analysis & Design of Algorithms", credits: 3 },
        { code: "BCS402", name: "Microcontrollers", credits: 4 },
        { code: "BCS403", name: "Database Management Systems", credits: 4 },
        { code: "BCSL404", name: "ADA LAB", credits: 1 },
        { code: "BCS405B", name: "Graph theory", credits: 3 },
        { code: "BCSL456D", name: " Technical Writing using Latex", credits: 1 },
        { code: "BBOC407", name: "Biology for engineers", credits: 2 },
        { code: "BUHK408", name: "Universal human values", credits: 1 }
    ],
    "5": [
        { code: "BCS501", name: "Software Engineering", credits: 4 },
        { code: "BCS502", name: "Computer Networks", credits: 4 },
        { code: "BCS503", name: "Theory of Computation", credits: 3 },
        { code: "BCS504", name: "Elective-I", credits: 3 }
    ],
    "6": [
        { code: "BCS601", name: "Compiler Design", credits: 4 },
        { code: "BCS602", name: "Computer Graphics", credits: 4 },
        { code: "BCS603", name: "Machine Learning", credits: 3 },
        { code: "BCS651", name: "Mini Project", credits: 2 }
    ],
    "7": [
        { code: "BCS701", name: "Cloud Computing", credits: 3 },
        { code: "BCS702", name: "Information Security", credits: 3 },
        { code: "BCS703", name: "Elective-II", credits: 3 },
        { code: "BCS751", name: "Project Phase-I", credits: 2 }
    ],
    "8": [
        { code: "BCS801", name: "Major Project", credits: 10 },
        { code: "BCS802", name: "Technical Seminar", credits: 2 },
        { code: "BCS803", name: "Internship", credits: 3 }
    ]
};

let allSemestersSGPA = [];

function loadSubjects() {
    const sem = document.getElementById('semester').value;
    const container = document.getElementById('subject-container');
    const actionButtons = document.getElementById('action-buttons');

    if (!sem) {
        container.innerHTML = "";
        actionButtons.style.display = "none";
        return;
    }

    let html = `<table><tr><th>Subject</th><th>Credits</th><th>Marks (0-100)</th></tr>`;
    schemeData[sem].forEach((sub, index) => {
        html += `
            <tr>
                <td>${sub.name} (${sub.code})</td>
                <td id="credit-${index}">${sub.credits}</td>
                <td><input type="number" class="marks-input" id="marks-${index}" min="0" max="100" placeholder="Enter Marks"></td>
            </tr>`;
    });
    html += `</table>`;
    container.innerHTML = html;
    actionButtons.style.display = "flex";
}

function getGradePoint(marks) {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 55) return 6;
    if (marks >= 50) return 5;
    if (marks >= 40) return 4;
    return 0;
}

function calculateSGPA() {
    const sem = document.getElementById('semester').value;
    const subjects = schemeData[sem];
    let totalCreditPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < subjects.length; i++) {
        const marks = parseInt(document.getElementById(`marks-${i}`).value);
        if (isNaN(marks)) {
            alert("Please enter marks for all subjects.");
            return;
        }
        const gp = getGradePoint(marks);
        const credits = subjects[i].credits;

        totalCreditPoints += (gp * credits);
        totalCredits += credits;
    }

    const sgpa = (totalCreditPoints / totalCredits).toFixed(2);
    document.getElementById('result-display').innerHTML = `Semester ${sem} SGPA: ${sgpa}`;
    return parseFloat(sgpa);
}

function addToCGPA() {
    const currentSGPA = calculateSGPA();
    if (currentSGPA) {
        allSemestersSGPA.push(currentSGPA);
        const cgpa = (allSemestersSGPA.reduce((a, b) => a + b) / allSemestersSGPA.length).toFixed(2);
        document.getElementById('result-display').innerHTML += `<br>Current CGPA: ${cgpa} (Average of ${allSemestersSGPA.length} sem)`;
    }
}