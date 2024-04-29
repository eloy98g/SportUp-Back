export default function getPrice(str: string) {
  if (str) {
    str = str.replace("€", "").trim();
    if (str.includes("-")) {
      const [minStr, maxStr] = str.split("-");
      const min = parseInt(minStr) * 100;
      const max = parseInt(maxStr) * 100;
      return {
        min: isNaN(min) ? undefined : min,
        max: isNaN(max) ? undefined : max,
      };
    } else if (str.includes("+")) {
      const minStr = str.replace("+", "");
      const min = parseInt(minStr) * 100;
      return { min: isNaN(min) ? undefined : min, max: 99999 };
    } else {
      const precio = parseInt(str) * 100;
      return {
        min: isNaN(precio) ? undefined : precio,
        max: isNaN(precio) ? undefined : precio,
      };
    }
  } else {
    return {
      min: null,
      max: null,
    };
  }
}
