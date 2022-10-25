import fetch from "node-fetch";


async function getUnder24DetailsAndProcess () {

  const firstResponse = await fetch('https://some-bbc-api.com/users');
  // API will return:
  // {
  //   firstName: string;
  //   lastName: string;
  //   age: number;
  //   userId: string;
  // }

  const userData = await firstResponse.json();

  let filteredData = userData.filter((user) => {
    /* could change this so that the age is actually a dob and we need to do a check here (this would be an example of test to extract) */
    if (user.age <= 24) {
      return true;
    } else {
      return false;
    }
  })

  if (filteredData.length > 10) {
    filteredData = filteredData.slice(0, 10);
  }

  for (let i=0; i<filteredData.length; i++) {
    const userId = filteredData[i].userId;
    const secondResponse = await fetch(`https://some-bbc-api.com/programmes?userId=${userId}`);
    // API will return 
    // [{
    //   programName: string;
    //   programId: string;
    //   dateWatched: number; // timestamp
    // }]


    const viewData = await secondResponse.json();
    viewData.programsWatched.slice(0, 2);

    const postData = {
      id: userId,
      programsWatched: viewData.programsWatched
    }

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