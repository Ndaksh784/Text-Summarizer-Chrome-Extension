    chrome.runtime.onInstalled.addListener(() => {
      
      chrome.contextMenus.create({
        id: "summarize-text",
        title: "Summarize Selected Text",
        contexts: ["selection"]
      });
    });

   
    chrome.contextMenus.onClicked.addListener(async (info) => {
      if (info.menuItemId === "summarize-text" && info.selectionText) {
        const selectedText = info.selectionText.trim();
        console.log("Selected text:", selectedText);

        try {
          const summary = await fetchSummary(selectedText);
          console.log("Summary:", summary);

         
          chrome.storage.local.set({ summary }, () => {
            console.log("Summary stored:", summary);
          });

          
          alert(`Summary:\n${summary}`);
        } catch (error) {
          console.error("Error:", error.message);
          alert(`Error: ${error.message}`);
        }
      }
    });

    
    async function fetchSummary(text) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            authorizatio:
            

            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: text,
            parameters: { min_length: 30, max_length: 100 }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data[0]?.summary_text || "No summary available.";
    }
