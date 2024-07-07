<template>
  <v-app>
    <v-app-bar
      app
      dense
      color="white"
      fixed
      flat
      height="60"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        Kontrol Paneli <span style="font-weight:bold;">v0.1</span>
      </v-toolbar-title>
      <!-- -->
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn text color="grey" class="text--darken-2" v-on="on">
            <v-icon left>
              mdi-chevron-down
            </v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(link,idx) in links"
            :key="idx"
            to="/"
            @click="logout"
          >
            <v-list-item-title>Güvenli Çıkış</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-navigation-drawer
        v-model="drawer"
        left
        app
      >
        <v-divider />
        <v-parallax
          height="120"
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        >
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            Logo konulacak
          </div>
        </v-parallax>
        <template #prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><b>Yüce Admin</b></v-list-item-title>
              <v-list-item-subtitle>admin@admin.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list
          nav
          dense
        >
          <v-list-group
            prepend-icon="mdi-exclamation"
          >
            <template #activator>
              <v-list-item-title>Ürün Yönetimi</v-list-item-title>
            </template>
            <v-list-item
              link
              to="/categories"
            >
              <v-list-item-title>Kategoriler</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              to="/products"
            >
              <v-list-item-title>Ürün Listesi</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group
            prepend-icon="mdi-exclamation"
          >
            <template #activator>
              <v-list-item-title>N11</v-list-item-title>
            </template>
            <v-list-item
              link
              to="/kargo_fiyatlari"
            >
              <v-list-item-title>Kargo Fiyat Listesi</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              to="/komisyon_oranlari"
            >
              <v-list-item-title>Komisyon Oranları</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group
            prepend-icon="mdi-cog"
          >
            <template #activator>
              <v-list-item-title>Parametreler</v-list-item-title>
            </template>
            <v-list-item
              link
              to="/maliyet_hesaplari"
            >
              <v-list-item-title>Maliyet Hesaplama</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item
            link
            to="/siparisler"
          >
            <v-list-item-icon>
              <v-icon> mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Siparişler</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
/*eslint-disable*/
 export default {
    name:"default",
    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
         links: [
            { text: 'Ayarlar',route:'/ayarlar' },
          ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    methods: {
      async logout() {
        await this.$auth.logout()
      },
    },
  }
  </script>
