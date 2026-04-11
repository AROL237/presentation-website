export const formatedPrice = (amount: number) => {
  const price = new Intl.NumberFormat("fr-CM", {
    currency: "XAF",
    style: "currency",
  }).format(amount);
  return price;
};
