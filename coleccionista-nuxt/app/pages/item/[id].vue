<template>
  <div class="item-detail-page">
    <div v-if="loading" class="loading">Cargando detalles...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="anime" class="detail-container">
      <div class="detail-header">
        <button @click="goBack" class="back-btn">Volver</button>

        <img
          v-if="anime.images?.jpg?.large_image_url"
          :src="anime.images.jpg.large_image_url"
          :alt="anime.title"
          class="detail-image"
        />
        <div class="detail-info">
          <h1>{{ anime.title }}</h1>
          <p v-if="anime.title_english" class="subtitle">
            {{ anime.title_english }}
          </p>

          <div class="meta-info">
            <span v-if="anime.score" class="score">⭐ {{ anime.score }}</span>
            <span v-if="anime.type" class="type">{{ anime.type }}</span>
            <span v-if="anime.status" class="status">{{ anime.status }}</span>
            <span v-if="anime.episodes" class="episodes"
              >{{ anime.episodes }} episodios</span
            >
          </div>

          <div class="genres" v-if="anime.genres && anime.genres.length > 0">
            <span
              v-for="genre in anime.genres"
              :key="genre.mal_id"
              class="genre-tag"
            >
              {{ genre.name }}
            </span>
          </div>

          <!-- Botón de favoritos -->
          <button
            @click="store.toggleFavorite(anime)"
            class="favorite-detail-btn"
          >
            {{
              store.isFavorite(anime.mal_id)
                ? "❤️ En Favoritos"
                : "🤍 Añadir a Favoritos"
            }}
          </button>
          <div class="ai-container">
            <h3>Información Extra (IA)</h3>

            <!-- Passem el nom de l'item actual a la funció -->
            <button
              class="ai-btn"
              @click="generateCreativeText(anime?.title || anime?.name)"
              :disabled="isGenerating || !anime"
            >
              {{ isGenerating ? "Pensando..." : "Generar dato curioso" }}
            </button>

            <p v-if="aiResponse" class="response-box">
              {{ aiResponse }}
            </p>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <div class="section">
          <h2>Sinopsis</h2>
          <p>{{ anime.synopsis || "No hay sinopsis disponible." }}</p>
        </div>

        <div class="section" v-if="anime.aired">
          <h2>Información adicional</h2>
          <p>
            <strong>Emitido:</strong> {{ formatDate(anime.aired.from) }} -
            {{ formatDate(anime.aired.to) }}
          </p>
          <p v-if="anime.duration">
            <strong>Duración:</strong> {{ anime.duration }}
          </p>
          <p v-if="anime.rating">
            <strong>Clasificación:</strong> {{ anime.rating }}
          </p>
          <p v-if="anime.source"><strong>Fuente:</strong> {{ anime.source }}</p>
          <p v-if="anime.studios && anime.studios.length > 0">
            <strong>Estudio:</strong>
            {{ anime.studios.map((s) => s.name).join(", ") }}
          </p>
        </div>

        <!-- Trailer -->
        <div class="section" v-if="anime.trailer?.youtube_id">
          <h2>Trailer</h2>
          <iframe
            :src="`https://www.youtube.com/embed/${anime.trailer.youtube_id}`"
            frameborder="0"
            allowfullscreen
            class="trailer"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useGemini } from "~/composables/useGemini";

const { aiResponse, isGenerating, generateCreativeText } = useGemini();
const route = useRoute();
const router = useRouter();
const store = useFavoritesStore();

const anime = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  const id = route.params.id;
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    anime.value = response.data.data;
  } catch (err) {
    error.value = "Error al cargar los detalles del anime. Intenta de nuevo.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};

const formatDate = (dateString) => {
  if (!dateString) return "?";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.item-detail-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 4px;
}

.detail-header {
  display: flex;
  gap: 2rem;
  padding: 3.5rem 2rem 2rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.detail-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-image {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.detail-info {
  flex: 1;
}

h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0 0 1rem 0;
}

.meta-info {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.meta-info span {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.score {
  background: rgba(255, 193, 7, 0.3);
  font-weight: bold;
}

.genres {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.genre-tag {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.85rem;
}

.favorite-detail-btn {
  background: white;
  color: #764ba2;
  border: 2px solid white;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  transition: all 0.3s;
}

.favorite-detail-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.detail-body {
  padding: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.section h2 {
  color: #764ba2;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.section p {
  line-height: 1.6;
  color: #333;
  margin: 0.5rem 0;
}

.trailer {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}

/* IA extra info styles */
.ai-container {
  margin-top: 1.5rem;
}

.ai-container h3 {
  color: #fff;
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.ai-btn {
  background: white;
  color: #764ba2;
  border: 2px solid white;
  padding: 0.6rem 1.2rem;
  border-radius: 22px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 0.8rem;
  transition: all 0.3s;
}

.ai-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.03);
}

.ai-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.response-box {
  background: #f7f5fb;
  border: 1px solid #e6def2;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.8rem;
  color: #4a3b6b;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
  }

  .detail-image {
    width: 100%;
    height: auto;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
