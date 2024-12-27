function search() {
    // Ensure the result section is visible
    document.querySelector(".result-section").style.display = "flex";

    // Find the value in input field
    const inputPanel = document.getElementById("input");
    const movieName = inputPanel.value.trim();

    if (!movieName) {
        alert("Please enter a movie name.");
        return;
    }

    // API URL with user input
    const url = `https://www.omdbapi.com/?apikey=51f249ea&t=${encodeURIComponent(movieName)}`;

    // Create and configure the XMLHttpRequest
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url);
    httpRequest.responseType = "json";

    // Handle the API response
    httpRequest.onload = function () {
        if (httpRequest.status === 200) {
            const response = httpRequest.response;

            if (response.Response === "True") {
                // Populate movie details
                document.getElementById("poster").src = response.Poster !== "N/A" ? response.Poster : "placeholder.jpg";
                document.getElementById("title").textContent = response.Title;
                document.getElementById("year").textContent = `Year: ${response.Year}`;
                document.getElementById("rating").textContent = `Rating: ${response.imdbRating || "N/A"}`;
                document.getElementById("plot").textContent = `Plot: ${response.Plot || "Plot information not available."}`;
            } else {
                alert("Movie not found. Please try another title.");
                resetResultSection();
            }
        } else {
            alert("Failed to fetch movie details. Please try again later.");
        }
    };

    httpRequest.onerror = function () {
        alert("An error occurred while fetching movie details. Please check your connection.");
    };

    // Send the request
    httpRequest.send();
}

function resetResultSection() {
    document.getElementById("poster").src = "placeholder.jpg";
    document.getElementById("title").textContent = "Movie Title";
    document.getElementById("year").textContent = "Year: N/A";
    document.getElementById("rating").textContent = "Rating: N/A";
    document.getElementById("plot").textContent = "Plot: N/A";
}

// Ensure the result section is hidden initially
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".result-section").style.display = "none";
});
