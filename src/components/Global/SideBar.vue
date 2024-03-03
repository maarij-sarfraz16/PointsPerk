<template>
  <v-navigation-drawer v-model="localDrawer">
    <div style="margin-top: 10px"></div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      "
    >
      <v-img src="../assets/Emblem.png" alt="Logo" />
    </div>

    <div style="margin-top: 50px"></div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      "
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon> <v-icon>mdi-home</v-icon>Home </v-list-item-icon>
        </v-list-item>

        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>Users
          </v-list-item-icon>
        </v-list-item>

        <v-list-item link to="/">
          <v-list-item-icon> <v-icon>mdi-tools</v-icon>Tools </v-list-item-icon>
        </v-list-item>

        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>Settings
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </div>

    <div style="margin-top: 200px"></div>

    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      "
    >
      <v-btn color="#4B49AC">Log Out</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",

  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localDrawer: this.drawer,
    };
  },

  watch: {
    drawer(newValue) {
      this.localDrawer = newValue;
    },
  },
};
</script>
