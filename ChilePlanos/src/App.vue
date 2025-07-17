
<template>
  <header class="header">
    <img src="./assets/logo.png" class="logo">
    <nav class="navegador">
      <a href="#">Inicio</a>
      <a href="#">Ver</a>
      <a href="#">Favoritos</a>
      <form class="form-buscar" @submit.prevent="buscarPlano">
        <input type="text" v-model="busqueda" placeholder="Buscar planos..." class="buscador" id="buscador">
        <button class="boton-buscar" type="submit">
          <img src="./assets/img/lupa.png" alt="Buscar" class="lupa">
        </button>
      </form>
    </nav>
  </header>
  <main class="main">
    <h3>Todos los planos que necesites los encuentras en ChilePlanos</h3>
    <ul>
      <li v-for="(plano, i) in planosMostrados" :key="i">
        <h4>{{ plano.nombre }}</h4>
        <p>Descripción: {{ plano.descripcion }}</p>
        <button class="favoritos-btn" @click="agregarFavorito(plano)">+</button>
      </li>
    </ul>
  </main>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      busqueda: '',
      planos: [
        {
          nombre: 'Plano de Santiago',
          descripcion: 'Plano detallado de la ciudad de Santiago, incluyendo calles, avenidas y puntos de interés.'
        },
        {
          nombre: 'Plano de Valparaíso',
          descripcion: 'Mapa de Valparaíso con sus cerros y principales atracciones turísticas.'
        },
        {
          nombre: 'Plano de Concepción',
          descripcion: 'Plano de Concepción con información sobre transporte público y zonas comerciales.'
        }
      ],
      planosApi: [],
      favoritos: []
    }
  },
  computed: {
    planosMostrados() {
      if (this.busqueda.trim() === '') {
        return [...this.planos, ...this.planosApi];
      }
      const valor = this.busqueda.trim().toLowerCase();
      return [...this.planos, ...this.planosApi].filter(plano =>
        plano.nombre.toLowerCase().includes(valor)
      );
    }
  },
  methods: {
    async obtenerDatosDeApis() {
      const urls = [
        // URLs de ejemplo, deben ser reemplazadas por las correctas
        "https://overpass-api.de/api/planos", 
        "https://mapbox.com/api/planos",
        "https://developers.arcgis.com/api/planos",
        "https://forge.autodesk.com/api/planos"
      ];
      let planos = [];
      for (const url of urls) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          planos.push({
            nombre: data.nombre || "Sin nombre",
            descripcion: data.descripcion || "Sin descripción",
            imagen: data.imagen || "imagen_default.png"
          });
        } catch (error) {
          console.error("Error al obtener datos de la API:", url, error);
        }
      }
      this.planosApi = planos;
    },
    buscarPlano() {
      if (this.busqueda.trim() === '') {
        alert('Por favor, ingresa un plano para buscar.');
        return;
      }
      // Opcional: puedes llamar a obtenerDatosDeApis aquí si quieres actualizar los datos cada vez
      // this.obtenerDatosDeApis();
    },
    agregarFavorito(plano) {
      if (!this.favoritos.includes(plano)) {
        this.favoritos.push(plano);
        alert(`Plano agregado a favoritos: ${plano.nombre}`);
      }
    }
  },
  mounted() {
    this.obtenerDatosDeApis();
  }
}
</script>


<style>
/* Puedes agregar estilos locales aquí o usar style.css global */
</style>
