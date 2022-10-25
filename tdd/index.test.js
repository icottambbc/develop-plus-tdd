import getUnder24DetailsAndProcess from ".";

// how would we test this function? write some test scenarios below
describe('Get ten sets of User Details, for users with age of under 24', () => {
  it('Should return an empty array when there are no users under 24', () => {
    // set up a mock API reponse...
    expect(getUnder24Users(10)).toEqual([]);
  })
  it('Should return an array with 10 users with ages of under 24 when there are more than 10 users under 24', () => {
    // set up a mock API reponse...
    expect(getUnder24Users(10)).toEqual(10);
    expect(getUnder24Users(10)[0].age).toBeLessThan(24);
  })
  it('Should throw and error if the API returns an error', () => {
    // set up a mock API reponse...
    expect(getUnder24Users(10)[0].age).toThrow();
  })
});