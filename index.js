// Ensure the log function is defined (it should output to an element in your HTML)
const logOutput = document.createElement('div');
document.body.appendChild(logOutput);
function log(message) {
  const logEntry = document.createElement('p');
  logEntry.textContent = message;
  logOutput.appendChild(logEntry);
}

// NFC scan button
document.getElementById("scanButton").addEventListener("click", async () => {
  log("User clicked scan button");

  if (!("NDEFReader" in window)) {
    log("Web NFC is not available in this browser.");
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      log("Error: Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);

      // Log each record's data (optional enhancement)
      for (const record of message.records) {
        log(`> Record type: ${record.recordType}, data: ${record.data}`);
      }
    });
  } catch (error) {
    log("Error: " + error);
  }
});

// NFC write button
document.getElementById("writeButton").addEventListener("click", async () => {
  log("User clicked write button");

  if (!("NDEFReader" in window)) {
    log("Web NFC is not available in this browser.");
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.write("Hello world!");
    log("> Message written to NFC tag");
  } catch (error) {
    log("Error: " + error);
  }
});

// NFC make read-only button
document.getElementById("makeReadOnlyButton").addEventListener("click", async () => {
  log("User clicked make read-only button");

  if (!("NDEFReader" in window)) {
    log("Web NFC is not available in this browser.");
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    log("> NFC tag has been made permanently read-only");
  } catch (error) {
    log("Error: " + error);
  }
});
