<script setup lang="ts">
import type { Airport } from '@/types/flightinho'

defineProps<{
  airports: Airport[]
}>()

const airportModel = defineModel()

function onChange(event: Event) {
  const el = event.target as HTMLSelectElement
  airportModel.value = el.value || undefined
}
</script>

<template>
  <select :value="airportModel ?? ''" @change="onChange">
    <option value="">Select an airport</option>
    <option
      v-for="airport in airports"
      :key="airport.id"
      :value="airport.id"
    >
      {{ airport.name }} ({{ airport.id }})
    </option>
  </select>
</template>
