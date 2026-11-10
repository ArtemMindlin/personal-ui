import e, { useCallback as t, useEffect as n, useRef as r, useState as i } from "react";
import { Menu as a, Moon as o, PanelLeft as s, Search as c, Settings as l, Sun as u, X as d } from "lucide-react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
// src/theme.ts
var h = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, g = "personal.theme";
function _(e = g) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function v(e, t = g) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function y(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function b(e = g) {
	let [t, r] = i(() => _(e)), [a, o] = i(() => y(_(e)));
	n(() => {
		if (v(t, e), o(y(t)), t === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [t, e]);
	let s = (t) => {
		r(t), v(t, e);
	};
	return {
		theme: t,
		isDark: a,
		setTheme: s,
		cycleTheme: () => {
			s({
				system: "light",
				light: "dark",
				dark: "system"
			}[t]);
		}
	};
}
// src/components/NavItem.tsx
function x({ label: e, icon: t, twisty: n, badge: r, active: i, onClick: a, href: o, to: s, as: c = o || s ? "a" : "button", className: l = "", title: u, style: d, children: f, ...h }) {
	let g = [
		"nav-item",
		i ? "active" : "",
		l
	].filter(Boolean).join(" "), _ = t ?? n, v = {
		className: g,
		onClick: a,
		title: u ?? (typeof e == "string" ? e : void 0),
		style: d,
		...h
	};
	return o && (v.href = o), s && (v.to = s), /* @__PURE__ */ m(c, {
		...v,
		children: [
			_ && /* @__PURE__ */ p("span", {
				className: "twisty",
				children: _
			}),
			/* @__PURE__ */ p("span", {
				className: "label",
				children: e
			}),
			r != null && /* @__PURE__ */ p("span", {
				className: "badge",
				children: r
			}),
			f
		]
	});
}
// src/components/ThemeToggle.tsx
function S({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: i, cycleTheme: a } = b(e);
	return /* @__PURE__ */ p("button", {
		type: "button",
		className: t,
		onClick: a,
		title: `Tema: ${h[r]}`,
		"aria-label": `Cambiar tema (actual: ${h[r]})`,
		children: p(i ? o : u, { size: n })
	});
}
// src/components/Sidebar.tsx
function C({ brand: a, search: o, headerActions: u, children: h, footer: g, bottom: _, bottomClassName: v = "row", onClose: y, collapsed: b, defaultCollapsed: C = !1, onToggleCollapse: w, enableShortcut: T = !0, storageKey: E, className: D = "", "aria-label": O = "Principal" }) {
	let k = b !== void 0, [A, j] = i(() => {
		if (E && typeof window < "u") try {
			let e = localStorage.getItem(E);
			if (e !== null) return e === "true";
		} catch {}
		return C;
	}), M = k ? b : A, N = r(null), P = r(!1), F = o?.shortcut ?? "/", I = !!o?.onChange, L = !!(o && (I || o.onClick)), R = t(() => {
		w && w(), k || j((e) => {
			let t = !e;
			if (E && typeof window < "u") try {
				localStorage.setItem(E, String(t));
			} catch {}
			return t;
		});
	}, [
		k,
		w,
		E
	]), z = t(() => {
		M && (P.current = I, R()), I ? M || N.current?.focus() : o?.onClick?.();
	}, [
		I,
		M,
		R,
		o?.onClick
	]);
	return n(() => {
		!M && P.current && (P.current = !1, N.current?.focus());
	}, [M]), n(() => {
		if (!L || !F) return;
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.key !== F) return;
			let t = e.target;
			t instanceof HTMLElement && (t.isContentEditable || t.closest("input, textarea, select, [contenteditable]:not([contenteditable=\"false\"]), [role=\"textbox\"]")) || (e.preventDefault(), z());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		L,
		F,
		z
	]), n(() => {
		if (!T) return;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b" && (e.preventDefault(), R());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [T, R]), /* @__PURE__ */ m("aside", {
		className: [
			"sidebar",
			M ? "is-collapsed" : "",
			D
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ m("div", {
				className: "sidebar-top",
				children: [
					/* @__PURE__ */ m("div", {
						className: "brand-row",
						children: [(() => {
							if (!a) return null;
							let e = a.as || (a.to || a.href ? "a" : "div"), t = {
								className: "brand",
								onClick: (e) => {
									a.onClick && (a.to || a.href && a.href !== "#" || e.preventDefault(), a.onClick(e));
								}
							};
							return a.href && (t.href = a.href), a.to && (t.to = a.to), /* @__PURE__ */ m(e, {
								...t,
								children: [a.logo && /* @__PURE__ */ p("span", {
									className: "brand-logo",
									children: a.logo
								}), /* @__PURE__ */ p("span", {
									className: "brand-name",
									children: a.title
								})]
							});
						})(), /* @__PURE__ */ m("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px"
							},
							children: [/* @__PURE__ */ p("button", {
								type: "button",
								className: "btn ghost sm icon collapse-btn",
								title: M ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
								"aria-label": M ? "Expandir barra lateral" : "Plegar barra lateral",
								"aria-expanded": !M,
								onClick: R,
								children: /* @__PURE__ */ p(s, { size: 16 })
							}), y && /* @__PURE__ */ p("button", {
								type: "button",
								className: "btn ghost sm icon sidebar-close-btn",
								onClick: y,
								"aria-label": "Cerrar menú",
								children: /* @__PURE__ */ p(d, { size: 16 })
							})]
						})]
					}),
					o && /* @__PURE__ */ m("div", {
						className: "sidebar-actions",
						children: [
							I ? /* @__PURE__ */ m("label", {
								className: "search-box",
								children: [
									/* @__PURE__ */ p(c, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ p("input", {
										ref: N,
										type: "search",
										"aria-label": o.title || o.placeholder || "Buscar",
										placeholder: o.placeholder || "Buscar",
										value: o.value,
										onChange: (e) => o.onChange?.(e.target.value)
									}),
									F && /* @__PURE__ */ p("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: F
									})
								]
							}) : /* @__PURE__ */ m("button", {
								type: "button",
								className: "search-box",
								onClick: o.onClick,
								title: o.title,
								disabled: !o.onClick,
								children: [
									/* @__PURE__ */ p(c, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ p("span", { children: o.placeholder || "Buscar" }),
									F && /* @__PURE__ */ p("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: F
									})
								]
							}),
							/* @__PURE__ */ p("button", {
								type: "button",
								className: "btn ghost sm icon collapsed-only",
								title: o.title || (F ? `Buscar (${F})` : "Buscar"),
								"aria-label": o.title || o.placeholder || "Buscar",
								disabled: !I && !o.onClick,
								onClick: z,
								children: /* @__PURE__ */ p(c, { size: 14 })
							}),
							o.action
						]
					}),
					u
				]
			}),
			/* @__PURE__ */ p("nav", {
				className: "sidebar-scroll",
				"aria-label": O,
				children: h
			}),
			(_ || g) && /* @__PURE__ */ p("div", {
				className: ["sidebar-bottom", v].filter(Boolean).join(" "),
				children: (() => {
					if (_) return _;
					if (g) {
						let t = typeof g == "object" ? g : {}, n = t.to ?? (t.href ? void 0 : "/settings"), r = t.label ?? "Ajustes", i = t.icon ?? /* @__PURE__ */ p(l, { size: 14 });
						return /* @__PURE__ */ m(f, { children: [
							/* @__PURE__ */ p(x, {
								as: t.as || (n || t.href ? "a" : "button"),
								to: n,
								href: t.href,
								icon: i,
								label: r,
								active: t.active,
								onClick: t.onClick,
								style: { flex: 1 }
							}),
							t.themeToggle !== !1 && (e.isValidElement(t.themeToggle) ? t.themeToggle : /* @__PURE__ */ p(S, { storageKey: t.themeStorageKey })),
							t.extra
						] });
					}
					return null;
				})()
			})
		]
	});
}
function w({ className: e = "", children: t }) {
	return /* @__PURE__ */ p("div", {
		className: [
			"sidebar-bottom",
			"row",
			e
		].filter(Boolean).join(" "),
		children: t
	});
}
function T({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ m("div", {
		className: ["sidebar-section", r].filter(Boolean).join(" "),
		children: [(e || t) && /* @__PURE__ */ m("div", {
			className: "sidebar-heading",
			children: [e && /* @__PURE__ */ p("span", { children: e }), t]
		}), n]
	});
}
// src/components/MobileBar.tsx
function E({ title: e, logo: t, onToggleNav: n, actions: r, className: i = "mobile-bar" }) {
	return /* @__PURE__ */ m("div", {
		className: i,
		children: [
			/* @__PURE__ */ p("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ p(a, { size: 18 })
			}),
			t && /* @__PURE__ */ p("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ p("span", {
				className: "mobile-bar-title",
				children: e
			}),
			r && /* @__PURE__ */ p("div", {
				className: "mobile-bar-actions",
				style: {
					marginLeft: "auto",
					display: "flex",
					gap: 6
				},
				children: r
			})
		]
	});
}
// src/components/Shell.tsx
function D({ sidebar: t, mobileBar: n, children: r, className: a = "", defaultNavOpen: o = !1 }) {
	let [s, c] = i(o), l = () => c(!1), u = () => c((e) => !e), d = typeof t == "function" ? t({ onClose: l }) : t;
	return /* @__PURE__ */ m("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			a
		].filter(Boolean).join(" "),
		children: [
			d,
			/* @__PURE__ */ p("div", {
				className: "scrim",
				onClick: l
			}),
			/* @__PURE__ */ m("div", {
				className: "main",
				children: [e.isValidElement(n) ? n : n ? /* @__PURE__ */ p(E, {
					title: n.title || "",
					logo: n.logo,
					actions: n.actions,
					onToggleNav: u
				}) : null, r]
			})
		]
	});
}
export { E as MobileBar, x as NavItem, D as Shell, C as Sidebar, w as SidebarBottom, T as SidebarSection, S as ThemeToggle, v as applyTheme, _ as getTheme, y as isDarkActive, h as themeLabels, b as useTheme };
