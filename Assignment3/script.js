const form = document.getElementById("feedbackForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const feedback = document.getElementById("feedback");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const feedbackError = document.getElementById("feedbackError");

function showStoredData() {

    let data = localStorage.getItem("feedback");

    if (data) {

        data = JSON.parse(data);

        document.getElementById("displayData").innerHTML = `
            <b>Name:</b> ${data.name}<br><br>

            <b>Email:</b> ${data.email}<br><br>

            <b>Course:</b> ${data.course}<br><br>

            <b>Feedback:</b> ${data.feedback}
        `;

    } else {

        document.getElementById("displayData").innerHTML =
            "No feedback stored.";

    }

    let sessionName = sessionStorage.getItem("studentName");

    if (sessionName) {

        document.getElementById("sessionUser").innerHTML =
            "Current Session User: " + sessionName;

    } else {

        document.getElementById("sessionUser").innerHTML = "";

    }
}

function validate() {

    let valid = true;

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    courseError.innerHTML = "";
    feedbackError.innerHTML = "";

    if (name.value.trim() == "") {
        nameError.innerHTML = "Please enter student name.";
        valid = false;
    }

    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == "") {

        emailError.innerHTML = "Please enter email.";
        valid = false;

    } else if (!pattern.test(email.value)) {

        emailError.innerHTML = "Enter a valid email.";
        valid = false;

    }

    if (course.value == "") {

        courseError.innerHTML = "Please select a course.";
        valid = false;

    }

    if (feedback.value.trim() == "") {

        feedbackError.innerHTML = "Please enter feedback.";
        valid = false;

    }

    return valid;
}


name.addEventListener("input", function () {

    if (name.value.trim() != "") {
        nameError.innerHTML = "";
    }

});

email.addEventListener("input", function () {

    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(email.value)) {
        emailError.innerHTML = "";
    }

});

course.addEventListener("change", function () {

    if (course.value != "") {
        courseError.innerHTML = "";
    }

});

feedback.addEventListener("input", function () {

    if (feedback.value.trim() != "") {
        feedbackError.innerHTML = "";
    }

});


form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (validate()) {

        const student = {

            name: name.value,
            email: email.value,
            course: course.value,
            feedback: feedback.value

        };

        localStorage.setItem("feedback", JSON.stringify(student));

        sessionStorage.setItem("studentName", name.value);

        showStoredData();

        form.reset();

    }

});


document.getElementById("deleteBtn").addEventListener("click", function () {

    localStorage.removeItem("feedback");

    sessionStorage.removeItem("studentName");

    document.getElementById("displayData").innerHTML =
        "No feedback stored.";

    document.getElementById("sessionUser").innerHTML = "";

});

showStoredData();