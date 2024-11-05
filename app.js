function calculateDate() {
    const dateInput = document.getElementById("date").value;
    const daysInput = document.getElementById("days").value;
    const result = document.getElementById("result");
    const detailedInfo = document.getElementById("detailed-info");
  
    if (!dateInput || !daysInput) {
      result.textContent = "Please enter both a date and number of days.";
      detailedInfo.innerHTML = "";
      return;
    }
  
    // Parse input date and days
    const date = new Date(dateInput);
    const days = parseInt(daysInput, 10);
  
    // Calculate the new date
    date.setDate(date.getDate() + days);
  
    // Format the resulting date
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const newDateFormatted = date.toLocaleDateString("en-US", options);
  
    // Display main result
    result.textContent = `${days} days from ${new Date(dateInput).toLocaleDateString("en-US", options)} is ${newDateFormatted}.`;
  
    // Calculate additional information
    const dayOfYear = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
    const daysLeftInYear = isLeapYear(date.getFullYear()) ? 366 - dayOfYear : 365 - dayOfYear;
    const weekOfYear = Math.ceil(dayOfYear / 7);
    const percentOfYear = ((dayOfYear / (isLeapYear(date.getFullYear()) ? 366 : 365)) * 100).toFixed(2);
    const season = getSeason(date);
  
    // Display detailed info
    detailedInfo.innerHTML = `
      <ul class="list-disc text-left ml-4">
        <li>Weekday: ${newDateFormatted.split(", ")[0]}</li>
        <li>Week of the Year: ${weekOfYear}</li>
        <li>Day of the Year: ${dayOfYear}</li>
        <li>Days Left in the Year: ${daysLeftInYear}</li>
        <li>Year Progress: ${percentOfYear}%</li>
        <li>Season: ${season}</li>
      </ul>
    `;
  }
  
  // Helper function to check leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  
  // Helper function to determine the season
  function getSeason(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    if ((month === 3 && day >= 20) || (month > 3 && month < 6) || (month === 6 && day < 21)) return "Spring";
    if ((month === 6 && day >= 21) || (month > 6 && month < 9) || (month === 9 && day < 23)) return "Summer";
    if ((month === 9 && day >= 23) || (month > 9 && month < 12) || (month === 12 && day < 21)) return "Autumn";
    return "Winter";
  }
  