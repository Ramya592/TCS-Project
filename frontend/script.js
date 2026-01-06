document.querySelector("button").addEventListener("click", async () => {
  const feedbackText = document.querySelector("textarea").value;

  try {
    const response = await fetch(
      "https://smart-feedback-backend-ysg0.onrender.com/api/feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: feedbackText }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Feedback submitted successfully");
    } else {
      alert(data.message || "Submission failed");
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting feedback");
  }
});
