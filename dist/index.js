import e, { useEffect as t, useState as n } from "react";
import { Menu as r, Moon as i, PanelLeft as a, Sun as o, X as s } from "lucide-react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
// src/theme.ts
var u = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, d = "personal.theme";
function f(e = d) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function p(e, t = d) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function m(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function h(e = d) {
	let [r, i] = n(() => f(e)), [a, o] = n(() => m(f(e)));
	t(() => {
		if (p(r, e), o(m(r)), r === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [r, e]);
	let s = (t) => {
		i(t), p(t, e);
	};
	return {
		theme: r,
		isDark: a,
		setTheme: s,
		cycleTheme: () => {
			s({
				system: "light",
				light: "dark",
				dark: "system"
			}[r]);
		}
	};
}
// src/components/Sidebar.tsx
function g({ brand: e, headerActions: t, children: n, bottom: r, onClose: i, collapsed: o = !1, onToggleCollapse: u, className: d = "" }) {
	return /* @__PURE__ */ l("aside", {
		className: [
			"sidebar",
			o ? "is-collapsed" : "",
			d
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ l("div", {
				className: "sidebar-top",
				children: [/* @__PURE__ */ l("div", {
					className: "brand-row",
					children: [e && /* @__PURE__ */ l("a", {
						href: e.href || "#",
						className: "brand",
						onClick: (t) => {
							e.onClick && (t.preventDefault(), e.onClick());
						},
						children: [e.logo && /* @__PURE__ */ c("span", {
							className: "brand-logo",
							children: e.logo
						}), /* @__PURE__ */ c("span", {
							className: "brand-name",
							children: e.title
						})]
					}), /* @__PURE__ */ l("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "4px"
						},
						children: [u && /* @__PURE__ */ c("button", {
							type: "button",
							className: "btn ghost sm icon collapse-btn",
							title: o ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
							"aria-label": o ? "Expandir barra lateral" : "Plegar barra lateral",
							"aria-expanded": !o,
							onClick: u,
							children: /* @__PURE__ */ c(a, { size: 16 })
						}), i && /* @__PURE__ */ c("button", {
							type: "button",
							className: "btn ghost sm icon sidebar-close-btn",
							onClick: i,
							"aria-label": "Cerrar menú",
							children: /* @__PURE__ */ c(s, { size: 16 })
						})]
					})]
				}), t]
			}),
			/* @__PURE__ */ c("div", {
				className: "sidebar-scroll",
				children: n
			}),
			r && /* @__PURE__ */ c("div", {
				className: "sidebar-bottom",
				children: r
			})
		]
	});
}
// src/components/NavItem.tsx
function _({ label: e, icon: t, badge: n, active: r, onClick: i, href: a, to: o, as: s = a ? "a" : "button", className: u = "", title: d, children: f, ...p }) {
	let m = {
		className: [
			"nav-item",
			r ? "active" : "",
			u
		].filter(Boolean).join(" "),
		onClick: i,
		title: d,
		...p
	};
	return a && (m.href = a), o && (m.to = o), /* @__PURE__ */ l(s, {
		...m,
		children: [
			t && /* @__PURE__ */ c("span", {
				className: "icon",
				children: t
			}),
			/* @__PURE__ */ c("span", {
				className: "label",
				children: e
			}),
			n && /* @__PURE__ */ c("span", {
				className: "badge",
				children: n
			}),
			f
		]
	});
}
// src/components/MobileBar.tsx
function v({ title: e, logo: t, onToggleNav: n, actions: i, className: a = "mobile-bar" }) {
	return /* @__PURE__ */ l("div", {
		className: a,
		children: [
			/* @__PURE__ */ c("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ c(r, { size: 18 })
			}),
			t && /* @__PURE__ */ c("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ c("span", {
				className: "mobile-bar-title",
				children: e
			}),
			i && /* @__PURE__ */ c("div", {
				className: "mobile-bar-actions",
				style: {
					marginLeft: "auto",
					display: "flex",
					gap: 6
				},
				children: i
			})
		]
	});
}
// src/components/ThemeToggle.tsx
function y({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: a, cycleTheme: s } = h(e);
	return /* @__PURE__ */ c("button", {
		type: "button",
		className: t,
		onClick: s,
		title: `Tema: ${u[r]}`,
		"aria-label": `Cambiar tema (actual: ${u[r]})`,
		children: c(a ? i : o, { size: n })
	});
}
// src/components/Shell.tsx
function b({ sidebar: t, mobileBar: r, children: i, className: a = "", defaultNavOpen: o = !1 }) {
	let [s, u] = n(o), d = () => u(!1), f = () => u((e) => !e), p = typeof t == "function" ? t({ onClose: d }) : t;
	return /* @__PURE__ */ l("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			a
		].filter(Boolean).join(" "),
		children: [
			p,
			/* @__PURE__ */ c("div", {
				className: "scrim",
				onClick: d
			}),
			/* @__PURE__ */ l("div", {
				className: "main",
				children: [e.isValidElement(r) ? r : r ? /* @__PURE__ */ c(v, {
					title: r.title || "",
					logo: r.logo,
					actions: r.actions,
					onToggleNav: f
				}) : null, i]
			})
		]
	});
}
export { v as MobileBar, _ as NavItem, b as Shell, g as Sidebar, y as ThemeToggle, p as applyTheme, f as getTheme, m as isDarkActive, u as themeLabels, h as useTheme };
