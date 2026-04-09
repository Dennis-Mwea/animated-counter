import type { ComputedRef } from 'vue';
import type { SpringColumnOptions, SpringColumnTransformResult } from '~/types';
export declare const useSpringColumnTransform: (targetY: ComputedRef<number>, options?: SpringColumnOptions) => SpringColumnTransformResult;
