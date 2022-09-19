<template>
 <div class="text-center">
    <v-row justify="center">
      <v-col cols="auto" class="pl-10 pr-10 pt-5 pb-5">
        <v-dialog v-model="dialog" persistent >
          <template v-slot:activator="{ props }">
            <v-btn class="btn-show" block  v-bind="props">
              Details
            </v-btn>
          </template>
          <v-card class="pl-3 pr-3 pt-1 pb-1">
            <v-card-text>
              {{description.text}}
            </v-card-text>
            <v-card-actions >
              <v-hover v-slot="{ isHovering, props }">
                <v-btn :elevation="isHovering ? 5: 2" v-bind="props" class="btn-close pr-5 pl-5" block  
                @click.native="dialog = false">Close</v-btn>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const dialog = ref(false);
  const description = defineProps({
    text : String
  });


</script>

<style scoped>
  .btn-show{
    background: var(--primary);
    color:white;
    padding: 0px 10px;
    font-size: 1em;
  }
  .btn-close{
    background: var(--primary);
    color:white;
    font-size: 1em;
    letter-spacing: 2px;
    text-shadow:  1px 1px 2px var(--secondary);
    font-weight: bold;
  }
  .v-overlay__content {
    position: relative;
    left: 27px;
  }
</style>