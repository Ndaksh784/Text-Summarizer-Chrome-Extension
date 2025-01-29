document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarize-btn");
  const summaryDiv = document.getElementById("summary");

  summarizeButton.addEventListener("click", () => {
    
    chrome.storage.local.get("summary", ({ summary }) => {
      if (summary) {
        summaryDiv.textContent = summary; 
        alert(`Summary:\n${summary}`);
      } else {
        const noSummaryMessage = "No summary available.";
        summaryDiv.textContent = noSummaryMessage;
        alert(noSummaryMessage); 
      }
    });
  });
});
