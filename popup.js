document.getElementById('clickButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        let trs = document.querySelectorAll(".course-info-accordion-btn");
        trs.forEach(tr => tr.click());
      }
    });
  });
});

document.getElementById('copyLinksButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        document.querySelector(".notice-board__header").click();
        let pinnedMessage = document.querySelectorAll(".pin-message__body");
        const pinnedLinks = [];
        pinnedMessage.forEach(message => {
          const link = message.querySelector("a")?.href;
          if (link) {
            pinnedLinks.push(link);
          }
        });
        
        function copyTextToClipboard(text) {
          //Create a textbox field where we can insert text to. 
          var copyFrom = document.createElement("textarea");
        
          //Set the text content to be the text you wished to copy.
          copyFrom.textContent = text;
        
          //Append the textbox field into the body as a child. 
          //"execCommand()" only works when there exists selected text, and the text is inside 
          //document.body (meaning the text is part of a valid rendered HTML element).
          document.body.appendChild(copyFrom);
        
          //Select all the text!
          copyFrom.select();
        
          //Execute command
          document.execCommand('copy');
        
          //(Optional) De-select the text using blur(). 
          copyFrom.blur();
        
          //Remove the textbox field from the document.body, so no other JavaScript nor 
          //other elements can get access to this.
          document.body.removeChild(copyFrom);
        }

        copyTextToClipboard(pinnedLinks.join('\n'));
      },
    });
  });
});
