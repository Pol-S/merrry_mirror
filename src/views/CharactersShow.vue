<template>
  <div>
    <article class="container box style3">
    <h2>Name: {{ character.name }}</h2>
    <h3>Class: {{ character.character_class}}</h3>
    <h4>Chosen Speciality: {{character.speciality}} </h4>
    <h3>Level: {{character.level}}</h3>
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
    <router-link to="/">Back to all characters</router-link>
    </article>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      character: {},
      message: "Test show page",
    };
  },
  created: function() {
    axios.get("/api/characters/" + this.$route.params.id).then(response => {
      console.log("characters show", response);
      this.character = response.data;
    });
  },
  methods: {},
};
</script>
