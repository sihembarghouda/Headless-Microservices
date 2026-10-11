
import Image from "next/image";

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

const STRAPI_URL =
  process.env.STRAPI_INTERNAL_URL || "http://backend:1337";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  image?: {
    url: string;
    alternativeText?: string | null;
  } | null;
  category?: {
    name: string;
  } | null;
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?populate=*`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Erreur Strapi :", error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Erreur catégories Strapi :", error);
    return [];
  }
}

function createCategoryId(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="shop">
      <header className="shop-header">
        <div className="shop-header-inner">
          <a href="#" className="shop-logo">
            PhoneTech <span>Accessories</span>
          </a>

          <nav className="shop-navigation">
            <a href="#produits">Tous les produits</a>

            {categories.map((category) => (
              <a
                key={category.id}
                href={`#categorie-${createCategoryId(category.name)}`}
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="shop-hero">
        <div className="shop-hero-inner">
          <p className="shop-eyebrow">
            ACCESSOIRES POUR SMARTPHONES
          </p>

          <h1>Tout pour votre téléphone.</h1>

          <p className="shop-hero-text">
            Coques, chargeurs et écouteurs : découvrez notre sélection
            d’accessoires pour votre quotidien.
          </p>

          <a href="#produits" className="shop-hero-button">
            Découvrir la collection
          </a>
        </div>
      </section>

      <section className="shop-products" id="produits">
        <div className="shop-section-heading">
          <p className="shop-eyebrow">NOTRE COLLECTION</p>
          <h2>Nos produits</h2>
          <p>Des accessoires pratiques, sélectionnés pour vous.</p>
        </div>

        {products.length === 0 ? (
          <p>Aucun produit disponible pour le moment.</p>
        ) : (
          categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category?.name === category.name
            );

            if (categoryProducts.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`categorie-${createCategoryId(category.name)}`}
                className="category-section"
              >
                <h2 className="category-title">{category.name}</h2>

                <div className="product-grid">
                  {categoryProducts.map((product) => (
                    <article className="product-card" key={product.id}>
                      <div className="product-image-box">
                        {product.image?.url ? (
                          <Image
                            src={`${PUBLIC_API_URL}${product.image.url}`}
                            alt={
                              product.image.alternativeText ||
                              product.title
                            }
                            width={800}
                            height={600}
                            className="product-image"
                            unoptimized
                          />
                        ) : (
                          <span className="no-image">
                            Image indisponible
                          </span>
                        )}
                      </div>

                      <div className="product-info">
                        <p className="product-category">
                          {category.name}
                        </p>

                        <h3>{product.title}</h3>

                        <p className="product-price">
                          {Number(product.price).toFixed(2)} DT
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </section>

      <footer className="shop-footer">
        © {new Date().getFullYear()} PhoneTech Accessories
      </footer>

      <style>{`
        .shop {
          min-height: 100vh;
          background: #f5f7fb;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        .shop-header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .shop-header-inner {
          max-width: 1180px;
          min-height: 76px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .shop-logo {
          font-size: 22px;
          font-weight: 800;
          color: #172033;
          text-decoration: none;
          white-space: nowrap;
        }

        .shop-logo span {
          color: #2563eb;
        }

        .shop-navigation {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 22px;
        }

        .shop-navigation a {
          color: #334155;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .shop-navigation a:hover {
          color: #2563eb;
        }

        .shop-hero {
          background: linear-gradient(120deg, #111827, #1e40af);
          color: white;
        }

        .shop-hero-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 24px 60px;
        }

        .shop-eyebrow {
          color: #2563eb;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .shop-hero .shop-eyebrow {
          color: #bfdbfe;
        }

        .shop-hero h1 {
          max-width: 650px;
          margin: 14px 0;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.15;
          font-weight: 800;
        }

        .shop-hero-text {
          max-width: 570px;
          margin: 0 0 24px;
          color: #e5e7eb;
          font-size: 16px;
          line-height: 1.7;
        }

        .shop-hero-button {
          display: inline-block;
          padding: 12px 20px;
          border-radius: 7px;
          background: white;
          color: #1e40af;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }

        .shop-products {
          max-width: 1180px;
          margin: 0 auto;
          padding: 44px 24px 56px;
          scroll-margin-top: 20px;
        }

        .shop-section-heading {
          margin-bottom: 30px;
        }

        .shop-section-heading h2 {
          margin: 8px 0;
          font-size: 30px;
          font-weight: 800;
          color: #172033;
        }

        .shop-section-heading > p:last-child {
          margin-top: 8px;
          color: #64748b;
          font-size: 14px;
        }

        .category-section {
          margin-top: 36px;
          scroll-margin-top: 24px;
        }

        .category-title {
          margin: 0 0 18px;
          padding-bottom: 12px;
          border-bottom: 2px solid #dbeafe;
          color: #172033;
          font-size: 23px;
          font-weight: 800;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .product-card {
          min-width: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.09);
        }

        .product-image-box {
          height: 175px;
          width: 100%;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .product-image {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .no-image {
          color: #94a3b8;
          font-size: 12px;
        }

        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .product-category {
          margin: 0 0 9px;
          color: #2563eb;
          font-size: 12px;
          font-weight: 700;
        }

        .product-info h3 {
          margin: 0;
          min-height: 40px;
          color: #172033;
          font-size: 15px;
          line-height: 1.45;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .product-price {
          margin: auto 0 0;
          padding-top: 16px;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
        }

        .shop-footer {
          padding: 24px;
          background: #111827;
          color: #cbd5e1;
          text-align: center;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .shop-header-inner {
            flex-wrap: wrap;
          }

          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .shop-header-inner {
            padding: 14px 16px;
          }

          .shop-logo {
            font-size: 18px;
          }

          .shop-navigation {
            gap: 10px;
            justify-content: flex-start;
          }

          .shop-navigation a {
            font-size: 12px;
          }

          .shop-hero-inner {
            padding: 42px 20px;
          }

          .shop-products {
            padding: 32px 16px 40px;
          }

          .category-title {
            font-size: 20px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .product-image-box {
            height: 135px;
            padding: 10px;
          }

          .product-info {
            padding: 12px;
          }

          .product-info h3 {
            font-size: 13px;
          }

          .product-price {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
