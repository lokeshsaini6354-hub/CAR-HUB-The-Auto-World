
// PAGE NAVIGATION
let pages = ["home", "cars", "compare", "booking", "about", "contact"];
let currentPage = 0;

function showPage(page) {
    currentPage = pages.indexOf(page);

    document.querySelectorAll(".page").forEach(p =>
        p.classList.remove("active")
    );

    document.getElementById(page).classList.add("active");
    window.scrollTo(0, 0);
}

// NAVIGATION BUTTONS
document.querySelectorAll("[data-page]").forEach(button =>
    button.onclick = () => showPage(button.dataset.page)
);

document.getElementById("nextButton").onclick = () =>
    showPage(pages[Math.min(currentPage + 1, pages.length - 1)]);

document.getElementById("previousButton").onclick = () =>
    showPage(pages[Math.max(currentPage - 1, 0)]);

// STAR RATINGS
document.querySelectorAll(".stars").forEach(stars => {
    stars.innerHTML = "<span>☆</span>".repeat(5);

    stars.onclick = e => {
        if (e.target.tagName !== "SPAN") return;

        let rating = [...stars.children].indexOf(e.target) + 1;

        [...stars.children].forEach((star, i) =>
            star.textContent = i < rating ? "★" : "☆"
        );

        stars.nextElementSibling.textContent =
            "Your Rating: " + rating + "/5";
    };
});

// SELECT CAR FOR BOOKING
document.querySelectorAll("[data-book]").forEach(button => {
    button.onclick = () => {
        document.getElementById("bookingCar").value =
            button.dataset.book;

        showPage("booking");
    };
});

// CAR COMPARISON
document.getElementById("compareButton").onclick = () => {
    let a = document.getElementById("carOne").value;
    let b = document.getElementById("carTwo").value;
    let result = document.getElementById("comparisonResult");

    if (!a || !b || a === b) {
        result.innerHTML = "<p>Please select two different cars.</p>";
        return;
    }

    result.innerHTML = [a, b].map(name => {
        let car = [...document.querySelectorAll(".car-card")]
            .find(card => card.querySelector("h3").textContent === name);

        return `<div>
            <h3>${name}</h3>
            <p>${car.children[2].textContent}</p>
            <p>${car.children[3].textContent}</p>
            <p>${car.children[4].textContent}</p>
        </div>`;
    }).join("");

    result.className = "comparison";
};

// BOOKING FORM
document.getElementById("bookingForm").onsubmit = e => {
    e.preventDefault();

    let name = document.getElementById("customerName").value;
    let car = document.getElementById("bookingCar").value;
    let date = document.getElementById("bookingDate").value;

    document.getElementById("bookingMessage").innerHTML =
        `Thank you ${name}!<br>
        Your ${car} test drive request is received.<br>
        Date: ${date}<br>Demo booking only.`;

    e.target.reset();
};

// CONTACT FORM
document.getElementById("contactForm").onsubmit = e => {
    e.preventDefault();
    alert("Thank you! Your message has been received.");
    e.target.reset();
};

// DISABLE PREVIOUS BOOKING DATES
let today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

document.getElementById("bookingDate").min =
    today.toISOString().split("T")[0];
