<template>
  <component :is="tag">
    {{typedText}}
  </component>
</template>

<script>
  export default {
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
      }
    },
    computed: {
      typedText () {
        return this.text.substring(0, this.tick);
      }
    },
    methods: {
      typeCharacter () {
        return setTimeout(() => {
          this.tick++;
          if(! (this.tick === this.text.length) )
            this.typeCharacter();
          else
            this.$emit('doneWriting');
        }, this.speed);
      }
    },
    mounted() {
      this.typeCharacter();
    }
  }
</script>