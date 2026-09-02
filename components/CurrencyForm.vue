<script setup lang="ts">
import { ref, watch, computed } from "vue";

const currencies = [
  { code: "USD", name: "Dólares", symbol: "$" },
  { code: "PEN", name: "Soles", symbol: "S/" },
  { code: "EUR", name: "Euros", symbol: "€" },
];

const amount = ref(100);
const fromCurrency = ref("USD");
const toCurrency = ref("PEN");
const exchangeRate = ref<number | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const { result, loading, error, convert, rate } = useCurrencyConverter();

async function convertCurrency() {
  await convert(amount.value, fromCurrency.value, toCurrency.value);

  if (rate?.value) {
    exchangeRate.value = rate.value;
  }
}

function handleFromChange(newCurrency: string) {
  if (newCurrency === toCurrency.value) {
    toCurrency.value = fromCurrency.value;
  }
  fromCurrency.value = newCurrency;
}

function handleToChange(newCurrency: string) {
  if (newCurrency === fromCurrency.value) {
    fromCurrency.value = toCurrency.value;
  }
  toCurrency.value = newCurrency;
}

watch(
  [amount, fromCurrency, toCurrency],
  ([newAmount], [, oldFrom, oldTo]) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (!newAmount || newAmount <= 0) {
      if (result) result.value = 0;
      return;
    }

    const currencyChanged =
      oldFrom !== undefined &&
      (fromCurrency.value !== oldFrom || toCurrency.value !== oldTo);

    if (currencyChanged) {
      convertCurrency();
    } else {
      debounceTimer = setTimeout(() => {
        convertCurrency();
      }, 500);
    }
  },
  { immediate: true },
);

const fromSymbol = computed(
  () => currencies.find((c) => c.code === fromCurrency.value)?.symbol || "$",
);
const toSymbol = computed(
  () => currencies.find((c) => c.code === toCurrency.value)?.symbol || "S/",
);

function handleSwap() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
}
</script>

<template>
  <div class="space-y-4">
    <ExchangeRateDisplay
      :from-currency="fromCurrency"
      :to-currency="toCurrency"
      :exchange-rate="exchangeRate"
      :loading="loading"
    />

    <div class="relative space-y-3 pt-2">
      <CurrencyInput
        v-model:value="amount"
        :currency="fromCurrency"
        @update:currency="handleFromChange"
        :currencies="currencies"
        label="Envías"
        :currency-symbol="fromSymbol"
      />

      <div
        class="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <button
          @click="handleSwap"
          type="button"
          class="flex h-[42px] w-[43px] items-center justify-center rounded-full bg-brand-purple text-white hover:bg-opacity-90 focus:outline-none"
          title="Invertir operación"
        >
          <IconSync />
        </button>
      </div>

      <CurrencyInput
        :value="result ?? 0"
        :currency="toCurrency"
        @update:currency="handleToChange"
        :currencies="currencies"
        label="Recibes"
        :currency-symbol="toSymbol"
        :editable="false"
      />
    </div>

    <div
      v-if="error"
      class="flex items-center space-x-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600"
    >
      <span>{{ error }}</span>
    </div>

    <Button :loading="loading" @click="convertCurrency">
      Iniciar operación
    </Button>
  </div>
</template>
