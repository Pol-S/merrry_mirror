<template>
  <div class="characters-show">
    <article class="container box style3">
      <h2>Name: {{ character.name }}</h2>
      <h3>Class: {{ character.character_class }}</h3>
      <h4>Chosen Speciality: {{ character.speciality }}</h4>
      <h3>Level: {{ character.level }}</h3>
      <h3>Player: {{ character.user }}</h3>
      <br />
      <p>What are your strengths and weaknesses as a spellcaster?</p>
      <br />
      <div class="ct-chart ct-perfect-square"></div>
      <!-- <p>Nuking score: {{ character.nuke_score }}</p>
      <p>Control score: {{ character.cc_score }}</p>
      <p>Utility score: {{ character.utility_score }}</p>
      <p>Social magic score: {{ character.face_score }}</p> -->
      <h3>Spell list:</h3>
      <br />
      <div v-for="spell in character.spells">
        <hr />
        <header>
          <br />
          <p>Spell: {{ spell.spell }}</p>
          <p>Descripton: {{ spell.description }}</p>
          <p><button v-on:click="destroySpell(character, spell)">Delete spell?</button></p>
        </header>
      </div>

      <!-- Update action -->
      <h2>Want to update your character?</h2>
      <div>
        <form onsubmit="event.preventDefault();">
          <h3>Learn a new spell!:</h3>
          <label for="spell_edit">Next spell? ({{ validSpells.length }} available):</label>
          <select id="spell_edit" v-model="character.new_spell_id">
            <option v-for="spell in validSpells" v-bind:value="spell.id">{{ spell.name }} - {{ spell.description}}</option>
          </select>
          <br />
          <h3>Name:</h3>
          <input type="text" v-model="character.name" />
          <br />
          <h3>Level:</h3>
          <label for="character_level_edit">Your character level:</label>
          <select id="character_level_edit" v-model="character.level">
            <option value="1">1</option>
          </select>
          <br />
          <h3>Class:</h3>
          <label for="character_class_edit">Pick a class:</label>
          <select id="character_class_edit" v-model="character.character_class_id">
            <option value="1">Sorcerer: For whatever reason, you are doing magic instinctually and naturally.</option>
            <option value="2">
              Warlock: You have magic because you made a deal with...something...Let's hope it's benevolent.
            </option>
            <option value="3">Wizard: Study and hard work has lead you to magic.</option>
          </select>
          <br />
          <h3>Specialize in something new?:</h3>
          <label for="speciality_edit">Pick a speciality:</label>
          <select id="speciality_edit" v-model="character.speciality">
            <option value="nuker">Nuker. Because if there are no explosions are you doing magic?</option>
            <option value="utility">Utility. Always useful, always practical.</option>
            <option value="crowd control">Crowd control. Let other do the damage, you control the field.</option>
            <option value="the face">The Face. Who needs to fight? You get your way by just talking.</option>
            <option value="none">None. Do what you want, you crazy diamond.</option>
          </select>

          <br />

          <button v-on:click="updateCharacter(character)">Update Character</button>
          <!-- Delete Character -->
          
          <button v-on:click="destroyCharacter(character)">Delete Character?</button>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import Chartist from "chartist";
export default {
  data: function() {
    return {
      character: {},
      spells: [],
      data: {
        labels: ["Nuking", "Utility", "Control", "Social"],
        series: [],
      },
      seriesData: [],
    };
  },
  created: function() {
    axios.get("/api/characters/" + this.$route.params.id).then(response => {
      this.character = response.data;
      this.seriesData.push(this.character.nuke_score);
      this.seriesData.push(this.character.cc_score);
      this.seriesData.push(this.character.utility_score);
      this.seriesData.push(this.character.face_score);

      this.data.series.push(this.seriesData);
      new Chartist.Line(".ct-chart", this.data);
    });
    axios.get("/api/spells").then(response => {
      this.spells = response.data;
    });
  },
  methods: {
    updateCharacter: function(character) {
      var params = {
        name: character.name,
        level: parseInt(character.level),
        character_class_id: parseInt(character.character_class_id),
        speciality: character.speciality,
        new_spell_id: parseInt(character.new_spell_id),
      };
      axios.patch("/api/characters/" + character.id, params).then(response => {
        console.log("Updating character");
        // this.$router.push("/characters/" + character.id);
        location.reload();
      });
    },

    destroyCharacter: function(character) {
      axios.delete("/api/characters/" + character.id).then(response => {
        console.log("character destroy", response);
        this.$router.push("/").catch(err => {});
      });
    },

    destroySpell: function(character, spell) {
      axios.delete("/api/characters/" + character.id + "/" + spell.id).then(response => {
        console.log("Spell deleted", response);

        // this.$router.push("/characters/" + character.id).catch(err => {});
        location.reload();
      });
    },
  },

  computed: {
    validSpells: function() {
      return this.spells.filter(spell =>
        spell.character_classes.map(x => x.id).includes(parseInt(this.character.character_class_id))
      );
    },
  },
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
</script>
