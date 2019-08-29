<template>
  <menu-layout class="dialog-pickem">
    <ul
      v-shortkey="{ up: ['arrowup'], down: ['arrowdown'], enter: ['enter'] }"
      @shortkey="setActive"
    >
      <li v-for="(option, i) in options" :class="active === i ? 'active' : null">
        <h3>
          {{ option.label }}
        </h3>
      </li>
    </ul>
  </menu-layout>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        active: 0
      };
    },
    methods: {
      setActive (event) {
        switch(event.srcKey) {
          case('up'):
            return this.increment();
          case('down'):
            return this.decrement();
          case('enter'):
            return this.$emit('input', this.options[this.active]);
        }
      },
      increment () {
        if(this.active === this.options.length - 1)
          this.active = 0;
        else
          this.active++;
      },
      decrement () {
        if(this.active === 0)
          this.active = this.options.length - 1;
        else
          this.active--;
      },
    }
  }
</script>