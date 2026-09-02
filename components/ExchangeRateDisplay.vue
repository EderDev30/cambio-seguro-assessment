<script setup lang="ts">
defineProps<{
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number | null;
  loading?: boolean;
}>();
</script>

<template>
  <div class="border-b border-gray-100 text-center pb-3">
    <span class="text-xs text-gray-400 block font-medium mb-1">
      Tipo de cambio actual
    </span>

    <div class="flex items-center justify-center h-6">
      <div
        v-if="!exchangeRate"
        class="h-6 w-40 animate-pulse rounded bg-brand-purple/20"
      ></div>

      <span
        v-else
        class="text-base font-bold text-brand-purple transition-opacity duration-200"
        :class="{ 'opacity-40': loading }"
      >
        1 {{ fromCurrency }} = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}
      </span>
    </div>
  </div>
</template>
