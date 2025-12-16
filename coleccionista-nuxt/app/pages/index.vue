<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1>Bienvenido a Jikan Anime</h1>
        <p class="tagline">Tu colección de anime, siempre contigo</p>
        <div class="quick-actions">
          <button @click="router.push('/search')" class="action-btn primary">
            <span>Buscar Anime</span>
          </button>
          <button
            @click="router.push('/favorites')"
            class="action-btn secondary"
          >
            <span>Mis Favoritos ({{ store.favorites.length }})</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Dashboard -->
    <section class="stats-dashboard">
      <div class="container">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <div class="stat-value">{{ store.favorites.length }}</div>
            <div class="stat-label">Animes Guardados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <div class="stat-value">{{ averageScore }}</div>
            <div class="stat-label">Puntuación Media</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-info">
            <div class="stat-value">{{ topAnimes.length }}</div>
            <div class="stat-label">Top Animes Cargados</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mis Favoritos Recientes -->
    <section class="section" v-if="recentFavorites.length > 0">
      <div class="container">
        <div class="section-header">
          <h2>Mis Favoritos Recientes</h2>
          <button @click="router.push('/favorites')" class="view-all">
            Ver todos →
          </button>
        </div>
        <div class="animes-grid">
          <ItemCard
            v-for="anime in recentFavorites"
            :key="anime.mal_id"
            :item="anime"
          >
            <template #favorites>
              <button
                @click="store.removeFavorite(anime.mal_id)"
                class="remove-btn-small"
              >
                Eliminar
              </button>
            </template>
          </ItemCard>
        </div>
      </div>
    </section>

    <!-- Top Animes -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Top Animes del Momento</h2>
          <button @click="router.push('/search')" class="view-all">
            Explorar más →
          </button>
        </div>

        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Cargando animes populares...</p>
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="topAnimes.length > 0" class="animes-grid">
          <ItemCard
            v-for="anime in topAnimes"
            :key="anime.mal_id"
            :item="anime"
          >
            <template #favorites>
              <button @click="store.toggleFavorite(anime)" class="favorite-btn">
                {{ store.isFavorite(anime.mal_id) ? "❤️" : "🤍" }}
              </button>
            </template>
          </ItemCard>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">¿Por qué usar Jikan Anime?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">🌐</div>
            </div>
            <h3>Base de Datos Completa</h3>
            <p>Acceso a miles de animes a través de la API de MyAnimeList.</p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">💾</div>
            </div>
            <h3>Guardado Local</h3>
            <p>
              Tus favoritos se guardan en tu navegador, sin necesidad de cuenta.
            </p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">⚡</div>
            </div>
            <h3>Rápido y Simple</h3>
            <p>
              Interfaz intuitiva para encontrar y guardar animes en segundos.
            </p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">📊</div>
            </div>
            <h3>Información Detallada</h3>
            <p>Sinopsis, puntuaciones, géneros, trailers y mucho más.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-final">
      <div class="container">
        <h2>¿Listo para comenzar tu colección?</h2>
        <p>Descubre y guarda tus animes favoritos ahora mismo</p>
        <button @click="router.push('/search')" class="cta-button">
          Empezar Ahora
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
const router = useRouter();
const store = useFavoritesStore();

const { public: publicConfig } = useRuntimeConfig();

const topAnimes = ref([]);
const loading = ref(false);
const error = ref(null);

// Computed: Últimos 4 favoritos
const recentFavorites = computed(() => {
  return store.favorites.slice(-4).reverse();
});

// Computed: Puntuación media de favoritos
const averageScore = computed(() => {
  if (store.favorites.length === 0) return "N/A";

  // Versión con reduce
  // const total = store.favorites.reduce(
  //   (sum, anime) => sum + (anime.score || 0),
  //   0
  // );

  // Versión con for
  let total = 0;
  for (let anime of store.favorites) {
    total = total + (anime.score || 0);
  }

  return (total / store.favorites.length).toFixed(1);
});

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`${publicConfig.apiBase}/top/anime`, {
      params: {
        limit: 10,
      },
    });
    topAnimes.value = response.data.data;
  } catch (err) {
    error.value = "Error al cargar los animes populares.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  animation: pulse 15s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  margin: 0 0 1rem 0;
  font-weight: 800;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-size: 1.5rem;
  margin: 0 0 2.5rem 0;
  opacity: 0.95;
  font-weight: 300;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.action-btn .icon {
  font-size: 1.3rem;
}

.action-btn.primary {
  background: white;
  color: #764ba2;
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

/* Stats Dashboard */
.stats-dashboard {
  margin-top: -3rem;
  padding: 0 2rem 3rem;
  position: relative;
  z-index: 2;
}

.stats-dashboard .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 3rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #764ba2;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

/* Sections */
.section {
  padding: 3rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.view-all {
  background: transparent;
  border: 2px solid #764ba2;
  color: #764ba2;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.view-all:hover {
  background: #764ba2;
  color: white;
}

.animes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #764ba2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  color: #d32f2f;
  background: #ffebee;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.favorite-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s;
}
.remove-btn-small {
  background: #e73e32;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: transform 0.3s;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.remove-btn-small:hover {
  background: #92261c;
  transform: scale(1);
}

/* Features Section */
.features-section {
  padding: 4rem 0;
  background: white;
}

.features-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 3rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
}

.feature {
  text-align: center;
}

.feature-icon-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
}

.feature-icon {
  font-size: 2.5rem;
}

.feature h3 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 0.75rem 0;
}

.feature p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* CTA Final */
.cta-final {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
}

.cta-final h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.cta-final p {
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

.cta-button {
  background: white;
  color: #764ba2;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .quick-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .animes-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
