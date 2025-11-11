export interface Airport {
  id: string
  name: string
  flights: Flight[]
}

export interface Flight {
  id: string
  destinationAirportId: string
  adultPrice: number
  childPrice: number
}

export interface Result {
  flightId: string
  price: number
}
