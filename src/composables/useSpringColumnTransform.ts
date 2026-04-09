import type { ComputedRef, CSSProperties } from 'vue';
import type { SpringColumnOptions, SpringColumnTransformResult } from '~/types';
import { computed, ref, useTemplateRef, watch, watchEffect } from 'vue';

const DAMPING = 22;
const MASS = 0.84;
const STIFFNESS = 328;
const REST_POS_EPS = 0.08;
const REST_VEL_EPS = 0.08;
const MAX_SUBSTEPS_PER_FRAME = 6;
const MAX_DT_SEC = 1 / 30;
const VELOCITY_BLEND_ON_RETARGET = 0.5;

let reducedMotionMql: MediaQueryList | null = null;

const getReducedMotion = (): boolean => {
	if (typeof window === 'undefined') return false;

	if (!reducedMotionMql) {
		reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
	}

	return reducedMotionMql.matches;
};
export const useSpringColumnTransform = (
		targetY: ComputedRef<number>,
		options?: SpringColumnOptions,
): SpringColumnTransformResult => {
	const velRef = ref(0);
	const rafRef = ref(0);
	const settleGenRef = ref(0);
	const posRef = ref(targetY.value);
	const targetRef = ref(targetY.value);
	const jsOwnsTransform = ref(false);
	const lastTimeRef = ref<number | null>(null);
	const columnRef = useTemplateRef<HTMLDivElement | null>('columnRef');

	const onSettledRef = options?.onSettled;
	const safeTarget = computed(() => Number.isFinite(targetY.value) ? targetY.value : 0);

	const onPropertiesChanged = () => {
		if (!jsOwnsTransform) return;

		const el = columnRef.value;
		if (!el) return;

		cancelAnimationFrame(rafRef.value);
		lastTimeRef.value = null;

		settleGenRef.value += 1;
		const settleGeneration = settleGenRef.value;

		const notifySettled = () => {
			if (settleGeneration === settleGenRef.value) {
				onSettledRef?.();
			}
		};

		if (getReducedMotion()) {
			const start = posRef.value;
			const t0 = performance.now();
			const durationMs = 260;

			const tick = (now: number) => {
				const t = Math.min(1, (now - t0) / durationMs);
				const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
				const x = start + (safeTarget.value - start) * eased;
				posRef.value = x;
				el.style.transform = `translate3d(0, ${x}px, 0)`;
				if (t >= 1) {
					posRef.value = safeTarget.value;
					velRef.value = 0;
					el.style.transform = `translate3d(0, ${safeTarget.value}px, 0)`;
					notifySettled();
					return;
				}
				rafRef.value = requestAnimationFrame(tick);
			};
			rafRef.value = requestAnimationFrame(tick);

			return () => cancelAnimationFrame(rafRef.value);
		}

		velRef.value *= VELOCITY_BLEND_ON_RETARGET;

		const tick = (now: number) => {
			const last = lastTimeRef.value;
			let dt = last == null ? 1 / 60 : (now - last) / 1000;
			lastTimeRef.value = now;
			dt = Math.min(dt, MAX_DT_SEC);

			let x = posRef.value;
			let v = velRef.value;
			const target = safeTarget.value;
			const steps = Math.min(
					MAX_SUBSTEPS_PER_FRAME,
					Math.max(1, Math.ceil(dt * 90)),
			);
			const subDt = dt / steps;

			for (let s = 0; s < steps; s++) {
				const disp = target - x;
				const a = (STIFFNESS * disp - DAMPING * v) / MASS;
				v += a * subDt;
				x += v * subDt;
			}

			posRef.value = x;
			velRef.value = v;
			el.style.transform = `translate3d(0, ${x}px, 0)`;

			if (
					Math.abs(target - x) < REST_POS_EPS
					&& Math.abs(v) < REST_VEL_EPS
			) {
				posRef.value = target;
				velRef.value = 0;
				el.style.transform = `translate3d(0, ${target}px, 0)`;
				notifySettled();
				return;
			}

			rafRef.value = requestAnimationFrame(tick);
		};

		rafRef.value = requestAnimationFrame(tick);
	};

	watchEffect(() => {
		if (jsOwnsTransform.value) return;

		const el = columnRef.value;
		if (!el) return;

		const t = Number.isFinite(targetRef.value) ? targetRef.value : 0;
		posRef.value = t;
		velRef.value = 0;
		el.style.transform = `translate3d(0, ${t}px, 0)`;
		jsOwnsTransform.value = true;
	});

	watchEffect(() => {
		if (!jsOwnsTransform.value) return;

		const el = columnRef.value;
		if (el) {
			el.style.transform = `translate3d(0, ${posRef.value}px, 0)`;
		}
	});

	watch(() => [safeTarget.value, jsOwnsTransform.value], onPropertiesChanged);

	const ssrTransformStyle = computed<CSSProperties | undefined>(() => {
		return jsOwnsTransform.value
				? undefined
				: { transform: `translate3d(0, ${safeTarget}px, 0)` };
	});

	return { ref: columnRef, ssrTransformStyle };
};
