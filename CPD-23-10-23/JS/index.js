// This function simulates fetching race results from a server
function fetchRaceResults(year) {
    return new Promise((resolve, reject) => {
      // Simulating network request with setTimeout
      setTimeout(() => {
        const data = {
          2022: [
            { grandPrix: 'Monaco', winner: 'Max Verstappen' },
            { grandPrix: 'Silverstone', winner: 'Lewis Hamilton' },
            // ... other races
          ],
          2021: [
            { grandPrix: 'Monza', winner: 'Daniel Ricciardo' },
            // ... other races
          ],
          // ... other years
        };
  
        const results = data[year];
        if (results) {
          resolve(results);
        } else {
          reject('No data available for that year.');
        }
      }, 1000); // Simulate a delay of 1 second
    });
  }
  
  // Async function to get race results and display them
  async function getAndDisplayRaceResults(year) {
    try {
      console.log('Fetching data...');
      // Waiting for the race results data to be fetched before moving on
      const results = await fetchRaceResults(year);
  
      console.log(`Race results for ${year}:`);
      // Once we have the data, we can work with it
      results.forEach((race, index) => {
        console.log(`${index + 1}. ${race.grandPrix}: ${race.winner}`);
      });
  
      // You can do other things with the results here, like updating the UI, storing them, etc.
      // ...
  
      return results; // if you need to return the results for further processing
    } catch (error) {
      // If there was an error fetching the data, we handle it here (e.g., by logging it or displaying an error message to the user)
      console.error(`An error occurred: ${error}`);
    }
  }
  
  // Using the async function
  getAndDisplayRaceResults(2021).then((results) => {
    // This block executes when the async operation completes successfully.
    // 'results' contains the race results for the year.
    // You could also do more processing or invoke another function as needed.
    console.log('Data processed successfully.');
  }).catch((error) => {
    // If the async function throws an error, we handle it here.
    console.error(`Failed to process data: ${error}`);
  });
  