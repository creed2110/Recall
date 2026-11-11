// ========================================
// RECALL DASHBOARD - FRONTEND PROTOTYPE
// ========================================

// SAMPLE DATA
let courses = [
  { code: "MTH 101", name: "General Mathematics", progress: 35 },
  { code: "MTH 103", name: "Vectors and Mechanics", progress: 20 },
  { code: "PHY 101", name: "General Physics", progress: 45 },
  { code: "TCS 101", name: "Introduction to Telecommunication", progress: 60 },
  { code: "COS 101", name: "Introduction to Computing", progress: 75 }
];

let assignments = [
  { title: "Set Theory Exercises", course: "MTH 101", due: "Nov 14, 2026", completed: false },
  { title: "Vector Practice Questions", course: "MTH 103", due: "Nov 16, 2026", completed: false },
  { title: "Physics Practical Report", course: "PHY 101", due: "Nov 18, 2026", completed: false },
  { title: "Introduction to Computing", course: "COS 101", due: "Nov 10, 2026", completed: true }
];

let notes = [
  {
    title: "Introduction to Set Theory",
    course: "MTH 101",
    content: "A set is a well-defined collection of distinct objects. Sets can be represented using roster and set-builder notation.",
    date: "November 9, 2026"
  },
  {
    title: "Scalar and Vector Quantities",
    course: "MTH 103",
    content: "Scalar quantities have magnitude only, while vector quantities have both magnitude and direction.",
    date: "November 8, 2026"
  },
  {
    title: "Basic Physics Concepts",
    course: "PHY 101",
    content: "Physics is the study of matter, energy, motion and the interactions between them.",
    date: "November 7, 2026"
  },
  {
    title: "Introduction to Telecommunication",
    course: "TCS 101",
    content: "Telecommunication involves transmitting information over distances using electronic or electromagnetic systems.",
    date: "November 6, 2026"
  }
];

let flashcards = [
  {
    question: "What is a vector?",
    answer: "A quantity that has both magnitude and direction."
  },
  {
    question: "What is a scalar?",
    answer: "A quantity that has magnitude only and no direction."
  },
  {
    question: "What is the magnitude of a vector?",
    answer: "The length or size of a vector."
  },
  {
    question: "What is a unit vector?",
    answer: "A vector with a magnitude equal to one."
  }
];

// ========================================
// PAGE NAVIGATION
// ========================================

const pageTitles = {
  overview: "Overview",
  assignments: "Assignments",
  courses: "Courses",
  flashcards: "Flashcards",
  notes: "Lecture Notes",
  settings: "Settings"
};

function navigateTo(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll("[data-page]").forEach(button => {
    button.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageName);

  if (!selectedPage) return;

  selectedPage.classList.add("active");

  document.querySelectorAll(`[data-page="${pageName}"]`).forEach(button => {
    button.classList.add("active");
  });

  document.getElementById("page-title").textContent =
    pageTitles[pageName] || "Recall";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    navigateTo(button.dataset.page);
  });
});

document.querySelectorAll("[data-goto]").forEach(button => {
  button.addEventListener("click", () => {
    navigateTo(button.dataset.goto);
  });
});

// ========================================
// DATE
// ========================================

document.getElementById("current-date").textContent =
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

// ========================================
// COURSE RENDERING
// ========================================

function renderCourses() {
  const overviewContainer =
    document.getElementById("overview-courses");

  const courseContainer =
    document.getElementById("course-grid");

  overviewContainer.innerHTML = "";
  courseContainer.innerHTML = "";

  courses.forEach(course => {
    overviewContainer.innerHTML += `
      <div>
        <div class="progress-item-top">
          <strong>${course.code}</strong>
          <span>${course.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${course.progress}%"></div>
        </div>
      </div>
    `;

    courseContainer.innerHTML += `
      <article class="course-card">
        <span class="course-code">${course.code}</span>
        <h3>${course.name}</h3>
        <p>Course learning progress</p>

        <div class="progress-item-top">
          <strong>Progress</strong>
          <span>${course.progress}%</span>
        </div>

        <div class="progress-track">
          <div class="progress-fill" style="width: ${course.progress}%"></div>
        </div>
      </article>
    `;
  });

  document.getElementById("stat-courses").textContent = courses.length;
}

document.getElementById("add-course").addEventListener("click", () => {
  const code = prompt("Enter course code (e.g. STA 111):");

  if (!code || !code.trim()) return;

  const name = prompt("Enter course title:");

  if (!name || !name.trim()) return;

  courses.push({
    code: code.trim().toUpperCase(),
    name: name.trim(),
    progress: 0
  });

  renderCourses();
  alert("Course added successfully!");
});

// ========================================
// ASSIGNMENTS
// ========================================

function renderAssignments() {
  const container = document.getElementById("assignment-list");
  const overview = document.getElementById("overview-assignments");

  container.innerHTML = "";
  overview.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const row = `
      <div class="assignment-row ${assignment.completed ? "completed" : ""}">
        <div class="assignment-main">
          <input
            type="checkbox"
            data-assignment="${index}"
            ${assignment.completed ? "checked" : ""}
          >
          <div>
            <strong>${escapeHTML(assignment.title)}</strong>
            <small>${escapeHTML(assignment.course)}</small>
          </div>
        </div>
        <span class="assignment-deadline">${escapeHTML(assignment.due)}</span>
      </div>
    `;

    container.innerHTML += row;

    if (!assignment.completed) {
      overview.innerHTML += row;
    }
  });

  if (!overview.innerHTML) {
    overview.innerHTML = "<p class='muted'>You're all caught up. No pending assignments.</p>";
  }

  document.getElementById("assignment-total").textContent =
    assignments.length;

  const completedCount =
    assignments.filter(item => item.completed).length;

  document.getElementById("assignment-done").textContent =
    completedCount;

  document.getElementById("assignment-pending").textContent =
    assignments.length - completedCount;

  document.getElementById("stat-completed").textContent =
    completedCount;

  document.getElementById("stat-pending").textContent =
    assignments.length - completedCount;
}

document.addEventListener("change", event => {
  if (event.target.matches("[data-assignment]")) {
    const index = Number(event.target.dataset.assignment);

    assignments[index].completed = event.target.checked;

    renderAssignments();
  }
});

document.getElementById("add-assignment").addEventListener("click", () => {
  const title = prompt("Enter assignment title:");

  if (!title || !title.trim()) return;

  const course = prompt("Enter course code:");

  if (!course || !course.trim()) return;

  const due = prompt("Enter deadline (e.g. Nov 20, 2026):");

  if (!due || !due.trim()) return;

  assignments.push({
    title: title.trim(),
    course: course.trim().toUpperCase(),
    due: due.trim(),
    completed: false
  });

  renderAssignments();
});

// ========================================
// FLASHCARDS
// ========================================

let currentCard = 0;
let showingAnswer = false;

const flashcardElement = document.getElementById("flashcard");
const flashcardContent = document.getElementById("flashcard-content");
const cardSideLabel = document.getElementById("card-side-label");
const flashcardCounter = document.getElementById("flashcard-counter");

function renderFlashcard() {
  const card = flashcards[currentCard];

  showingAnswer = false;

  flashcardContent.textContent = card.question;
  cardSideLabel.textContent = "QUESTION";

  flashcardCounter.textContent =
    `Card ${currentCard + 1} of ${flashcards.length}`;
}

flashcardElement.addEventListener("click", () => {
  showingAnswer = !showingAnswer;

  const card = flashcards[currentCard];

  flashcardContent.textContent = showingAnswer
    ? card.answer
    : card.question;

  cardSideLabel.textContent = showingAnswer
    ? "ANSWER"
    : "QUESTION";
});

document.getElementById("next-card").addEventListener("click", () => {
  currentCard = (currentCard + 1) % flashcards.length;
  renderFlashcard();
});

document.getElementById("previous-card").addEventListener("click", () => {
  currentCard =
    (currentCard - 1 + flashcards.length) % flashcards.length;

  renderFlashcard();
});

document.querySelectorAll("[data-difficulty]").forEach(button => {
  button.addEventListener("click", () => {
    const difficulty = button.dataset.difficulty;

    alert(`You rated this card: ${difficulty}`);

    currentCard = (currentCard + 1) % flashcards.length;
    renderFlashcard();
  });
});

// ========================================
// NOTES
// ========================================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderNotes() {
  const container = document.getElementById("notes-grid");

  const searchTerm =
    document.getElementById("note-search").value.toLowerCase();

  const selectedCourse =
    document.getElementById("note-filter").value;

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm);

    const matchesCourse =
      selectedCourse === "all" ||
      note.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  container.innerHTML = "";

  if (filteredNotes.length === 0) {
    container.innerHTML =
      "<p class='muted'>No notes found. Try another search.</p>";
    return;
  }

  filteredNotes.forEach(note => {
    container.innerHTML += `
      <article class="note-card">
        <span>${escapeHTML(note.course)}</span>
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.content)}</p>
        <small>${escapeHTML(note.date)}</small>
      </article>
    `;
  });
}

document.getElementById("note-search").addEventListener("input", renderNotes);
document.getElementById("note-filter").addEventListener("change", renderNotes);

document.getElementById("add-note").addEventListener("click", () => {
  const title = prompt("Enter note title:");

  if (!title || !title.trim()) return;

  const course = prompt("Enter course code:");

  if (!course || !course.trim()) return;

  const content = prompt("Write a short note:");

  if (!content || !content.trim()) return;

  notes.unshift({
    title: title.trim(),
    course: course.trim().toUpperCase(),
    content: content.trim(),
    date: new Date().toLocaleDateString()
  });

  renderNotes();
});

// ========================================
// SETTINGS
// ========================================

document.getElementById("save-profile").addEventListener("click", () => {
  const name = document.getElementById("display-name").value.trim();
  const email = document.getElementById("display-email").value.trim();

  if (!name) {
    alert("Please enter your display name.");
    return;
  }

  document.querySelectorAll(".profile-info strong").forEach(element => {
    element.textContent = name;
  });

  document.querySelectorAll(".profile-avatar, .top-avatar").forEach(element => {
    element.textContent = name.charAt(0).toUpperCase();
  });

  alert("Profile updated in this page.");
});

document.getElementById("save-preferences").addEventListener("click", () => {
  const goal = document.getElementById("study-goal").value;
  const reminder = document.getElementById("reminder").value;

  alert(
    `Study goal: ${goal}\nReminder: ${reminder}\n\nPreferences updated in this page.`
  );
});

// ========================================
// INITIALIZE DASHBOARD
// ========================================

renderCourses();
renderAssignments();
renderFlashcard();
renderNotes();


