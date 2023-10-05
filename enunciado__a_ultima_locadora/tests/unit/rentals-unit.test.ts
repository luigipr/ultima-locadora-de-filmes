import rentalsRepository from "repositories/rentals-repository";
import rentalsService from "services/rentals-service";



beforeEach(() => {
  jest.clearAllMocks();
});

describe("Rentals Service Unit Tests",() => {
  it("should return all rentals",  async  () => {
    jest.spyOn(rentalsRepository, "getRentals").mockResolvedValueOnce([{
      id: 1,
      closed: false,
      date: new Date(),
      endDate: new Date(),
      userId: 1
    },
  {
    id: 2,
    closed: false,
    date: new Date(),
    endDate: new Date(),
    userId: 1
  }])
    
  const rentals = await rentalsService.getRentals()

    expect(rentals).toHaveLength(2);
  })

  // it("should return a rental based on rentalId",async () => {
  //   jest.spyOn(rentalsRepository, "getRentals").mockResolvedValueOnce({
  //     id: 1,
  //     closed: false,
  //     date: new Date(),
  //     endDate: new Date(),
  //     userId: 1
  //   })

  // })
})