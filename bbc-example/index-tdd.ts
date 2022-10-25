import fetch from 'node-fetch';

interface userDetails {
  firstName: string;
  lastName: string;
  age: number;
  userId: string;
}

interface viewingDetails {
  programsWatched: programWatched[];
}

interface programWatched {
  programName: string;
  programId: string;
  dateWatched: number; // timestamp
}


async function getUnder24Users (numberOfUsers: number) {

  // 1) get first 10 users under 24 in age
  const firstResponse: any = await fetch('https://some-bbc-api.com/users');
  const userData: userDetails[] = await firstResponse.json();

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

  return filteredData;
}

async function getMostRecentWatchPrograms(userId: string, numberOfPrograms: number) {
  const secondResponse: any = await fetch(`https://some-bbc-api.com/users/${userId}`);
  const viewData: viewingDetails = await secondResponse.json();

  // get the three most recently viewed programes
  return viewData.programsWatched.slice(0, numberOfPrograms);
}

async function postToQueue() {
  // 3) create a document to post onto a queue
  // const postData = {
  //   id: userId,
  //   programsWatched: viewData.programsWatched
  // }

  // maybe use the AWS library to post here
}