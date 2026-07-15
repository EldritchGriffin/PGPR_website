import HomeView from "./HomeView";
import { toProduct } from "../lib/products";
import {
  getHomePage,
  getProducts,
  getSiteSettings,
  getTestimonials,
} from "../lib/sanity/queries";

function chunkPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export default async function Page() {
  const [homePage, sanityProducts, testimonials, siteSettings] = await Promise.all([
    getHomePage(),
    getProducts(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  const products = sanityProducts.map(toProduct);
  const testimonialSlides = chunkPairs(testimonials);

  return (
    <HomeView
      homePage={homePage}
      products={products}
      testimonialSlides={testimonialSlides}
      siteSettings={siteSettings}
    />
  );
}
