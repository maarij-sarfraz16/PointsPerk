<template>
  <v-navigation-drawer v-model="localDrawer" app class="rounded-sidebar custom-drawer">
    <v-container>

      <v-row>
        <v-col cols="12">
          <v-list>
            
            <router-link to="/" exact  class="router-link">
              <v-list-item :to="{ path: '/' }" exact active-class="active" class="option-item">
                <v-list-item-icon class="option-icon"><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
                <v-list-item-content class="option-text">Dashboard</v-list-item-content>
              </v-list-item>
            </router-link>

            <v-row class="option-space"></v-row>

            <router-link to="/history" exact class="router-link">
              <v-list-item :to="{ path: '/history' }" exact active-class="active" class="option-item">
                <v-list-item-icon class="option-icon"><v-icon>mdi-history</v-icon></v-list-item-icon>
                <v-list-item-content class="option-text">Redemption History</v-list-item-content>
              </v-list-item>
            </router-link>

            <v-row class="option-space"></v-row>

            <router-link to="/settings" exact class="router-link">
              <v-list-item :to="{ path: '/settings' }" exact active-class="active" class="option-item">
                <v-list-item-icon class="option-icon"><v-icon>mdi-cog</v-icon></v-list-item-icon>
                <v-list-item-content class="option-text">Profile Settings</v-list-item-content>
              </v-list-item>
            </router-link>

          </v-list>
        </v-col>
      </v-row>

      <v-row class="spacer-row"></v-row>

      <v-row rows="16">
        <v-col cols="12" class="text-center">
          <router-link to="/login">
            <v-btn color="#4B49AC" @click="handleLogout">Log Out</v-btn>
          </router-link>
        </v-col>
      </v-row>

    </v-container>
  </v-navigation-drawer>
</template>

<script>

  import { useRouter } from 'vue-router';

  export default {

    setup() {
      const router = useRouter();

      const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
      };

      return {
        handleLogout
      };
    },
    
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

<style scoped>
  .spacer-row {
    height: 160px;
    flex-grow: 1;
  }
  .text-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .option-space{
    height: 20px
  }
  .option-text {
    color: #46464f;
    font-size: 11px; 
    font-weight: light;
  }
  .option-item {
    border-radius: 8px;
    margin-bottom: 10px;
    color: transparent;
    cursor: pointer;
  }
  .option-item:hover {
    background-color: #f0f0f0;
  }
  .router-link-active .option-item {
    color: #4b49ac;
    
  }
  .option-item.active .option-text,
  .option-item.active .option-icon {
    color: white;
  }
  .option-item.active:hover {
    background-color: #4b49ac;
  }
  .option-icon {
    color: #4b49ac;
    margin-right: 5px; 
  }
  .rounded-sidebar {
    border-radius: 16px;
    width:60px;
  }
  .custom-drawer {
    width: 250px;
    max-width: 200px;
  }
  .active {
    background-color: #4b49ac;
    color: white;
  }
  .router-link {
    text-decoration: none;
  }
</style>