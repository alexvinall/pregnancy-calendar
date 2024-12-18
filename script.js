document.getElementById('pregnancy-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const weeks = parseInt(document.getElementById('weeks').value);
  const days = parseInt(document.getElementById('days').value);
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - ((weeks * 7 + days) * 86400000));
  const dueDate = new Date(startDate.getTime() + (40 * 7 * 86400000));
  const dueDateString = formatDateToLongString(dueDate);
  const calendar = ics();

  function formatDateToLongString(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/(\d+)(?=\s)/, (match) => {
      const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };
      const lastDigit = match.slice(-1);
      return match + (suffixes[lastDigit] && !(match > 3 && match < 21) ? suffixes[lastDigit] : 'th');
    });
  }

  const fruitSizes = [
      "poppy seed", "poppy seed", "poppy seed", "poppy seed",               // 1-4
      "poppy seed", "poppy seed", "blueberry", "blueberry",                 // 5-8
      "blueberry", "raspberry", "raspberry", "lime",                        // 9-12
      "lime", "lime", "apple", "apple",                                     // 13-16
      "apple", "apple", "heirloom tomato", "heirloom tomato",               // 17-20
      "heirloom tomato", "heirloom tomato", "mango", "mango",               // 21-24
      "mango", "mango", "mango", "eggplant",                                // 25-28
      "eggplant", "eggplant", "coconut", "coconut",                         // 29-32
      "coconut", "coconut", "honeydew melon", "honeydew melon",             // 33-36
      "honeydew melon", "honeydew melon", "honeydew melon", "small pumpkin" // 37-40
  ];

  for (let i = 0; i <= 40; i++) {
      const eventDate = new Date(startDate.getTime() + (i * 7 * 86400000));
      const eventStartDate = eventDate.toISOString().split('T')[0];

      var weekTitle = `${i} Weeks`;
      if (i == 0) { weekTitle = "Estimated start of last period"};
      if (i == 13) { weekTitle = "13 Weeks: Start of second trimester"};
      if (i == 28) { weekTitle = "28 Weeks: Start of third trimester"};
      if (i == 40) { weekTitle = "40 Weeks: Due Date"};

      var fruitSize = `Baby is the size of a ${fruitSizes[i-1]}`;
      if (i < 4) { fruitSize = "" };

      calendar.addEvent(
        weekTitle,
        fruitSize,
        '',
        eventStartDate,
        eventStartDate
      );
  }

  // Display the estimated due date to the user
  const container = document.querySelector('.container');
  let dueDateElement = document.getElementById('due-date');
  if (!dueDateElement) {
    dueDateElement = document.createElement('p');
    dueDateElement.id = 'due-date';
    container.appendChild(dueDateElement);
  }
  dueDateElement.textContent = `Your estimated due date is ${dueDateString}.`;

  // Allow the user to download the calendar
  const downloadLink = document.getElementById('download-link');
  downloadLink.style.display = 'block';
  downloadLink.style.marginTop = '15px';
  downloadLink.onclick = function() {
    calendar.download('pregnancy-calendar');
  };
});