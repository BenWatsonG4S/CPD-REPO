const neo4j = require('neo4j-driver');

// Function to generate random users and their favorite artists
function generateUsersData(numberOfUsers, artistsPerUser) {
    const users = [];
    const artistNames = [
      "Artist One", "Artist Two", "Artist Three", "Artist Four", "Artist Five",
      "Artist Six", "Artist Seven", "Artist Eight", "Artist Nine", "Artist Ten",
      // ... [Add as many artist names as needed or generate them similarly] ...
    ];
  
    // Helper function to generate a random set of artists for a user
    function getRandomArtists() {
      const artists = [];
      const usedArtistIds = new Set();
  
      while (artists.length < artistsPerUser) {
        const randomIndex = Math.floor(Math.random() * artistNames.length);
        const artistId = randomIndex + 1; // Artist IDs are 1-based
  
        if (!usedArtistIds.has(artistId)) {
          artists.push({
            artistId,
            name: artistNames[randomIndex]
          });
          usedArtistIds.add(artistId);
        }
      }
  
      return artists;
    }
  
    // Generate each user
    for (let i = 1; i <= numberOfUsers; i++) {
      users.push({
        userId: i,
        artists: getRandomArtists()
      });
    }
  
    return { users };
  }
  
  // Generate 20 users with 10 favorite artists each
  const usersData = generateUsersData(20, 10);
  
  // Output the generated data (you can also save it to a file if needed)
  console.log(JSON.stringify(usersData, null, 2));

async function createGraph() {
  // Create a driver instance for Neo4j
  const driver = neo4j.driver(
    'neo4j+s://6653dc12.databases.neo4j.io', 
    neo4j.auth.basic('neo4j', 'xs7me7xtm9gstGp3aqaVPkNrfTzeXFtFpYP8FeXkZd0') // replace with your actual username and password
  );

  // Create a session to run Cypher commands
  const session = driver.session();

  try {
    // Instead of creating User nodes, we focus on the Artist nodes and their connections.
    for (const user of usersData.users) {
          let currentArtists = [];

          for (const artist of user.artists) {
            await session.run(
              'MERGE (a:Artist {artistId: $artistId, name: $name})',
              { artistId: artist.artistId, name: artist.name }
            );

            currentArtists.push(artist.artistId);

            for (const pastArtistId of currentArtists) {
              if (pastArtistId === artist.artistId) continue; // Skip self.

              // Here, we remove the direction on the relationship, making it effectively bidirectional.
              await session.run(
                `
                MATCH (a1:Artist {artistId: $artistId1}), (a2:Artist {artistId: $artistId2})
                MERGE (a1)-[r:CONNECTED_WITH]-(a2)  // Notice we removed the '->' to make the relationship undirected.
                ON CREATE SET r.hitCount = 1
                ON MATCH SET r.hitCount = r.hitCount + 1
                `,
                { artistId1: pastArtistId, artistId2: artist.artistId }
              );
            }
          }
        }
  } catch (error) {
    console.error('Error creating graph data:', error);
  } finally {
    // Close the session and the driver when done
    await session.close();
    await driver.close();
  }
}

// Call the function to create the graph
createGraph();
