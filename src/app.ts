import {
  ScrollTopComponent,
  NavbarComponent,
  FooterComponent,
  CardComponent,
} from "./components.js"; 
import { Recipe } from "./types.js";
let lastUpdatedIndex: number = -1;
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Poster bölümünü her 10 saniyede bir günceller.
 * @param posterRecipes Poster olarak gösterilebilecek tariflerin listesi.
 */
function updatePosterEvery10s(posterRecipes: Recipe[]): void {
  const posterDiv = document.getElementById("poster") as HTMLDivElement;

  if (!posterDiv) {
    return;
  }

  const currentIndex: number = Math.floor(Date.now() / 10000) % posterRecipes.length;

  if (currentIndex === lastUpdatedIndex) {
    return;
  }

  let selectedRecipe = posterRecipes[currentIndex];

  if (selectedRecipe) {
    posterDiv.innerHTML = `
      <a href="detail-recipes.html?id=${selectedRecipe.id}" title="${selectedRecipe.title}">
        <img src="${selectedRecipe.imageSrc}" alt="${selectedRecipe.title}">
      </a>
    `;
  } else {
    console.error("Poster tarifi bulunamadı.");
  }

  lastUpdatedIndex = currentIndex;
  console.log(`Poster ${currentIndex}. index için güncellendi.`);
}

/**
 * Uygulamayı başlatan ana asenkron fonksiyon.
 */
async function initializeApp(): Promise<void> {
  setupStaticComponents();

  try {
    const [mainResponse, posterResponse] = await Promise.all([
      fetch("recipes.json"),
      fetch("poster-recipes.json"),
    ]);

    const mainRecipes: Recipe[] = await mainResponse.json();
    const posterRecipes: Recipe[] = await posterResponse.json();

    const allRecipesMap = new Map<string, Recipe>();
    
    mainRecipes.forEach((recipe) => allRecipesMap.set(recipe.id, recipe));
    posterRecipes.forEach((recipe) => allRecipesMap.set(recipe.id, recipe));

    const allRecipes: Recipe[] = Array.from(allRecipesMap.values());
    
    updatePosterEvery10s(posterRecipes);
    setInterval(() => {
      updatePosterEvery10s(posterRecipes);
    }, 10000); 
    
    setupHomepageCards(mainRecipes);
    setupRecipePages(allRecipes);
  } catch (error) {
    console.error("Tarifler yüklenirken bir hata oluştu:", error);
    if (error instanceof Error) {
      console.error("Detaylı hata:", error.message);
    }
  }

  setupInteractiveMenus();
  setupScrollButton();
}

/**
 * Navbar, Footer ve ScrollTop bileşenlerini yerlerine yerleştirir.
 */
function setupStaticComponents(): void {
  const navbarPlaceholder = document.getElementById(
    "navbar-placeholder"
  ) as HTMLDivElement | null;

  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = NavbarComponent();
  }
  
  const footerPlaceholder = document.getElementById(
    "footer-placeholder"
  ) as HTMLDivElement | null;
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FooterComponent();
  }
  
  const scrollTopPlaceholder = document.getElementById(
    "scroll-top-placeholder"
  ) as HTMLDivElement | null;
  if (scrollTopPlaceholder) {
    scrollTopPlaceholder.innerHTML = ScrollTopComponent();
  }
}

/**
 * Ana sayfadaki ilk 3 tarifi listeler.
 */
function setupHomepageCards(CardRecipes: Recipe[]): void {
  const CardList = document.querySelector(".card-list") as HTMLElement | null;
  if (CardList) {
    const firstThreeRecipes = CardRecipes.slice(0, 3);
    const CardHTML = firstThreeRecipes
      .map((recipe) => CardComponent(recipe))
      .join("");
    CardList.innerHTML = CardHTML;
  }
}

/**
 * Tarif listeleme ve detay sayfalarını yönetir.
 */
function setupRecipePages(CardRecipes: Recipe[]): void {
  const CardRecipesList = document.querySelector(".card-recipes") as HTMLElement | null;
  const DetailRecipeContainer = document.getElementById("recipe-detail") as HTMLDivElement | null;

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const searchQuery = params.get("search");
  const recipeId = params.get("id");

  // --- Detay sayfası kontrolü ---
  if (DetailRecipeContainer) {
    if (recipeId) {
      const recipe: Recipe | undefined = CardRecipes.find((r) => r.id === recipeId);
      
      if (recipe) {
        DetailRecipeContainer.innerHTML = `
          <h2>${recipe.title}</h2>
          <div class="recipe-image-container">
            <img src="${recipe.imageSrc}" alt="${recipe.title}">
          </div>
          <p><strong>Kategori:</strong> ${recipe.category}</p>
          <p><strong>Süre:</strong> ${recipe.time}</p>
          <p>${recipe.detail}</p>
        `;
      } else {
        DetailRecipeContainer.innerHTML = "<p>Tarif bulunamadı.</p>";
      }
      return;
    } else {
      DetailRecipeContainer.innerHTML = "<p>Tarif ID'si belirtilmedi.</p>";
      return;
    }
  }

  // --- Recipes sayfası (listeleme) ---
  if (CardRecipesList) {
    let filteredRecipes: Recipe[] = CardRecipes;
    const pageTitleElement = document.querySelector("h2") as HTMLHeadingElement | null;

    if (category) {
      filteredRecipes = CardRecipes.filter(
        (recipe) => recipe.category === category
      );
      if (pageTitleElement) {
        pageTitleElement.textContent = category + " Tarifleri";
      }
    } else if (searchQuery) {
      const decodedQuery = decodeURIComponent(searchQuery).toLowerCase();
      filteredRecipes = CardRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(decodedQuery)
      );
      if (pageTitleElement) {
        pageTitleElement.textContent = `"${searchQuery}" için Arama Sonuçları`;
      }
    } else {
      if (pageTitleElement) {
        pageTitleElement.textContent = "Tüm Tarifler";
      }
    }

    const CardHTMLRecipes = filteredRecipes
      .map((recipe) => CardComponent(recipe))
      .join("");
    CardRecipesList.innerHTML = CardHTMLRecipes;
  }

  // --- Arama kutusu ---
  const searchForm = document.getElementById("search-form") as HTMLFormElement | null;
  const searchInputGlobal = document.getElementById("search") as HTMLInputElement | null;
  
  if (searchForm && searchInputGlobal) {
    searchForm.addEventListener("submit", (event: Event) => {
      event.preventDefault(); 
      const query = searchInputGlobal.value.trim();
      if (query) {
        window.location.href = `recipes.html?search=${encodeURIComponent(
          query
        )}`;
      }
    });
  }
}

/**
 * Menülerin açılıp kapanma etkileşimlerini ayarlar.
 */
function setupInteractiveMenus(): void {
  const hamburger = document.getElementById("hamburger-link") as HTMLDivElement | null;
  const sideMenu = document.getElementById("side-menu") as HTMLDivElement | null;
  const closeBtn = document.getElementById("close-btn") as HTMLAnchorElement | null;
  
  if (hamburger && sideMenu) {
    hamburger.addEventListener("click", () =>
      sideMenu.classList.toggle("active")
    );
  }
  
  const allCategories = document.getElementById("all-categories") as HTMLDivElement | null;
  const categoriesLink = document.getElementById("categories-link") as HTMLDivElement | null;

  if (categoriesLink && allCategories) {
    categoriesLink.addEventListener("click", () => {
      allCategories.classList.toggle("active");
    });
    allCategories.addEventListener("mouseleave", () => {
      allCategories.classList.remove("active");
    });
  }
  const sideAllCategories = document.getElementById("side-all-categories") as HTMLDivElement | null;
  const sideCategoriesLink = document.getElementById("side-categories-link") as HTMLAnchorElement | null;
  if (sideCategoriesLink && sideAllCategories) {
    sideCategoriesLink.addEventListener("click", () => {
      sideAllCategories.classList.toggle("active");
    });
    sideAllCategories.addEventListener("mouseleave", () => {
      sideAllCategories.classList.remove("active");
    });
  }
  const allLogin = document.getElementById("all-login") as HTMLDivElement | null;
  const loginLink = document.getElementById("login-link") as HTMLDivElement | null;

  if (loginLink && allLogin) {
    loginLink.addEventListener("click", () => {
      allLogin.classList.toggle("active");
    });
    allLogin.addEventListener("mouseleave", () => {
      allLogin.classList.remove("active");
    });
  }
  const sideLoginLink = document.getElementById("side-login-link") as HTMLAnchorElement | null;
  const sideAllLogin = document.getElementById("side-all-login") as HTMLDivElement | null;
  if (sideLoginLink && sideAllLogin) {
    sideLoginLink.addEventListener("click", () => {
      sideAllLogin.classList.toggle("active");
    });
    sideAllLogin.addEventListener("mouseleave", () => {
      sideAllLogin.classList.remove("active");
    });
  }
}


/**
 * Scroll butonu görünürlüğünü ve işlevini ayarlar.
 */
function setupScrollButton(): void {
  const scrollTopBtn = document.getElementById("scrollTopBtn") as HTMLButtonElement | null;

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      const scrollPosition: number = document.body.scrollTop || document.documentElement.scrollTop;
      
      if (scrollPosition > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
