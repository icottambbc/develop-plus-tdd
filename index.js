import fetch from "node-fetch";

// interface userDetails {
//   firstName: string;
//   lastName: string;
//   age: number;
//   userId: string;
// }

// interface viewingDetails {
//   programsWatched: programWatched[];
// }

// interface programWatched {
//   programName: string;
//   programId: string;
//   dateWatched: number; // timestamp
// }


async function getUnder24DetailsAndProcess () {

  // 1) get first 10 users under 24 in age
  const firstResponse = await fetch('https://some-bbc-api.com/users');
  const userData = await firstResponse.json();

  let filteredData = userData.filter((user) => {
    // could change this so that the age is actually a dob and we need to do a check here (this would be an example of test to extract)
    if (user.age <= 24) {
      return true;
    } else {
      return false;
    }
  })

  if (filteredData.length > 10) {
    filteredData = filteredData.slice(0, 10);
  }

  // 2) Get the most recently viewed programes
  for (let i=0; i<filteredData.length; i++) {
    const userId = filteredData[i].userId;
    const secondResponse = await fetch(`https://some-bbc-api.com/programmes?userId=${userId}`);
    const viewData = await secondResponse.json();

    // get the three most recently viewed programes
    viewData.programsWatched.slice(0, 2);

    // 3) create a document to post onto a queue
    const postData = {
      id: userId,
      programsWatched: viewData.programsWatched
    }

    // post to the downstream API
    const response = await fetch(`https://some-downstream-api.com/recommend`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    console.log(data);

  }
}

export default getUnder24DetailsAndProcess;