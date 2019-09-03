<template>
  <div class="sprite-container">
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      x: {
        required: true,
        type: Number
      },
      y: {
        required: true,
        type: Number
      }
    }
  }
</script>