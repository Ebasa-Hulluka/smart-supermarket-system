export function calculateTotal(items = []) {
  return items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  )
}
