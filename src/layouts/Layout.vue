<template>
  <div class="pageWrapper">
    <slot name="header">Header</slot>
    <slot>Content</slot>
    <slot name="footer">Footer</slot>
  </div>
</template>

<style scoped>
.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1248px;
  margin: auto;
}
</style>
