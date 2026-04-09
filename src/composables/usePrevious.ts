import { ref, watch } from 'vue';

export const usePrevious = (value: number | null) => {
	const no = ref<number | null>(null);

	watch(() => value, () => (no.value = value));

	return no;
};
