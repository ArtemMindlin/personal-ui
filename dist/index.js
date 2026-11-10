import e, { useCallback as t, useEffect as n, useState as r } from "react";
import { Menu as i, Moon as a, PanelLeft as o, Search as s, Sun as c, X as l } from "lucide-react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
// src/theme.ts
var f = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, p = "personal.theme";
function m(e = p) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function h(e, t = p) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function g(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function _(e = p) {
	let [t, i] = r(() => m(e)), [a, o] = r(() => g(m(e)));
	n(() => {
		if (h(t, e), o(g(t)), t === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [t, e]);
	let s = (t) => {
		i(t), h(t, e);
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
// src/components/Sidebar.tsx
function v({ brand: e, search: i, headerActions: a, children: c, bottom: f, bottomClassName: p = "row", onClose: m, collapsed: h, defaultCollapsed: g = !1, onToggleCollapse: _, enableShortcut: v = !0, storageKey: y, className: b = "", "aria-label": x = "Principal" }) {
	let S = h !== void 0, [C, w] = r(() => {
		if (y && typeof window < "u") try {
			let e = localStorage.getItem(y);
			if (e !== null) return e === "true";
		} catch {}
		return g;
	}), T = S ? h : C, E = t(() => {
		_ && _(), S || w((e) => {
			let t = !e;
			if (y && typeof window < "u") try {
				localStorage.setItem(y, String(t));
			} catch {}
			return t;
		});
	}, [
		S,
		_,
		y
	]);
	return n(() => {
		if (!v) return;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b" && (e.preventDefault(), E());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [v, E]), /* @__PURE__ */ d("aside", {
		className: [
			"sidebar",
			T ? "is-collapsed" : "",
			b
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d("div", {
				className: "sidebar-top",
				children: [
					/* @__PURE__ */ d("div", {
						className: "brand-row",
						children: [(() => {
							if (!e) return null;
							let t = e.as || (e.to || e.href ? "a" : "div"), n = {
								className: "brand",
								onClick: (t) => {
									e.onClick && (e.to || e.href && e.href !== "#" || t.preventDefault(), e.onClick(t));
								}
							};
							return e.href && (n.href = e.href), e.to && (n.to = e.to), /* @__PURE__ */ d(t, {
								...n,
								children: [e.logo && /* @__PURE__ */ u("span", {
									className: "brand-logo",
									children: e.logo
								}), /* @__PURE__ */ u("span", {
									className: "brand-name",
									children: e.title
								})]
							});
						})(), /* @__PURE__ */ d("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px"
							},
							children: [/* @__PURE__ */ u("button", {
								type: "button",
								className: "btn ghost sm icon collapse-btn",
								title: T ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
								"aria-label": T ? "Expandir barra lateral" : "Plegar barra lateral",
								"aria-expanded": !T,
								onClick: E,
								children: /* @__PURE__ */ u(o, { size: 16 })
							}), m && /* @__PURE__ */ u("button", {
								type: "button",
								className: "btn ghost sm icon sidebar-close-btn",
								onClick: m,
								"aria-label": "Cerrar menú",
								children: /* @__PURE__ */ u(l, { size: 16 })
							})]
						})]
					}),
					i && /* @__PURE__ */ d("div", {
						className: "sidebar-actions",
						children: [
							/* @__PURE__ */ d("div", {
								className: "search-box",
								onClick: i.onClick,
								role: i.onClick ? "button" : void 0,
								tabIndex: i.onClick ? 0 : void 0,
								children: [
									/* @__PURE__ */ u(s, { size: 14 }),
									/* @__PURE__ */ u("span", { children: i.placeholder || "Buscar" }),
									/* @__PURE__ */ u("span", {
										className: "kbd",
										children: i.shortcut || "/"
									})
								]
							}),
							/* @__PURE__ */ u("button", {
								type: "button",
								className: "btn ghost sm icon collapsed-only",
								title: i.title || `Buscar (${i.shortcut || "/"})`,
								"aria-label": i.placeholder || "Buscar",
								onClick: () => {
									T && E(), i.onClick?.();
								},
								children: /* @__PURE__ */ u(s, { size: 14 })
							}),
							i.action
						]
					}),
					a
				]
			}),
			/* @__PURE__ */ u("nav", {
				className: "sidebar-scroll",
				"aria-label": x,
				children: c
			}),
			f && /* @__PURE__ */ u("div", {
				className: ["sidebar-bottom", p].filter(Boolean).join(" "),
				children: f
			})
		]
	});
}
function y({ className: e = "", children: t }) {
	return /* @__PURE__ */ u("div", {
		className: [
			"sidebar-bottom",
			"row",
			e
		].filter(Boolean).join(" "),
		children: t
	});
}
function b({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ d("div", {
		className: ["sidebar-section", r].filter(Boolean).join(" "),
		children: [(e || t) && /* @__PURE__ */ d("div", {
			className: "sidebar-heading",
			children: [e && /* @__PURE__ */ u("span", { children: e }), t]
		}), n]
	});
}
// src/components/NavItem.tsx
function x({ label: e, icon: t, twisty: n, badge: r, active: i, onClick: a, href: o, to: s, as: c = o || s ? "a" : "button", className: l = "", title: f, style: p, children: m, ...h }) {
	let g = [
		"nav-item",
		i ? "active" : "",
		l
	].filter(Boolean).join(" "), _ = t ?? n, v = {
		className: g,
		onClick: a,
		title: f ?? (typeof e == "string" ? e : void 0),
		style: p,
		...h
	};
	return o && (v.href = o), s && (v.to = s), /* @__PURE__ */ d(c, {
		...v,
		children: [
			_ && /* @__PURE__ */ u("span", {
				className: "twisty",
				children: _
			}),
			/* @__PURE__ */ u("span", {
				className: "label",
				children: e
			}),
			r != null && /* @__PURE__ */ u("span", {
				className: "badge",
				children: r
			}),
			m
		]
	});
}
// src/components/MobileBar.tsx
function S({ title: e, logo: t, onToggleNav: n, actions: r, className: a = "mobile-bar" }) {
	return /* @__PURE__ */ d("div", {
		className: a,
		children: [
			/* @__PURE__ */ u("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ u(i, { size: 18 })
			}),
			t && /* @__PURE__ */ u("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ u("span", {
				className: "mobile-bar-title",
				children: e
			}),
			r && /* @__PURE__ */ u("div", {
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
// src/components/ThemeToggle.tsx
function C({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: i, cycleTheme: o } = _(e);
	return /* @__PURE__ */ u("button", {
		type: "button",
		className: t,
		onClick: o,
		title: `Tema: ${f[r]}`,
		"aria-label": `Cambiar tema (actual: ${f[r]})`,
		children: u(i ? a : c, { size: n })
	});
}
// src/components/Shell.tsx
function w({ sidebar: t, mobileBar: n, children: i, className: a = "", defaultNavOpen: o = !1 }) {
	let [s, c] = r(o), l = () => c(!1), f = () => c((e) => !e), p = typeof t == "function" ? t({ onClose: l }) : t;
	return /* @__PURE__ */ d("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			a
		].filter(Boolean).join(" "),
		children: [
			p,
			/* @__PURE__ */ u("div", {
				className: "scrim",
				onClick: l
			}),
			/* @__PURE__ */ d("div", {
				className: "main",
				children: [e.isValidElement(n) ? n : n ? /* @__PURE__ */ u(S, {
					title: n.title || "",
					logo: n.logo,
					actions: n.actions,
					onToggleNav: f
				}) : null, i]
			})
		]
	});
}
export { S as MobileBar, x as NavItem, w as Shell, v as Sidebar, y as SidebarBottom, b as SidebarSection, C as ThemeToggle, h as applyTheme, m as getTheme, g as isDarkActive, f as themeLabels, _ as useTheme };
