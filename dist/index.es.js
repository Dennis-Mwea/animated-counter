import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, defineComponent as o, normalizeClass as s, normalizeStyle as c, openBlock as l, ref as u, renderList as d, toDisplayString as f, unref as p, useTemplateRef as m, watch as h, watchEffect as g } from "vue";
//#endregion
//#region src/components/DecimalColumn.vue
var _ = /* @__PURE__ */ o({
	__name: "DecimalColumn",
	props: {
		color: {},
		fontSize: {},
		isComma: { type: Boolean },
		digitStyles: {}
	},
	setup(e) {
		let n = e, r = t(() => ({
			color: n.color,
			fontSize: n.fontSize,
			lineHeight: n.fontSize,
			marginLeft: `calc(-${n.fontSize} / 10)`,
			...n.digitStyles
		}));
		return (t, n) => (l(), i("span", { style: c(r.value) }, f(e.isComma ? "," : "."), 5));
	}
}), v = 22, y = .84, b = 328, x = .08, S = .08, C = 6, w = 1 / 30, T = .5, E = null, D = () => typeof window > "u" ? !1 : (E ||= window.matchMedia("(prefers-reduced-motion: reduce)"), E.matches), O = (e, n) => {
	let r = u(0), i = u(0), a = u(0), o = u(e.value), s = u(e.value), c = u(!1), l = u(null), d = m("columnRef"), f = n?.onSettled, p = t(() => Number.isFinite(e.value) ? e.value : 0);
	return g(() => {
		if (c.value) return;
		let e = d.value;
		if (!e) return;
		let t = Number.isFinite(s.value) ? s.value : 0;
		o.value = t, r.value = 0, e.style.transform = `translate3d(0, ${t}px, 0)`, c.value = !0;
	}), g(() => {
		if (!c.value) return;
		let e = d.value;
		e && (e.style.transform = `translate3d(0, ${o.value}px, 0)`);
	}), h(() => [p.value, c.value], () => {
		if (!c) return;
		let e = d.value;
		if (!e) return;
		cancelAnimationFrame(i.value), l.value = null, a.value += 1;
		let t = a.value, n = () => {
			t === a.value && f?.();
		};
		if (D()) {
			let t = o.value, a = performance.now(), s = (c) => {
				let l = Math.min(1, (c - a) / 260), u = l < .5 ? 4 * l * l * l : 1 - (-2 * l + 2) ** 3 / 2, d = t + (p.value - t) * u;
				if (o.value = d, e.style.transform = `translate3d(0, ${d}px, 0)`, l >= 1) {
					o.value = p.value, r.value = 0, e.style.transform = `translate3d(0, ${p.value}px, 0)`, n();
					return;
				}
				i.value = requestAnimationFrame(s);
			};
			return i.value = requestAnimationFrame(s), () => cancelAnimationFrame(i.value);
		}
		r.value *= T;
		let s = (t) => {
			let a = l.value, c = a == null ? 1 / 60 : (t - a) / 1e3;
			l.value = t, c = Math.min(c, w);
			let u = o.value, d = r.value, f = p.value, m = Math.min(C, Math.max(1, Math.ceil(c * 90))), h = c / m;
			for (let e = 0; e < m; e++) {
				let e = (b * (f - u) - v * d) / y;
				d += e * h, u += d * h;
			}
			if (o.value = u, r.value = d, e.style.transform = `translate3d(0, ${u}px, 0)`, Math.abs(f - u) < x && Math.abs(d) < S) {
				o.value = f, r.value = 0, e.style.transform = `translate3d(0, ${f}px, 0)`, n();
				return;
			}
			i.value = requestAnimationFrame(s);
		};
		i.value = requestAnimationFrame(s);
	}), {
		ref: d,
		ssrTransformStyle: t(() => c.value ? void 0 : { transform: `translate3d(0, ${p}px, 0)` })
	};
}, k = /* @__PURE__ */ o({
	__name: "NumberColumn",
	props: {
		digitStyles: {},
		decrementColor: {},
		incrementColor: {},
		delta: {},
		fontSize: {},
		color: {},
		digit: {}
	},
	setup(n) {
		let o = n, m = [
			9,
			8,
			7,
			6,
			5,
			4,
			3,
			2,
			1,
			0
		], g = u(!1), _ = u(null), v = t(() => Number.parseInt(o.digit, 10)), y = t(() => Number.parseFloat(o.fontSize.replace("px", ""))), b = () => {
			_.value = "";
		}, x = t(() => ["ticker-column", _.value].filter(Boolean).join(" ")), { ref: S, ssrTransformStyle: C } = O(t(() => Number.isNaN(v.value) || Number.isNaN(y.value) ? 0 : y.value * v.value), {
			layoutClassName: x.value,
			onSettled: b
		}), w = t(() => ({
			lineHeight: o.fontSize,
			fontSize: o.fontSize,
			height: "auto",
			color: o.color,
			"--increment-color": `${o.incrementColor}`,
			"--decrement-color": `${o.decrementColor}`,
			...o.digitStyles
		})), T = t(() => ({
			lineHeight: o.fontSize,
			fontSize: o.fontSize,
			...o.digitStyles
		})), E = t(() => ({
			marginRight: `calc(${o.fontSize} / 5)`,
			lineHeight: o.fontSize,
			fontSize: o.fontSize,
			color: o.color,
			...o.digitStyles
		}));
		return h(() => [o.digit, o.delta], () => {
			if (!g.value) {
				g.value = !0;
				return;
			}
			_.value = o.delta ?? "";
		}), (t, o) => (l(), i(e, null, [n.digit === "-" ? (l(), i("span", {
			key: 0,
			style: c(E.value)
		}, f(n.digit), 5)) : r("", !0), a("div", {
			style: c(w.value),
			class: "ticker-column-container"
		}, [a("div", {
			ref_key: "columnRef",
			ref: S,
			class: s(x.value),
			style: c(p(C))
		}, [(l(), i(e, null, d(m, (e) => a("div", {
			key: e,
			class: "ticker-digit"
		}, [a("span", { style: c(T.value) }, f(e), 5)])), 64))], 6), o[0] ||= a("span", { class: "number-placeholder" }, "0", -1)], 4)], 64));
	}
}), A = (e) => {
	let t = u(null);
	return h(() => e, () => t.value = e), t;
}, j = (e, t, n, r) => {
	let i = t ? n : 0, a = Number.parseFloat(`${Math.max(e, 0)}`).toFixed(i);
	return (r ? Number.parseFloat(a).toLocaleString("en-US", { minimumFractionDigits: t ? n : 0 }) : a).split("").reverse();
}, M = /* @__PURE__ */ o({
	__name: "AnimatedCounter",
	props: {
		value: { default: 0 },
		fontSize: { default: "18px" },
		color: { default: "black" },
		incrementColor: { default: "#32cd32" },
		decrementColor: { default: "#fe6862" },
		includeDecimals: {
			type: Boolean,
			default: !0
		},
		decimalPrecision: { default: 2 },
		includeCommas: {
			type: Boolean,
			default: !1
		},
		digitStyles: { default: () => ({}) },
		containerStyles: { default: () => ({}) }
	},
	setup(a) {
		let o = a, s = u(), f = A(o.value), p = t(() => o.value < 0), m = t(() => s.value), g = t(() => j(Math.abs(o.value), o.includeDecimals, o.decimalPrecision, o.includeCommas)), v = t(() => {
			if (f.value !== null) {
				if (o.value > f.value) return "increase";
				if (o.value < f.value) return "decrease";
			}
			return null;
		}), y = t(() => g.value.map((e, t) => e === "." || e === "," ? null : m.value == null ? v.value : m.value[t] === e ? null : v.value));
		return h(g, () => {
			s.value = g.value;
		}), (t, o) => (l(), i("div", {
			style: c(a.containerStyles),
			class: "ticker-view"
		}, [(l(!0), i(e, null, d(g.value, (t, r) => (l(), i(e, { key: r }, [t === "." || t === "," ? (l(), n(_, {
			key: 0,
			"font-size": a.fontSize,
			color: a.color,
			"is-comma": t === ",",
			"digit-styles": a.digitStyles
		}, null, 8, [
			"font-size",
			"color",
			"is-comma",
			"digit-styles"
		])) : (l(), n(k, {
			key: 1,
			color: a.color,
			digit: t,
			"font-size": a.fontSize,
			"digit-styles": a.digitStyles,
			"increment-color": a.incrementColor,
			"decrement-color": a.decrementColor,
			delta: y.value[r] || ""
		}, null, 8, [
			"color",
			"digit",
			"font-size",
			"digit-styles",
			"increment-color",
			"decrement-color",
			"delta"
		]))], 64))), 128)), p.value ? (l(), n(k, {
			key: "negative-feedback",
			digit: "-",
			delta: v.value,
			color: a.color,
			"font-size": a.fontSize,
			"digit-styles": a.digitStyles,
			"increment-color": a.incrementColor,
			"decrement-color": a.decrementColor
		}, null, 8, [
			"delta",
			"color",
			"font-size",
			"digit-styles",
			"increment-color",
			"decrement-color"
		])) : r("", !0)], 4));
	}
});
//#endregion
export { M as AnimatedCounter };
