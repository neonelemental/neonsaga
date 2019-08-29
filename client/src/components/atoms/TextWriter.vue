<template>
  <component :is="tag">
    {{typedText}}
  </component>
</template>

<script>
  export default {
    mounted() {
      this.typeCharacter();
    },
    watch: {
      'text' () {
        this.tick = 0;
        this.typeCharacter();
        this.$emit('input', true);
      },
    },
    props: {
      text: {
        default: '',
        type: String,
        required: true
      },
      speed: {
        default: 33,
        type: Number,
        required: false
      },
      tag: {
        default: "p",
        type: String,
        required: false
      }
    },
    data () {
      return {
        tick: 0,
        currentTimeout: null
      }
    },
    computed: {
      typedText () {
        return this.text.substring(0, this.tick);
      }
    },
    methods: {
      typeCharacter () {
        this.currentTimeout = setTimeout(() => {
          this.tick++;
          if(! (this.tick === this.text.length) )
            this.typeCharacter();
          else
            this.$emit('input', false);
        }, this.speed);
      },
      stopWriting () {
        clearTimeout(this.currentTimeout);
        this.$emit('input', false);
        this.tick = this.text.length;
      }
    },
  }
</script>