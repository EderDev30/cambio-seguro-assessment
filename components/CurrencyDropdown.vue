<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface CurrencyOption {
  code: string;
  name: string;
}

const props = defineProps<{
  modelValue: string;
  currencies: CurrencyOption[];
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", code: string): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentCurrency = computed(() => {
  return (
    props.currencies.find((c) => c.code === props.modelValue) || {
      code: props.modelValue,
      name: props.modelValue,
    }
  );
});

function selectCurrency(code: string) {
  emit("update:modelValue", code);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative w-28 bg-brand-bg rounded-l-md shrink-0"
  >
    <button
      type="button"
      @click="isOpen = !isOpen"
      :disabled="disabled"
      class="w-full h-full flex items-center justify-between px-3.5 font-bold text-sm text-brand-purple outline-none focus:outline-none disabled:cursor-not-allowed select-none"
    >
      <span class="truncate">{{ currentCurrency.name }}</span>

      <svg
        class="h-4 w-4 fill-current text-brand-purple transition-transform duration-200 shrink-0 ml-1"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 top-[calc(100%+6px)] z-50 w-36 rounded-lg bg-white p-1.5 shadow-2xl border border-gray-100 transition-all duration-150"
    >
      <button
        v-for="c in currencies"
        :key="c.code"
        type="button"
        @click="selectCurrency(c.code)"
        :class="[
          'w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between',
          c.code === modelValue
            ? 'bg-brand-purple/10 text-brand-purple font-bold'
            : 'text-gray-700 hover:bg-gray-50 hover:text-brand-purple font-medium',
        ]"
      >
        <span>{{ c.name }}</span>
        <span class="text-xs text-gray-400 font-normal">{{ c.code }}</span>
      </button>
    </div>
  </div>
</template>
