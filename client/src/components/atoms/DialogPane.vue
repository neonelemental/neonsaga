<template>
  <div class="dialog-pane" ref="dialogPane">
    <div v-for="y in numY" class="dialog-pane-row" :key="y">
      <div v-for="x in numX" class="dialog" :class="getClass(x,y)" :key="x"/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        iteratorX: [],
        numX: 0,
        iteratorY: [],
        numY: 0,
        topLeft: 'dialog-1-1',
        topRight: 'dialog-3-1',
        bottomLeft: 'dialog-1-3',
        bottomRight: 'dialog-3-3',
        left: 'dialog-1-2',
        right: 'dialog-3-2',
        bottom: 'dialog-2-3',
        top: 'dialog-2-1',
        center: 'dialog-2-2',
      }
    },
    mounted () {
      this.numX = this.$refs.dialogPane.offsetWidth / 16;
      this.numY = this.$refs.dialogPane.offsetHeight / 16;
      this.iteratorX = [...new Array(this.numX)].map((_, i) => i-1);
      this.iteratorY = [...new Array(this.numX)].map((_, i) => i-1);
    },
    methods: {
      getClass(x, y) {
        if(x === 1 && y === 1)
          return this.topLeft;
        if(x === this.numX && y === 1)
          return this.topRight;
        if(x === 1 && y === this.numY)
          return this.bottomLeft;
        if(x === this.numX && y === this.numY)
          return this.bottomRight;
        if(x === 1)
          return this.left;
        if(y === 1)
          return this.top;
        if(x === this.numX)
          return this.right;
        if(y === this.numY)
          return this.bottom;
        else
          return this.center;
      },
    },
  }
</script>