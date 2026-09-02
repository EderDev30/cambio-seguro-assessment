<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value: number | string;
    label: string;
    currencyLabel: string;
    currencySymbol: string;
    editable?: boolean;
    loading?: boolean;
  }>(),
  {
    editable: true,
  },
);

const emit = defineEmits<{
  (e: "update:value", value: number): void;
}>();

const inputWidth = computed(() => {
  const strVal = String(props.value ?? "");
  const length = strVal.length || 1;
  return `${length}ch`;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emit("update:value", Number(target.value));
};
</script>

<template>
  <div
    class="flex min-h-[45px] min-w-[282px] items-stretch justify-between rounded-md border border-brand-purple overflow-hidden"
  >
    <div
      class="w-24 flex items-center bg-brand-bg px-5 font-bold text-sm text-brand-purple shrink-0 select-none"
    >
      {{ currencyLabel }}
    </div>

    <div
      class="flex flex-col justify-center items-end pr-4 pt-2 pb-[3px] flex-1 min-w-0 h-full"
    >
      <span class="text-xs text-content-secondary leading-none select-none">
        {{ label }}
      </span>

      <div
        class="flex items-center justify-end text-content-primary leading-none"
      >
        <span class="text-base font-medium mr-0.5 select-none leading-none">
          {{ currencySymbol }}
        </span>

        <input
          v-if="editable"
          :value="value"
          @input="handleInput"
          :disabled="loading"
          type="number"
          :style="{ width: inputWidth }"
          class="text-right text-base font-medium text-content-primary bg-transparent outline-none p-0 m-0 min-w-0 leading-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <span
          v-else
          class="text-right text-base font-medium text-content-primary leading-none"
        >
          {{ value }}
        </span>
      </div>
    </div>
  </div>
</template>
