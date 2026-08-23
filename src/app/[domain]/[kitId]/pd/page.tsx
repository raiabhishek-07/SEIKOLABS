import ProductDescriptionPage from "@/app/products/[id]/pd/page";

export default function DomainKitPdPage({ params }: { params: Promise<{ domain: string; kitId: string }> }) {
  return <ProductDescriptionPage params={params.then((p) => ({ id: p.kitId }))} />;
}
