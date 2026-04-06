import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/printful';
import ProductDetail from './ProductDetail';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { sync_product } = await getProductById(params.id);
    return {
      title: `${sync_product.name} | Elite Iron Store`,
      description: `Shop ${sync_product.name} from Elite Iron Sports Performance.`,
    };
  } catch {
    return { title: 'Product | Elite Iron Store' };
  }
}

export default async function ProductPage({ params }: Props) {
  try {
    const product = await getProductById(params.id);
    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}
