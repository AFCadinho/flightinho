<script setup lang="ts">
import { ref, computed } from "vue"
import type { Component } from "vue"
import SearchPane from "@/components/SearchPane.vue"
import ManagePane from "@/components/ManagePane.vue"

const tabs: Record<string, Component> = {
  search: SearchPane,
  manage: ManagePane,
}

const slots = defineSlots()
const tabNames = Object.keys(slots)

const activeTabName = ref(tabNames[0] ?? "search")

const ActiveComponent = computed<Component>(() => {
  return tabs[activeTabName.value] ?? SearchPane
})
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>Flightly</h1>

      <nav class="tab-buttons">
        <button
          v-for="name in tabNames"
          :key="name"
          :class="['link', { active: activeTabName === name }]"
          @click="activeTabName = name"
        >
          {{ name.charAt(0).toUpperCase() + name.slice(1) }}
        </button>
      </nav>
    </header>

    <section class="card">
      <KeepAlive>
        <component :is="ActiveComponent" />
      </KeepAlive>
    </section>
  </div>
</template>


<style scoped>
.page {
  max-width: 920px;
  margin: 0 auto;
  padding: 20px 16px;

  background:
    radial-gradient(800px 400px at 20% -10%, #eef2ff 0, rgba(238,242,255,0) 40%),
    #fafbfe;
  min-height: 100vh;
  color: #0f172a;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}

/* Header */
.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

h1 {
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 18px;
}

.link {
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  color: #6b7280;
  text-decoration: none;
}

.link:hover {
  color: #7c3aed;
}

.link.active {
  color: #7c3aed;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 600;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
}
</style>
