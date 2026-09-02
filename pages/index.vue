<script setup lang="ts">
const amount = ref(100);
const fromCurrency = ref("USD");
const toCurrency = ref("PEN");
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const { result, loading, error, convert } = useCurrencyConverter();

async function convertCurrency() {
  await convert(amount.value, fromCurrency.value, toCurrency.value);
}

watch(
  [amount, fromCurrency, toCurrency],
  ([newAmount, newFrom, newTo], [oldAmount, oldFrom, oldTo]) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    if (!newAmount || newAmount <= 0) return;

    const currencyChanged = newFrom !== oldFrom || newTo !== oldTo;

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
</script>

<template>
  <section
    class="h-full w-full bg-gradient-to-r from-brand-purple-dark to-brand-purple text-white px-6 py-10 md:py-20 md:place-content-center"
  >
    <div
      class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2"
    >
      <div
        class="flex flex-col items-center text-center md:items-start md:text-left"
      >
        <h1 class="text-3xl font-bold leading-tight md:text-5xl">
          El mejor <br />
          tipo de cambio
        </h1>
        <p class="mt-2 text-sm md:text-base">
          para cambiar dólares y soles online en Perú
        </p>
      </div>

      <div class="flex justify-center md:justify-end">
        <div
          class="w-full max-w-[386px] rounded-xl bg-white p-6 text-gray-900 shadow-xl"
        >
          <CurrencyForm
            v-model:amount="amount"
            v-model:fromCurrency="fromCurrency"
            v-model:toCurrency="toCurrency"
            :result="result"
            :loading="loading"
            :error="error"
            @convert="convertCurrency"
          />
        </div>
      </div>
    </div>
  </section>
</template>
