<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import AirportSelector from '@/components/AirportSelector.vue'
import type { Airport, Result } from '@/types/flightinho'

// Get the airports list that App.vue provided
const airports = inject<Airport[]>('airports', () => [], true)

// Selected
const originId = ref<string | undefined>()
const destinationId = ref<string | undefined>()

// Passengers
const adults = ref<number>(1)
const children = ref<number>(0)

// List of Destinations
const reachableDestinations = computed<Airport[]>(() => {
  // No airport selected
  if (!originId.value) {
    return []
  }
  // find origin matches
  const origin = airports.find((airport) => {
    return airport.id === originId.value
  })
  // No Match
  if (!origin) {
    return []
  }
  const destinationIds = new Set(origin.flights.map((f) => {
    return f.destinationAirportId
  }))

  return airports.filter((a) => {
    return destinationIds.has(a.id)
  })
})

// List of results
const results = computed<Result[] | undefined>(() => {
  if (!originId.value || !destinationId.value) {
    return undefined
  }

  // Find selected origin airport
  const origin = airports.find((airport) => {
    return airport.id === originId.value
  })
  if (!origin) {
    return undefined
  }

  const matchingFlights = origin.flights.filter((f) => {
    return f.destinationAirportId === destinationId.value
  })

  return matchingFlights.map((f) => {
    return {
      flightId: f.id,
      price: (f.adultPrice * adults.value) + (f.childPrice * children.value)
    }
  })
})

</script>

<template>
  <div class="form">
    <h2>Search for flights</h2>
    <div class="grid grid-2">
      <div>
        <label>Origin</label>
        <AirportSelector :airports="airports" v-model="originId" />
      </div>

      <div>
        <label>Destination</label>
        <AirportSelector :airports="reachableDestinations" v-model="destinationId" />
      </div>

      <div>
        <label>Adults</label>
        <input type="number" min="1" v-model.number="adults" />
      </div>

      <div>
        <label>Children</label>
        <input type="number" min="0" v-model.number="children" />
      </div>
    </div>

    <div class="results">
      <p v-if="!originId || !destinationId" class="muted">
        Select an origin and destination to see flights.
      </p>

      <template v-else>
        <h3 class="section-title">Flights</h3>

        <template v-if="results && results.length">
          <table class="flights-table" aria-label="Available flights">
            <thead>
              <tr>
                <th>Code</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in results" :key="r.flightId">
                <td>{{ r.flightId }}</td>
                <td>€{{ r.price }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <p v-else class="muted">No direct flights found.</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin: 8px 0 6px;
}

.form select,
.form input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f3f4f6;
  outline: none;
  font-size: 0.95rem;
}

.form select:focus,
.form input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
  background: #ffffff;
}

.grid {
  display: grid;
  gap: 12px;
}

.grid-2>div {
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) {
  .grid-2 {
    grid-template-columns: 1fr 1fr;
  }
}

.results {
  margin-top: 14px;
}

.section-title {
  margin: 10px 0 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.flights-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.flights-table thead th {
  background: #8b8796;
  color: #fff;
  text-align: left;
  padding: 8px 10px;
  font-weight: 600;
  font-size: 0.95rem;
}

.flights-table tbody td {
  padding: 10px;
  border-top: 1px solid #e5e7eb;
  font-size: 0.95rem;
  color: #111827;
}

.muted {
  color: #6b7280;
}
</style>
