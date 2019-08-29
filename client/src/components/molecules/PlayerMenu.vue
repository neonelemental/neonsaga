<template>
  <menu-layout
    class="player-menu"
    v-shortkey="['esc']"
    @shortkey.native="$emit('closePlayerMenu')"
  >
    <h1>Hello World</h1>
  </menu-layout>
</template>