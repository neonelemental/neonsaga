<template>
  <transition name="fast-fade">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
  .fast-fade-enter-active,
  .fast-fade-leave-active
  {
    transition: opacity 40ms;
  }

  .fast-fade-enter,
  .fast-fade-leave-to
  {
    opacity: 0;
  }
</style>
