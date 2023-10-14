export const formatMoney = (numberToFormat: number) => {
	return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(
		numberToFormat,
	);
};
