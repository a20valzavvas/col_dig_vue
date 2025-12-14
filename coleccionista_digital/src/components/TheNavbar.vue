<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">
          <span class="brand-name">JK Anime</span>
        </router-link>
      </div>
      <ul class="navbar-menu">
        <li>
          <router-link to="/" class="nav-link">
            <span>Inicio</span>
          </router-link>
        </li>
        <li>
          <router-link to="/search" class="nav-link">
            <span>Buscar</span>
          </router-link>
        </li>
        <li>
          <router-link to="/favorites" class="nav-link">
            <span>Favoritos</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.8rem 0;
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #764ba2;
  font-size: 1.3rem;
  font-weight: 700;
  transition: opacity 0.3s;
}

.brand-link:hover {
  opacity: 0.9;
}

.brand-name {
  display: inline-block;
}

/* Menu */
.navbar-menu {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  color: #333;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(118, 75, 162, 0.1);
  color: #764ba2;
  transform: translateY(-2px);
}

/* Active Link */
.nav-link[aria-current="page"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.nav-link[aria-current="page"]:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem;
  }

  .navbar-menu {
    width: 100%;
    justify-content: space-around;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 1rem;
  }

  .nav-link {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>
