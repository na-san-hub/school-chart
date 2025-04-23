/**
 * 価格を日本語形式でフォーマットする
 * @example formatPrice(123456) => "123,456"
 */
export const formatPrice = (price: number): string =>
  price.toLocaleString("ja-JP");
