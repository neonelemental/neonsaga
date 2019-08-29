<template>
  <transition name="fade">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active
  {
    transition: opacity 200ms;
  }

  .fade-enter,
  .fade-leave-to
  {
    opacity: 0;
  }
</style>
