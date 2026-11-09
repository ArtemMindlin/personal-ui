import e, { useEffect as t, useState as n } from "react";
import { Menu as r, Moon as i, Sun as a, X as o } from "lucide-react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
// src/theme.ts
var l = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, u = "personal.theme";
function d(e = u) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function f(e, t = u) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function p(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function m(e = u) {
	let [r, i] = n(() => d(e)), [a, o] = n(() => p(d(e)));
	t(() => {
		if (f(r, e), o(p(r)), r === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [r, e]);
	let s = (t) => {
		i(t), f(t, e);
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
function h({ brand: e, headerActions: t, children: n, bottom: r, onClose: i, className: a = "" }) {
	return /* @__PURE__ */ c("aside", {
		className: ["sidebar", a].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ c("div", {
				className: "sidebar-top",
				children: [/* @__PURE__ */ c("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%"
					},
					children: [e && /* @__PURE__ */ c("a", {
						href: e.href || "#",
						className: "brand",
						onClick: (t) => {
							e.onClick && (t.preventDefault(), e.onClick());
						},
						children: [e.logo && /* @__PURE__ */ s("span", {
							className: "brand-logo",
							children: e.logo
						}), /* @__PURE__ */ s("span", { children: e.title })]
					}), i && /* @__PURE__ */ s("button", {
						type: "button",
						className: "btn ghost sm icon sidebar-close-btn",
						onClick: i,
						"aria-label": "Cerrar menú",
						children: /* @__PURE__ */ s(o, { size: 16 })
					})]
				}), t]
			}),
			/* @__PURE__ */ s("div", {
				className: "sidebar-scroll",
				children: n
			}),
			r && /* @__PURE__ */ s("div", {
				className: "sidebar-bottom",
				children: r
			})
		]
	});
}
// src/components/NavItem.tsx
function g({ label: e, icon: t, badge: n, active: r, onClick: i, href: a, to: o, as: l = a ? "a" : "button", className: u = "", title: d, children: f, ...p }) {
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
	return a && (m.href = a), o && (m.to = o), /* @__PURE__ */ c(l, {
		...m,
		children: [
			t && /* @__PURE__ */ s("span", {
				className: "icon",
				children: t
			}),
			/* @__PURE__ */ s("span", {
				className: "label",
				children: e
			}),
			n && /* @__PURE__ */ s("span", {
				className: "badge",
				children: n
			}),
			f
		]
	});
}
// src/components/MobileBar.tsx
function _({ title: e, logo: t, onToggleNav: n, actions: i, className: a = "mobile-bar" }) {
	return /* @__PURE__ */ c("div", {
		className: a,
		children: [
			/* @__PURE__ */ s("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ s(r, { size: 18 })
			}),
			t && /* @__PURE__ */ s("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ s("span", {
				className: "mobile-bar-title",
				children: e
			}),
			i && /* @__PURE__ */ s("div", {
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
function v({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: o, cycleTheme: c } = m(e);
	return /* @__PURE__ */ s("button", {
		type: "button",
		className: t,
		onClick: c,
		title: `Tema: ${l[r]}`,
		"aria-label": `Cambiar tema (actual: ${l[r]})`,
		children: s(o ? i : a, { size: n })
	});
}
// src/components/Shell.tsx
function y({ sidebar: t, mobileBar: r, children: i, className: a = "", defaultNavOpen: o = !1 }) {
	let [l, u] = n(o), d = () => u(!1), f = () => u((e) => !e), p = typeof t == "function" ? t({ onClose: d }) : t;
	return /* @__PURE__ */ c("div", {
		className: [
			"app",
			l ? "nav-open" : "",
			a
		].filter(Boolean).join(" "),
		children: [
			p,
			/* @__PURE__ */ s("div", {
				className: "scrim",
				onClick: d
			}),
			/* @__PURE__ */ c("div", {
				className: "main",
				children: [e.isValidElement(r) ? r : r ? /* @__PURE__ */ s(_, {
					title: r.title || "",
					logo: r.logo,
					actions: r.actions,
					onToggleNav: f
				}) : null, i]
			})
		]
	});
}
export { _ as MobileBar, g as NavItem, y as Shell, h as Sidebar, v as ThemeToggle, f as applyTheme, d as getTheme, p as isDarkActive, l as themeLabels, m as useTheme };
