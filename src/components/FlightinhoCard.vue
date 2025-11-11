<template>
  <section class="card">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>

    <div>
      <slot></slot>
    </div>

    <footer v-if="$slots.actions">
      <slot name="actions"></slot>
    </footer>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 6px 16px rgba(0,0,0,.04);
  display: grid;
  gap: 10px;
}

</style>
