import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, ONLINE_PROGRAMMAS } from "@/lib/products";
import { Container } from "@/components/ui";
import { RapportClient } from "./RapportClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ONLINE_PROGRAMMAS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `Reflectierapport ${product.name} · VIVYNQ`,
    description: `Jouw persoonlijk reflectierapport van het programma ${product.name}.`,
    robots: { index: false },
  };
}

export default async function RapportPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product || product.fulfillment !== "program") notFound();

  return (
    <div style={{ background: "#0F0318", minHeight: "100vh" }}>
      {/* Subtiel decoratief element */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)" }} />
      </div>

      <Container style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "80px", maxWidth: "720px" }}>
        <RapportClient
          product={{
            slug: product.slug,
            name: product.name,
            tagline: product.tagline,
            systemischInzicht: product.systemischInzicht,
            reflectieVragen: product.reflectieVragen,
          }}
        />
      </Container>
    </div>
  );
}
