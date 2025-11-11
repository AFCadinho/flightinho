<script setup lang="ts">
import { inject } from 'vue'
import AirportSelector from '@/components/AirportSelector.vue'
import ListDetail from '@/components/ListDetail.vue'
import FlightlyCard from '@/components/FlightinhoCard.vue'
import ActionButton from '@/components/ActionButton.vue'
import type { Airport, Flight } from '@/types/flightly'

const airports = inject<Airport[]>('airports', () => [], true)

function addFlight(index: number) {
  const airport = airports[index]
  const newId = `FL${airport.flights.length + 1}`
  const newFlight: Flight = {
    id: newId,
    destinationAirportId: airport.id,
    adultPrice: 0,
    childPrice: 0
  }
  airport.flights.push(newFlight)
}

function removeFlight(index: number, flightId: string) {
  const airport = airports[index]
  airport.flights = airport.flights.filter(f => f.id !== flightId)
}
</script>

<template>
  <section class="manage">
    <ListDetail :items="airports">
      <!-- Left list -->
      <template #list-item="{ name, id }">
        <div class="list-row">
          <span class="name">{{ name }}</span>
          <span class="badge">{{ id }}</span>
        </div>
      </template>

      <!-- Details on the right -->
      <template #details="{ index }">
        <FlightlyCard>
          <template #header>
            <h3>{{ airports[index].name }} ({{ airports[index].id }})</h3>
          </template>

          <div class="editor">
            <label class="lab">Name
              <input v-model="airports[index].name" />
            </label>

            <label class="lab">Code
              <input v-model="airports[index].id" />
            </label>

            <h4 class="sub">Departing Flights</h4>

            <p v-if="!airports[index].flights.length" class="muted">
              No flights yet.
            </p>

            <div v-for="f in airports[index].flights" :key="f.id" class="flight-row">
              <strong class="flight-code">{{ f.id }}</strong>

              <AirportSelector :airports="airports" v-model="f.destinationAirportId" />

              <input type="number" min="0" step="1" v-model.number="f.adultPrice" placeholder="Adult Price" />
              <input type="number" min="0" step="1" v-model.number="f.childPrice" placeholder="Child Price" />

              <div class="row-actions">
                <ActionButton variant="delete" @click="removeFlight(index, f.id)">
                  Delete Flight
                </ActionButton>
              </div>
            </div>
          </div>

          <template #actions>
            <div class="card-actions">
              <ActionButton variant="add" @click="addFlight(index)">+</ActionButton>
            </div>
          </template>
        </FlightlyCard>
      </template>
    </ListDetail>
  </section>
</template>

<style scoped>
.manage {
  padding: 8px;
}


/* LIST ITEMS */
.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name {
  font-weight: 600;
}

.badge {
  background: #6d28d9;
  color: #fff;
  font-weight: 700;
  font-size: .8rem;
  padding: .2rem .45rem;
  border-radius: .4rem;
}


/* DETAILS */
.editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lab {
  display: flex;
  flex-direction: column;
  font-size: .85rem;
  color: #475569;
}

input,
select {
  width: 100%;
  box-sizing: border-box;
  padding: .5rem .6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: .95rem;
  background: #fff;
}

.sub {
  margin: 8px 0 6px;
  font-size: 1rem;
  font-weight: 700;
}

.flight-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.row-actions {
  display: flex;
  justify-content: flex-end;
}

.muted {
  color: #9ca3af;
  font-style: italic;
  font-size: .9rem;
}

/* ACTIONS */
.card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
