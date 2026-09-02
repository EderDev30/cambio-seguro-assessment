<script setup lang="ts">
const props = defineProps<{
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: number | null;
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: "update:amount", value: number): void;
  (e: "update:fromCurrency", value: string): void;
  (e: "update:toCurrency", value: string): void;
  (e: "convert"): void;
}>();

const activeTab = ref<"buy" | "sell">(
  props.fromCurrency === "USD" ? "buy" : "sell",
);

function selectTab(type: "buy" | "sell") {
  activeTab.value = type;
  if (type === "buy") {
    emit("update:fromCurrency", "USD");
    emit("update:toCurrency", "PEN");
  } else {
    emit("update:fromCurrency", "PEN");
    emit("update:toCurrency", "USD");
  }
}

function toggleTab() {
  selectTab(activeTab.value === "buy" ? "sell" : "buy");
}
</script>

<template>
  <div class="space-y-4">
    <div
      class="grid grid-cols-2 border-b border-gray-100 text-center text-sm font-medium"
    >
      <button
        type="button"
        @click="selectTab('buy')"
        :class="[
          'pb-3 transition-colors',
          activeTab === 'buy'
            ? 'text-brand-purple border-b-2 border-brand-purple font-bold'
            : 'text-gray-400 hover:text-gray-600',
        ]"
      >
        Dólar compra <br />
        <span
          class="text-xs font-semibold"
          :class="activeTab === 'buy' ? 'text-brand-purple' : 'text-gray-400'"
        >
          3.9240
        </span>
      </button>

      <button
        type="button"
        @click="selectTab('sell')"
        :class="[
          'pb-3 transition-colors',
          activeTab === 'sell'
            ? 'text-brand-purple border-b-2 border-brand-purple font-bold'
            : 'text-gray-400 hover:text-gray-600',
        ]"
      >
        Dólar venta <br />
        <span
          class="text-xs font-semibold"
          :class="activeTab === 'sell' ? 'text-brand-purple' : 'text-gray-400'"
        >
          3.9450
        </span>
      </button>
    </div>

    <div class="relative space-y-3 pt-2">
      <CurrencyInput
        :value="amount"
        @update:value="$emit('update:amount', $event)"
        label="Envías"
        :currency-label="activeTab === 'buy' ? 'Dólares' : 'Soles'"
        :currency-symbol="activeTab === 'buy' ? '$' : 'S/'"
        :loading="loading"
      />

      <div
        class="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <button
          @click="toggleTab"
          type="button"
          class="flex h-[42px] w-[43px] items-center justify-center rounded-full bg-brand-purple text-white hover:bg-opacity-90 focus:outline-none"
          title="Invertir operación"
        >
          <IconSync />
        </button>
      </div>

      <CurrencyInput
        :value="result ?? 0"
        label="Recibes"
        :currency-label="activeTab === 'buy' ? 'Soles' : 'Dólares'"
        :currency-symbol="activeTab === 'buy' ? 'S/' : '$'"
        :editable="false"
      />
    </div>

    <div
      v-if="error"
      class="flex items-center space-x-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600"
    >
      <svg
        class="h-4 w-4 shrink-0 fill-current text-red-500"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ error }}</span>
    </div>

    <Button :loading="loading" @click="$emit('convert')">
      Iniciar operación
    </Button>
  </div>
</template>
