<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

defineProps<{
  items: { name: string; id: string }[]
}>()


const selectedIndex = ref(0)
const showDetailsOnMobile = ref(false)

const width = ref(window.innerWidth)
const isMobile = computed(() => width.value < 768)

function onResize() {
  width.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', onResize))

function select(i: number) {
  selectedIndex.value = i
  if (isMobile.value) {
    showDetailsOnMobile.value = true
  }
}

</script>

<template>
  <div class="list-detail">

    <template v-if="isMobile">

      <!-- Show List on Mobile -->
      <div v-if="!showDetailsOnMobile" class="list">
        <ul>
          <li v-for="(item, i) in items" :key="i" @click="select(i)">
            <slot name="list-item" v-bind="item">
              <!-- Fallback  -->
              {{ item.name ?? `Item ${i + 1}` }}
            </slot>
          </li>
        </ul>
      </div>

      <!-- Details in Pane -->
      <div v-else class="details">
        <button type="button" @click="showDetailsOnMobile = false">
          Back
        </button>
        <slot name="details" v-bind="{ items, index: selectedIndex }">
          {{ items[selectedIndex] }}
        </slot>
      </div>
    </template>

    <!-- Show on desktop -->
    <template v-else>
      <div class="grid">
        <div class="list">
          <ul>
            <li v-for="(item, i) in items" :key="i" :class="{ active: i === selectedIndex }" @click="select(i)">
              <slot name="list-item" v-bind="item">
                {{ item.name ?? `Item ${i + 1}` }}
              </slot>
            </li>
          </ul>
        </div>

        <div class="details">
          <slot name="details" v-bind="{ items, index: selectedIndex }">
            <pre>{{ items[selectedIndex] }}</pre>
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.list-detail {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 12px;
}

.list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.list li.active {
  background: #f6f6f6;
}

.details {
  padding: 8px;
  border: 1px solid #eee;
}

button {
  margin-bottom: 8px;
}
</style>
