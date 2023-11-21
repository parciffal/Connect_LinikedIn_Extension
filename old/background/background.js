// background.js

import { openNewTab } from '../scripts/openNewTab.js';
import { checkContacts } from '../scripts/checkContacts.js';
import { PAGEINDEX } from '../config.js';
import { google } from 'googleapis';

var tabOpened = false;

const credentials = require('../musicsearch-321511-be1743e3af23.json');

const sheets = google.sheets('v4');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openNewTab" && !tabOpened) {
    openNewTab().then((index) => {
      tabOpened = true;
      PAGEINDEX = index;
    });
  } else if (request.action === "removeNewTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.remove(tabs[PAGEINDEX].id, function () {
        console.log("tab removed")
      });
    });
  }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateData') {
    const receivedData = request.data;

    // Your spreadsheet ID (from the URL)
    const spreadsheetId = '1jWCqCq1dzMNjB_YNVr-PPKE-45gKWmiSFp00yq9r8Ao';

    // Authenticate using your credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Write data to the spreadsheet
    sheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: 'Sheat1', // Replace with your sheet name
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [receivedData.FirstName, receivedData.LastName, receivedData.URL, receivedData.EmailAddress, receivedData.Company, receivedData.Position, receivedData.ConnectedOn]
          // Add more columns as needed
        ],
      },
    }, function (err, response) {
      if (err) {
        console.error('Error writing to spreadsheet:', err);
      } else {
        console.log('Data written to spreadsheet:', response.data);
      }
    });

    // You can send a response back if needed
    sendResponse({ success: true, message: 'Data received and written to spreadsheet successfully' });
  }
});