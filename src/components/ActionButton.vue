<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  variant: string
}>()

const buttonClass = computed(() => {
  if (props.variant === "add") {
    return "add-button"
  } else {
    return "delete-button"
  }
})
</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button {
  background-color: #1927aa;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  width: 100%;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
