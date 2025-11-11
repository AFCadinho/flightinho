const exampleData = [
  {
      id: 'AMS',
      name: 'Amsterdam',
      flights: [
          {
              id: 'HV74',
              destinationAirportId: 'JFK',
              adultPrice: 800,
              childPrice: 500,
          },
          {
              id: 'KL23',
              destinationAirportId: 'LHR',
              adultPrice: 200,
              childPrice: 150,
          },
          {
              id: 'UA99',
              destinationAirportId: 'LHR',
              adultPrice: 190,
              childPrice: 140,
          },
      ],
  },
  {
      id: 'LHR',
      name: 'London, Heathrow',
      flights: [
          {
              id: 'UA57',
              destinationAirportId: 'JFK',
              adultPrice: 600,
              childPrice: 350,
          },
      ],
  },
  {
      id: 'JFK',
      name: 'New York, JFK',
      flights: [
          {
              id: 'HV74',
              destinationAirportId: 'AMS',
              adultPrice: 900,
              childPrice: 550,
          },
          {
              id: 'UA57',
              destinationAirportId: 'LHR',
              adultPrice: 590,
              childPrice: 240,
          },
      ],
  },
];

export default exampleData;
