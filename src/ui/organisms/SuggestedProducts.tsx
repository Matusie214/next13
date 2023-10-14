import type { FC } from "react";
import { ProductList } from "./ProductList";
import { getSuggestedProducts } from "@/api/products";

type SuggestedProductsProps = {
	productCategorySlug: string;
};

export const SuggestedProducts: FC<SuggestedProductsProps> = async ({
	productCategorySlug,
}) => {
	const products = await getSuggestedProducts(productCategorySlug);
	return (
		<>
			<h3 className="mb-4 text-lg font-bold text-slate-800">
				Suggested products
			</h3>
			<div data-testid="related-products">
				<ProductList products={products} />
			</div>
		</>
	);
};
