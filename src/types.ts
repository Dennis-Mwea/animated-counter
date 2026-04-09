import type { ComputedRef, CSSProperties, Ref } from 'vue';

export interface AnimatedCounterProps {
	value?: number;
	fontSize?: string;
	color?: string;
	incrementColor?: string;
	decrementColor?: string;
	includeDecimals?: boolean;
	decimalPrecision?: number;
	includeCommas?: boolean;
	digitStyles?: CSSProperties;
	containerStyles?: CSSProperties;
}

export interface DecimalColumnProps {
	color: string;
	fontSize: string;
	isComma: boolean;
	digitStyles: CSSProperties;
}

export interface NumberColumnProps {
	digitStyles: CSSProperties;
	decrementColor: string;
	incrementColor: string;
	delta: string | null;
	fontSize: string;
	color: string;
	digit: string;
}

export interface SpringColumnOptions {
	onSettled?: () => void;
	layoutClassName?: string;
}

export interface SpringColumnTransformResult {
	ssrTransformStyle?: ComputedRef<CSSProperties | undefined>;
	ref: Ref<HTMLDivElement | null>;
}
