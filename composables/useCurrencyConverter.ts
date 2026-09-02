export interface ExchangeRateResponse {
  rate: number;
}

export function useCurrencyConverter() {
  const result = ref<number | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function convert(amount: number, from: string, to: string) {
    error.value = null;
    result.value = null;

    if (amount === null || amount === undefined || isNaN(amount)) {
      error.value = "Debe ingresar un monto válido";
      return;
    }

    if (amount <= 0) {
      error.value = "El monto debe ser mayor a 0";
      return;
    }

    if (!from || !to) {
      error.value = "Debe seleccionar una moneda de origen y destino";
      return;
    }

    loading.value = true;

    try {
      const response = await $fetch<ExchangeRateResponse>(
        "/api/exchange-rate",
        {
          query: {
            from,
            to,
          },
        },
      );

      if (!response || typeof response.rate !== "number") {
        throw new Error("Hubo un error al obtener la tasa de cambio");
      }

      result.value = amount * response.rate;
    } catch (err: any) {
      error.value =
        err?.data?.statusMessage ||
        err?.message ||
        "No pudimos conectar con el servicio de conversión de moneda";
    } finally {
      loading.value = false;
    }
  }

  return {
    result,
    loading,
    error,
    convert,
  };
}
