
<script setup lang="ts">
import axios from "axios";
import TheHeader  from './components/TheHeader.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      overlay: false,
      characterName: "",
      characterStatus: "",
      info: [],
      success: false,
      emptyResponse: false,
    };
  },
  // actions
  methods: {
    handleClick() {
      this.overlay = !this.overlay;
    },
    handleBlur() {
      this.overlay = false;
    },
    fetchData() {
      axios
        .get("https://rickandmortyapi.com/api/character/", {
          params: {
            name: this.characterName,
            status: this.characterStatus,
          },
        })
        .then((response) => {
          this.info = response.data.results;
        })
        .then(() => {
          if (this.info.length > 0) {
            this.success = true;
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.emptyResponse = true;
          }
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.emptyResponse = false;
      this.success = false;
      this.overlay = false;
      this.fetchData();
    },
  },
  components:{
    TheHeader
  }
};
</script>

<template>
  <TheHeader msg="Rick and Morty Finder" />
  <div class="container mx-auto py-4">
    <div class="container flex justify-center mb-4">
      <form @submit="handleSubmit" class="flex gap-x-4">
        <div
          class="searchBox flex border border-black w-80 z-10 relative rounded-full bg-white"
        >
          <input
            @click="handleClick"
            @blur="handleBlur"
            v-model="characterName"
            @keyup.enter="handleSubmit"
            class="searchBox__input flex justify-center items-center h-12 w-4/5 rounded-full px-4"
            type="text"
            minlength="4"
            maxlength="20"
            required
            placeholder="Ingresa un personaje a buscar"
          />

          <button
            class="flex justify-center items-center w-1/5 relative bg-white rounded-full"
          >
            <font-awesome-icon size="xl" icon="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <select
          v-model="characterStatus"
          class="statusBox px-4 py-3 border border-black rounded-full"
        >
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>
      </form>
    </div>
    <div
      v-if="success"
      class="listContainer container mx-auto flex flex-wrap justify-evenly gap-y-4"
    >
      <div
        v-for="item in info"
        class="listItem w-80 flex border border-black"
        v-bind:key="item.id"
      >
        <div class="flex-1">
          <img :src="item.image" alt="chracter image" />
        </div>
        <div class="flex-1 flex-col px-2">
          <p><span class="font-bold">Name: </span>{{ item.name }}</p>
          <p><span class="font-bold">Status: </span>{{ item.status }}</p>
          <p>
            <span class="font-bold">Location: </span>{{ item.location.name }}
          </p>
          <p><span class="font-bold">Origin: </span>{{ item.origin.name }}</p>
        </div>
      </div>
    </div>
    <div class="container" v-if="emptyResponse">
      <p>No se han encontrado resultados.</p>
    </div>
  </div>
  <div :class="`veil ${overlay ? 'block' : 'hidden'}`"></div>
</template>

<style lang="scss">
body{
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.searchBox {
  &:focus-visible {
    box-shadow: 0px 0px 10px #ffffff;
  }
  &__input {
    &:focus-visible {
      outline: none !important;
      box-shadow: 0px 0px 10px #ffffff;
      & + button {
        outline: none !important;
        box-shadow: 0px 0px 10px #ffffff;
      }
    }
  }
}

.statusBox {
  &:focus-visible {
    outline: none !important;
  }
}

.veil {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.65) !important;
}
</style>
