import { Recipe } from "./types";
export function ScrollTopComponent(): string {
  return ` <button id="scrollTopBtn" title="Yukarı Çık">&#8593;</button>`;
}

export function NavbarComponent(): string{
  return`
  <nav class="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-brand">
        My Recipe Book
      </a>

      <div class="search-container">
        <form id="search-form">
          <input
            type="search"
            id="search"
            placeholder="Tarif Ara (ör:Mercimek Çorbası, Biber Dolması...)"
          />
        </form>
      </div>
      <section class="button-section"></section>
      <div class="nav-links">
        <a href="recipes.html" id="recipes">
          Tüm Tarifler
        </a>
        <div class="dropdown-container">
        <div id="categories-link">Tüm kategoriler</div>
        <div id="all-categories">
          <a href="recipes.html?category=Çorbalar">Çorbalar</a>
          <a href="recipes.html?category=Tatlılar">Tatlılar</a>
          <a href="recipes.html?category=AnaYemek">Ana Yemekler</a>
        </div>
      </div>

      <div class="dropdown-container">
        <div id="login-link"> Giriş Yap/Üye Ol</div>
        <div id="all-login">
          <a href="login.html?login=Login">Giriş Yap</a>
          <a href="login.html?login=Signup">Üye Ol</a>
        </div>
      </div>
      </div>
      <div id="hamburger-link">☰</div>
    </div>
    <div id="side-menu">
      <a href="#" id="close-btn">
        ×
      </a>
      <a href="index.html" id="home">
        Anasayfa
      </a>
      <a href="recipes.html" id="recipes">
        Tüm Tarifler
      </a>
        <div class="dropdown-container">
      <a id="side-categories-link">Tüm Kategoriler</a>
      <div id="side-all-categories">
        <a href="recipes.html?category=Çorbalar">Çorbalar</a>
        <a href="recipes.html?category=Tatlılar">Tatlılar</a>
        <a href="recipes.html?category=AnaYemek">Ana Yemekler</a>
      </div>   
      </div>
       <div class="dropdown-container">
     <a id="side-login-link"> Giriş Yap/Üye Ol</a>
         <div id="side-all-login">
         <a href="login.html?login=Login">Giriş Yap</a>
          <a href="login.html?login=Signup">Üye Ol</a>
        </a>
    </div>
    </div>
  </nav>`
};
export function FooterComponent(): string {
  return `
<footer class="footer">
    <div class="footer-inner">

      <div class="footer-col brand">
        <h2>My Recipe Book</h2>
        <p>Defterinizden bir tarif arar gibi...</p>
      </div>

      <div class="footer-col links">
        <h3>Bağlantılar</h3>
        <ul>
          <li><a href="index.html">Anasayfa</a></li>
          <li><a href="recipes.html">Tüm Tarifler</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Kategoriler</h3>
            <ul>
          <li> <a href="recipes.html?category=Çorbalar">Çorbalar</a></li>
          <li> <a href="recipes.html?category=Tatlılar">Tatlılar</a></li>
          <li> <a href="recipes.html?category=AnaYemek">Ana Yemekler</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Rukiye ANAR | Tüm Hakları Saklıdır.</p>
    </div>
  </footer>

  `;
}
export function CardComponent(recipe: Recipe):string {
  return `
    <div class="card">
      <div class="binder-holes"> 
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
      </div>
        <div class="card-content">
        <img src="${recipe.imageSrc}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p><strong>Süre:</strong> ${recipe.time}</p>
      <a href="detail-recipes.html?id=${recipe.id}">Tarife Git</a>
   
        </div> 
    </div>
  `;
}