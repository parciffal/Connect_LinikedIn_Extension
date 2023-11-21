// import { checkContacts } from "../scripts/checkContacts"
// import { PAGEINDEX } from "../config"

console.log("checkContent", 0);

function checkContacts(openedTabIndex) {
  setTimeout(function () {
    const liElements = document.querySelectorAll('li.mn-connection-card.artdeco-list');
    const extractedData = [...liElements].map(extractDataFromConnectionCard);
  }, 3000);

  function extractDataFromConnectionCard(liEl) {
    if (!liEl) return null;

    const href = liEl.querySelector('a.mn-connection-card__link').getAttribute('href');
    const nameElement = liEl.querySelector('span.mn-connection-card__name');
    const names = nameElement ? nameElement.innerText.trim() : '';
    const [firstName, lastName] = names.split(" ");

    const connectionTime = liEl.querySelector('time.time-badge').innerText.trim();

    const positionElement = liEl.querySelector('span.mn-connection-card__occupation');
    const position = positionElement ? positionElement.innerText.trim() : '';
    const [role, company] = position.split(" at ");

    return {
      FirstName: firstName,
      LastName: lastName,
      URL: 'https://www.linkedin.com' + href,
      EmailAddress: '',
      Company: company,
      Position: role,
      ConnectedOn: connectionTime
    };
  }

  function showNotification(message) {
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }
}

checkContacts(0);
