import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "./ProductView";
import { toProduct } from "../../../lib/products";
import {
  getProductBySlug,
  getProductSlugs,
  getProducts,
  getSiteSettings,
} from "../../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — PGPR Technologies`,
    description: product.desc,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [sanityProduct, allSanityProducts, siteSettings] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getSiteSettings(),
  ]);

  if (!sanityProduct) notFound();

  const product = toProduct(sanityProduct);
  const otherProducts = allSanityProducts
    .filter((p) => p.slug !== slug)
    .map(toProduct);

  return (
    <ProductView product={product} otherProducts={otherProducts} siteSettings={siteSettings} />
  );
}
