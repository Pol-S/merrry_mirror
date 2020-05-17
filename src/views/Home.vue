

<template>
  <div class="home">
    <!-- Create Action -->
    <div>
      <article class="container box style3">
        <h1>Roll a new character</h1>
        <form>
        <h3>Name:</h3>
        <input type = "text" v-model="newCharacterName" />
        <br>
        <h3>Level:</h3>
        <label for="characterLevel">Your character level:</label>
        <select id = "newCharacterClass" v-model="newCharacterLevel">
          <option value = "1">1</option>
        </select> 
        <br>
        <h3>Class:</h3>
        <label for="classList">Pick a class:</label>
        <select id = "newCharacterClass" v-model="newCharacterClass">
          <option value = "1">Sorcerer: For whatever reason, you are doing magic instinctually and naturally.</option>
          <option value = "2">Warlock: You have magic because you made a deal with...something...Let's hope it's benevolent.</option>
          <option value = "3">Wizard: Study and hard work has lead you to magic.</option>
        </select>  
        <br>
        <h3>Speciality:</h3>
        <label for="speciality">Pick a speciality:</label>
        <select id = "speciality" v-model="newCharacterSpeciality">
          <option value = "nuker">Nuker. Because if there are no explosions are you doing magic?</option>
          <option value = "utility">Utility. Always useful, always practical.</option>
          <option value = "crowd control">Crowd control. Let other do the damage, you control the field.</option>
          <option value = "the face">The Face. Who needs to fight? You get your way by just talking.</option>
          <option value = "none">None. Do what you want, you crazy diamond.</option>
        </select>

        <br>
        <h3>Pick a starter spell ({{validSpells.length}} available):</h3>
        <label for="spell">Your first cantrip?:</label>
        <select id = "spell" v-model="newCharacterSpell">
          <option v-for="spell in validSpells" v-bind:value="spell.id">{{spell.name}}</option>
          <!-- <option value = "1">Eldritch Blast</option>
          <option value = "2">Fire Bolt</option>
          <option value = "3">Friends</option>
          <option value = "4">Gust</option>
          <option value = "5">Mage Hand</option>
          <option value = "6">Message</option>
          <option value = "7">Mold Earth</option>
          <option value = "8">Toll the Death</option> -->

        </select>
        <br>
        <button v-on:click="createCharacter()">Create Character</button>
        </form>
      </article>
    </div>

    <!-- Index Action -->
    <br>
    <br>
    <section id="banner">
      <header>
        <h1>All characters</h1>  
      </header>
    </section>

    <div v-for="character in characters">
      <article class="container box style3">
      <h2>Name: {{ character.name }}</h2>
      <h3>Class: {{ character.character_class}}</h3>

      <h4>Chosen Speciality: {{character.speciality}} </h4>
      <!-- Show action -->
      <button v-on:click="showCharacter(character)">More details!</button>
      <div v-if="currentCharacter === character">
        <h3>Level: {{ character.level }}</h3>
        <h3>Player: {{character.user}}</h3>
        <p>Nuking score: {{character.nuke_score}}</p>
        <p>Control score: {{character.cc_score}}</p>
        <p>Utility score: {{character.utility_score}}</p>
        <p>Social magic score: {{character.face_score}}</p>
        <h3> Spell list:</h3> 
        <br>
        <div v-for="spell in character.spells">
          <hr>
          <header>
            <br>
            <p>Spell: {{spell.spell}}</p>
            <p>Descripton: {{spell.description}}</p>
            <p><button v-on:click="destroySpell(character, spell)">Delete spell?</button></p>
          </header>
          <hr>
        </div>

              <!-- Update action -->
        <h2> Want to update your character?</h2>
        <div>
          <form>
            <h3>Name:</h3>
            <input type = "text" v-model="character.name" />
            <br>
            <h3>Level:</h3>
            <label for="character_level_edit">Your character level:</label>
            <select id = "character_level_edit" v-model="character.level">
              <option value = "1">1</option>
            </select> 
            <br>
            <h3>Class:</h3>
            <label for="character_class_edit">Pick a class:</label>
            <select id = "character_class_edit" v-model="character.character_class_id">
              <option value = "1">Sorcerer: For whatever reason, you are doing magic instinctually and naturally.</option>
              <option value = "2">Warlock: You have magic because you made a deal with...something...Let's hope it's benevolent.</option>
              <option value = "3">Wizard: Study and hard work has lead you to magic.</option>
            </select>  
            <br>
            <h3>Specialize in something new?:</h3>
            <label for="speciality_edit">Pick a speciality:</label>
            <select id = "speciality_edit" v-model="character.speciality">
              <option value = "nuker">Nuker. Because if there are no explosions are you doing magic?</option>
              <option value = "utility">Utility. Always useful, always practical.</option>
              <option value = "crowd control">Crowd control. Let other do the damage, you control the field.</option>
              <option value = "the face">The Face. Who needs to fight? You get your way by just talking.</option>
              <option value = "none">None. Do what you want, you crazy diamond.</option>
            </select>

            <br>
            <h3>Learn a new spell!:</h3>
            <label for="spell_edit">Next spell?:</label>
            <select id = "spell_edit" v-model="character.new_spell_id">
              <option value = "1">Eldritch Blast</option>
              <option value = "2">Fire Bolt</option>
              <option value = "3">Friends</option>
              <option value = "4">Gust</option>
              <option value = "5">Mage Hand</option>
              <option value = "6">Message</option>
              <option value = "7">Mold Earth</option>
              <option value = "8">Toll the Dead</option>
              <option value = "9">Charm Person</option>
              <option value = "10">Comprehend Language</option>
              <option value = "11">Sleep</option>
              <option value = "12">Witch Bolt</option>

            </select>
            <br>
            <button v-on:click="updateCharacter(character)">Update Character</button>
            <!-- Delete Character -->
            <br>
            <button v-on:click="destroyCharacter(character)">Delete Character?</button>
          </form>
        </div>
      </div >

      <br>
      <br>
      </article>
    </div>
  </div>
</template>

<style>
</style>

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
        this.characters.push(response.data);
        this.newCharacterName = "";
        this.newCharacterLevel = "";
        this.newCharacterClass = "";
        this.newCharacterSpeciality = "";
      });
    },

    showCharacter: function(character) {
      if (this.currentCharacter === character) {
        this.currentCharacter = {};
      } else {
        this.currentCharacter = character;
      }
    },

    updateCharacter: function(character) {
      var params = {
        name: character.name,
        level: parseInt(character.level),
        character_class_id: parseInt(character.character_class_id),
        speciality: character.speciality,
        new_spell_id: parseInt(character.new_spell_id),
      };
      axios.patch("/api/characters/" + character.id, params).then(response => {
        console.log = "Updating character.";
        this.currentCharacter = {};
      });
    },

    destroyCharacter: function(character) {
      axios.delete("/api/characters/" + character.id).then(response => {
        var index = this.characters.indexOf(character);
        this.characters.splice(index, 1);
      });
    },

    destroySpell: function(character, spell) {
      axios.delete("/api/characters/" + character.id + "/" + spell.id).then(response => {
        console.log = "Spell deleted, back to the character profiles";
        // Ask for help on this
        // this.currentCharacter = response.data;
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
