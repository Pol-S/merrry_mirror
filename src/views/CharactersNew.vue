<template>
  <div class="characters-new">
    <article class="container box style3">
      <h1>Roll a new character</h1>
      <form>
        <h3>Name:</h3>
        <input type="text" v-model="newCharacterName" />
        <br />
        <h3>Level:</h3>
        <label for="characterLevel">Your character level:</label>
        <select id="newCharacterLevel" v-model="newCharacterLevel">
          <option value="1">1</option>
        </select>
        <br />
        <h3>Class:</h3>
        <label for="classList">Pick a class, this will determine what spell you can pick:</label>
        <select id="newCharacterClass" v-model="newCharacterClass">
          <option value="1">Sorcerer: For whatever reason, you are doing magic instinctually and naturally.</option>
          <option value="2">
            Warlock: You have magic because you made a deal with...something...Let's hope it's benevolent.
          </option>
          <option value="3">Wizard: Study and hard work has lead you to magic.</option>
        </select>
        <br />
        <h3>Speciality:</h3>
        <label for="speciality">Pick a speciality:</label>
        <select id="speciality" v-model="newCharacterSpeciality">
          <option value="nuker">Nuker. Because if there are no explosions are you doing magic?</option>
          <option value="utility">Utility. Always useful, always practical.</option>
          <option value="crowd control">Crowd control. Let other do the damage, you control the field.</option>
          <option value="the face">The Face. Who needs to fight? You get your way by just talking.</option>
          <option value="none">None. Do what you want, you crazy diamond.</option>
        </select>

        <br />
        <h3>Pick a starter spell ({{ validSpells.length }} available):</h3>
        <label for="spell">Your first cantrip?:</label>
        <select id="spell" v-model="newCharacterSpell">
          <option v-for="spell in validSpells" v-bind:value="spell.id">{{ spell.name }}</option>
        </select>
        <br />
        <button v-on:click="createCharacter()">Create Character</button>
      </form>
    </article>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      characters: [],
      spells: [],
      currentCharacter: {},
      currentSpell: {},
      newCharacterName: "",
      newCharacterLevel: "",
      newCharacterClass: "",
      newCharacterSpeciality: "",
      newCharacterSpell: "",
      createdCharacter: {},
      message: "Mirror, mirror on the wall",
    };
  },
  created: function() {
    axios.get("/api/characters").then(response => {
      this.characters = response.data;
    });

    axios.get("/api/spells").then(response => {
      console.log(response);
      this.spells = response.data;
    });
  },
  methods: {
    createCharacter: function() {
      var params = {
        name: this.newCharacterName,
        level: parseInt(this.newCharacterLevel),
        character_class_id: parseInt(this.newCharacterClass),
        speciality: this.newCharacterSpeciality,
        new_spell_id: parseInt(this.newCharacterSpell),
        user_id: 3,
      };
      axios.post("/api/characters", params).then(response => {
        this.createCharacter = response.data;
        this.characters.push(response.data);
        this.newCharacterName = "";
        this.newCharacterLevel = "";
        this.newCharacterClass = "";
        this.newCharacterSpeciality = "";
        this.createCharacter = response.data;
        console.log(response);
        this.$router.push("/").catch(err => {});
      });
    },
  },
  computed: {
    validSpells: function() {
      return this.spells.filter(spell =>
        spell.character_classes.map(x => x.id).includes(parseInt(this.newCharacterClass))
      );
    },
  },
};
</script>
