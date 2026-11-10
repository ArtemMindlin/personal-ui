import e, { useCallback as t, useEffect as n, useState as r } from "react";
import { Menu as i, Moon as a, PanelLeft as o, Search as s, Settings as c, Sun as l, X as u } from "lucide-react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
// src/theme.ts
var m = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, h = "personal.theme";
function g(e = h) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function _(e, t = h) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function v(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function y(e = h) {
	let [t, i] = r(() => g(e)), [a, o] = r(() => v(g(e)));
	n(() => {
		if (_(t, e), o(v(t)), t === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [t, e]);
	let s = (t) => {
		i(t), _(t, e);
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
function b({ label: e, icon: t, twisty: n, badge: r, active: i, onClick: a, href: o, to: s, as: c = o || s ? "a" : "button", className: l = "", title: u, style: d, children: m, ...h }) {
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
	return o && (v.href = o), s && (v.to = s), /* @__PURE__ */ p(c, {
		...v,
		children: [
			_ && /* @__PURE__ */ f("span", {
				className: "twisty",
				children: _
			}),
			/* @__PURE__ */ f("span", {
				className: "label",
				children: e
			}),
			r != null && /* @__PURE__ */ f("span", {
				className: "badge",
				children: r
			}),
			m
		]
	});
}
// src/components/ThemeToggle.tsx
function x({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: i, cycleTheme: o } = y(e);
	return /* @__PURE__ */ f("button", {
		type: "button",
		className: t,
		onClick: o,
		title: `Tema: ${m[r]}`,
		"aria-label": `Cambiar tema (actual: ${m[r]})`,
		children: f(i ? a : l, { size: n })
	});
}
// src/components/Sidebar.tsx
function S({ brand: i, search: a, headerActions: l, children: m, footer: h, bottom: g, bottomClassName: _ = "row", onClose: v, collapsed: y, defaultCollapsed: S = !1, onToggleCollapse: C, enableShortcut: w = !0, storageKey: T, className: E = "", "aria-label": D = "Principal" }) {
	let O = y !== void 0, [k, A] = r(() => {
		if (T && typeof window < "u") try {
			let e = localStorage.getItem(T);
			if (e !== null) return e === "true";
		} catch {}
		return S;
	}), j = O ? y : k, M = t(() => {
		C && C(), O || A((e) => {
			let t = !e;
			if (T && typeof window < "u") try {
				localStorage.setItem(T, String(t));
			} catch {}
			return t;
		});
	}, [
		O,
		C,
		T
	]);
	return n(() => {
		if (!w) return;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b" && (e.preventDefault(), M());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [w, M]), /* @__PURE__ */ p("aside", {
		className: [
			"sidebar",
			j ? "is-collapsed" : "",
			E
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ p("div", {
				className: "sidebar-top",
				children: [
					/* @__PURE__ */ p("div", {
						className: "brand-row",
						children: [(() => {
							if (!i) return null;
							let e = i.as || (i.to || i.href ? "a" : "div"), t = {
								className: "brand",
								onClick: (e) => {
									i.onClick && (i.to || i.href && i.href !== "#" || e.preventDefault(), i.onClick(e));
								}
							};
							return i.href && (t.href = i.href), i.to && (t.to = i.to), /* @__PURE__ */ p(e, {
								...t,
								children: [i.logo && /* @__PURE__ */ f("span", {
									className: "brand-logo",
									children: i.logo
								}), /* @__PURE__ */ f("span", {
									className: "brand-name",
									children: i.title
								})]
							});
						})(), /* @__PURE__ */ p("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px"
							},
							children: [/* @__PURE__ */ f("button", {
								type: "button",
								className: "btn ghost sm icon collapse-btn",
								title: j ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
								"aria-label": j ? "Expandir barra lateral" : "Plegar barra lateral",
								"aria-expanded": !j,
								onClick: M,
								children: /* @__PURE__ */ f(o, { size: 16 })
							}), v && /* @__PURE__ */ f("button", {
								type: "button",
								className: "btn ghost sm icon sidebar-close-btn",
								onClick: v,
								"aria-label": "Cerrar menú",
								children: /* @__PURE__ */ f(u, { size: 16 })
							})]
						})]
					}),
					a && /* @__PURE__ */ p("div", {
						className: "sidebar-actions",
						children: [
							/* @__PURE__ */ p("div", {
								className: "search-box",
								onClick: a.onClick,
								role: a.onClick ? "button" : void 0,
								tabIndex: a.onClick ? 0 : void 0,
								children: [
									/* @__PURE__ */ f(s, { size: 14 }),
									/* @__PURE__ */ f("span", { children: a.placeholder || "Buscar" }),
									/* @__PURE__ */ f("span", {
										className: "kbd",
										children: a.shortcut || "/"
									})
								]
							}),
							/* @__PURE__ */ f("button", {
								type: "button",
								className: "btn ghost sm icon collapsed-only",
								title: a.title || `Buscar (${a.shortcut || "/"})`,
								"aria-label": a.placeholder || "Buscar",
								onClick: () => {
									j && M(), a.onClick?.();
								},
								children: /* @__PURE__ */ f(s, { size: 14 })
							}),
							a.action
						]
					}),
					l
				]
			}),
			/* @__PURE__ */ f("nav", {
				className: "sidebar-scroll",
				"aria-label": D,
				children: m
			}),
			(g || h) && /* @__PURE__ */ f("div", {
				className: ["sidebar-bottom", _].filter(Boolean).join(" "),
				children: (() => {
					if (g) return g;
					if (h) {
						let t = typeof h == "object" ? h : {}, n = t.to ?? (t.href ? void 0 : "/settings"), r = t.label ?? "Ajustes", i = t.icon ?? /* @__PURE__ */ f(c, { size: 14 });
						return /* @__PURE__ */ p(d, { children: [
							/* @__PURE__ */ f(b, {
								as: t.as || (n || t.href ? "a" : "button"),
								to: n,
								href: t.href,
								icon: i,
								label: r,
								active: t.active,
								onClick: t.onClick,
								style: { flex: 1 }
							}),
							t.themeToggle !== !1 && (e.isValidElement(t.themeToggle) ? t.themeToggle : /* @__PURE__ */ f(x, { storageKey: t.themeStorageKey })),
							t.extra
						] });
					}
					return null;
				})()
			})
		]
	});
}
function C({ className: e = "", children: t }) {
	return /* @__PURE__ */ f("div", {
		className: [
			"sidebar-bottom",
			"row",
			e
		].filter(Boolean).join(" "),
		children: t
	});
}
function w({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ p("div", {
		className: ["sidebar-section", r].filter(Boolean).join(" "),
		children: [(e || t) && /* @__PURE__ */ p("div", {
			className: "sidebar-heading",
			children: [e && /* @__PURE__ */ f("span", { children: e }), t]
		}), n]
	});
}
// src/components/MobileBar.tsx
function T({ title: e, logo: t, onToggleNav: n, actions: r, className: a = "mobile-bar" }) {
	return /* @__PURE__ */ p("div", {
		className: a,
		children: [
			/* @__PURE__ */ f("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ f(i, { size: 18 })
			}),
			t && /* @__PURE__ */ f("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ f("span", {
				className: "mobile-bar-title",
				children: e
			}),
			r && /* @__PURE__ */ f("div", {
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
function E({ sidebar: t, mobileBar: n, children: i, className: a = "", defaultNavOpen: o = !1 }) {
	let [s, c] = r(o), l = () => c(!1), u = () => c((e) => !e), d = typeof t == "function" ? t({ onClose: l }) : t;
	return /* @__PURE__ */ p("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			a
		].filter(Boolean).join(" "),
		children: [
			d,
			/* @__PURE__ */ f("div", {
				className: "scrim",
				onClick: l
			}),
			/* @__PURE__ */ p("div", {
				className: "main",
				children: [e.isValidElement(n) ? n : n ? /* @__PURE__ */ f(T, {
					title: n.title || "",
					logo: n.logo,
					actions: n.actions,
					onToggleNav: u
				}) : null, i]
			})
		]
	});
}
export { T as MobileBar, b as NavItem, E as Shell, S as Sidebar, C as SidebarBottom, w as SidebarSection, x as ThemeToggle, _ as applyTheme, g as getTheme, v as isDarkActive, m as themeLabels, y as useTheme };
