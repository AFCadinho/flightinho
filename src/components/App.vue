<script setup lang="ts">
import { reactive, provide } from 'vue'
import type { Airport } from '@/types/flightinho';
import exampleData from '@/example_data.ts'
import FlightlyTabs from '@/components/FlightinhoTabs.vue';
import SearchPane from '@/components/SearchPane.vue';
import ManagePane from '@/components/ManagePane.vue';


const airports = reactive<Airport[]>(
  exampleData.map((airport: Airport) => ({
    id: airport.id,
    name: airport.name,
    flights: airport.flights
  }))
)

provide("airports", airports)

</script>

<template>
  <FlightlyTabs>
    <template #search>
      <SearchPane />
    </template>
    <template #manage>
      <ManagePane />
    </template>
  </FlightlyTabs>
</template>
