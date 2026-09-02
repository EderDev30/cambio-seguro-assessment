<script setup lang="ts">
interface Props {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  loading: false,
  disabled: false,
  variant: "primary",
});

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    @click="$emit('click', $event)"
    :class="[
      'flex w-full items-center justify-center rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all focus:outline-none',
      variant === 'primary'
        ? 'bg-brand-purple hover:bg-opacity-90'
        : 'bg-gray-800 hover:bg-gray-900',
      'disabled:cursor-not-allowed disabled:opacity-70',
    ]"
  >
    <svg
      v-if="loading"
      class="mr-2 h-5 w-5 animate-spin text-white origin-center"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>

    <span v-if="props.loading">Procesando...</span>
    <slot v-else>
      {{ props.loading ? "Procesando..." : "Confirmar" }}
    </slot>
  </button>
</template>
