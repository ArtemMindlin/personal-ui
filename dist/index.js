import e, { useCallback as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { Menu as o, Moon as s, PanelLeft as c, Search as l, Settings as u, Sun as d, X as f } from "lucide-react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
// src/theme.ts
var g = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, _ = "personal.theme";
function v(e = _) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function y(e, t = _) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function b(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function x(e = _) {
	let [t, r] = a(() => v(e)), [i, o] = a(() => b(v(e)));
	n(() => {
		if (y(t, e), o(b(t)), t === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [t, e]);
	let s = (t) => {
		r(t), y(t, e);
	};
	return {
		theme: t,
		isDark: i,
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
function S({ label: e, icon: t, twisty: n, badge: r, active: i, onClick: a, href: o, to: s, as: c = o || s ? "a" : "button", className: l = "", title: u, style: d, children: f, ...p }) {
	let g = [
		"nav-item",
		i ? "active" : "",
		l
	].filter(Boolean).join(" "), _ = t ?? n, v = {
		className: g,
		onClick: a,
		title: u ?? (typeof e == "string" ? e : void 0),
		style: d,
		...p
	};
	return o && (v.href = o), s && (v.to = s), /* @__PURE__ */ h(c, {
		...v,
		children: [
			_ && /* @__PURE__ */ m("span", {
				className: "twisty",
				children: _
			}),
			/* @__PURE__ */ m("span", {
				className: "label",
				children: e
			}),
			r != null && /* @__PURE__ */ m("span", {
				className: "badge",
				children: r
			}),
			f
		]
	});
}
// src/components/ThemeToggle.tsx
function C({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: i, cycleTheme: a } = x(e);
	return /* @__PURE__ */ m("button", {
		type: "button",
		className: t,
		onClick: a,
		title: `Tema: ${g[r]}`,
		"aria-label": `Cambiar tema (actual: ${g[r]})`,
		children: m(i ? s : d, { size: n })
	});
}
// src/components/Sidebar.tsx
function w({ brand: r, search: o, headerActions: s, children: d, footer: g, bottom: _, bottomClassName: v = "row", onClose: y, collapsed: b, defaultCollapsed: x = !1, onToggleCollapse: w, enableShortcut: T = !0, enableSearchShortcut: E = !0, sidebarRef: D, asideProps: O, storageKey: k, className: A = "", "aria-label": j = "Principal" }) {
	let M = b !== void 0, [N, P] = a(() => {
		if (k && typeof window < "u") try {
			let e = localStorage.getItem(k);
			if (e !== null) return e === "true";
		} catch {}
		return x;
	}), F = M ? b : N, I = i(null), L = i(!1), R = o?.shortcut ?? "/", z = !!o?.onChange, B = !!(o && (z || o.onClick)), V = t(() => {
		w && w(), M || P((e) => {
			let t = !e;
			if (k && typeof window < "u") try {
				localStorage.setItem(k, String(t));
			} catch {}
			return t;
		});
	}, [
		M,
		w,
		k
	]), H = t(() => {
		F && (L.current = z, V()), z ? F || I.current?.focus() : o?.onClick?.();
	}, [
		z,
		F,
		V,
		o?.onClick
	]);
	n(() => {
		!F && L.current && (L.current = !1, I.current?.focus());
	}, [F]), n(() => {
		if (!E || !B || !R) return;
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.key !== R) return;
			let t = e.target;
			t instanceof HTMLElement && (t.isContentEditable || t.closest("input, textarea, select, [contenteditable]:not([contenteditable=\"false\"]), [role=\"textbox\"]")) || (e.preventDefault(), H());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		E,
		B,
		R,
		H
	]), n(() => {
		if (!T) return;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b" && (e.preventDefault(), V());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [T, V]);
	let U = () => {
		if (!r) return null;
		let e = r.as || (r.to || r.href ? "a" : "div"), t = {
			className: "brand",
			onClick: (e) => {
				r.onClick && (r.to || r.href && r.href !== "#" || e.preventDefault(), r.onClick(e));
			}
		};
		return r.href && (t.href = r.href), r.to && (t.to = r.to), /* @__PURE__ */ h(e, {
			...t,
			children: [r.logo && /* @__PURE__ */ m("span", {
				className: "brand-logo",
				children: r.logo
			}), /* @__PURE__ */ m("span", {
				className: "brand-name",
				children: r.title
			})]
		});
	}, W = () => {
		if (_) return _;
		if (g) {
			let t = typeof g == "object" ? g : {}, n = t.to ?? (t.href ? void 0 : "/settings"), r = t.label ?? "Ajustes", i = t.icon ?? /* @__PURE__ */ m(u, { size: 14 });
			return /* @__PURE__ */ h(p, { children: [
				/* @__PURE__ */ m(S, {
					as: t.as || (n || t.href ? "a" : "button"),
					to: n,
					href: t.href,
					icon: i,
					label: r,
					active: t.active,
					onClick: t.onClick,
					style: { flex: 1 }
				}),
				t.themeToggle !== !1 && (e.isValidElement(t.themeToggle) ? t.themeToggle : /* @__PURE__ */ m(C, { storageKey: t.themeStorageKey })),
				t.extra
			] });
		}
		return null;
	};
	return /* @__PURE__ */ h("aside", {
		...O,
		ref: D,
		className: [
			"sidebar",
			F ? "is-collapsed" : "",
			A
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ h("div", {
				className: "sidebar-top",
				children: [
					/* @__PURE__ */ h("div", {
						className: "brand-row",
						children: [U(), /* @__PURE__ */ h("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px"
							},
							children: [/* @__PURE__ */ m("button", {
								type: "button",
								className: "btn ghost sm icon collapse-btn",
								title: F ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
								"aria-label": F ? "Expandir barra lateral" : "Plegar barra lateral",
								"aria-expanded": !F,
								onClick: V,
								children: /* @__PURE__ */ m(c, { size: 16 })
							}), y && /* @__PURE__ */ m("button", {
								type: "button",
								className: "btn ghost sm icon sidebar-close-btn",
								onClick: y,
								"aria-label": "Cerrar menú",
								children: /* @__PURE__ */ m(f, { size: 16 })
							})]
						})]
					}),
					o && /* @__PURE__ */ h("div", {
						className: "sidebar-actions",
						children: [
							z ? /* @__PURE__ */ h("label", {
								className: "search-box",
								children: [
									/* @__PURE__ */ m(l, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ m("input", {
										ref: I,
										type: "search",
										"aria-label": o.title || o.placeholder || "Buscar",
										placeholder: o.placeholder || "Buscar",
										value: o.value,
										onChange: (e) => o.onChange?.(e.target.value)
									}),
									R && /* @__PURE__ */ m("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: R
									})
								]
							}) : /* @__PURE__ */ h("button", {
								type: "button",
								className: "search-box",
								onClick: o.onClick,
								title: o.title,
								disabled: !o.onClick,
								children: [
									/* @__PURE__ */ m(l, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ m("span", { children: o.placeholder || "Buscar" }),
									R && /* @__PURE__ */ m("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: R
									})
								]
							}),
							/* @__PURE__ */ m("button", {
								type: "button",
								className: "btn ghost sm icon collapsed-only",
								title: o.title || (R ? `Buscar (${R})` : "Buscar"),
								"aria-label": o.title || o.placeholder || "Buscar",
								disabled: !z && !o.onClick,
								onClick: H,
								children: /* @__PURE__ */ m(l, { size: 14 })
							}),
							o.action
						]
					}),
					s
				]
			}),
			/* @__PURE__ */ m("nav", {
				className: "sidebar-scroll",
				"aria-label": j,
				children: d
			}),
			(_ || g) && /* @__PURE__ */ m("div", {
				className: ["sidebar-bottom", v].filter(Boolean).join(" "),
				children: W()
			})
		]
	});
}
function T({ className: e = "", children: t }) {
	return /* @__PURE__ */ m("div", {
		className: [
			"sidebar-bottom",
			"row",
			e
		].filter(Boolean).join(" "),
		children: t
	});
}
function E({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ h("div", {
		className: ["sidebar-section", r].filter(Boolean).join(" "),
		children: [(e || t) && /* @__PURE__ */ h("div", {
			className: "sidebar-heading",
			children: [e && /* @__PURE__ */ m("span", { children: e }), t]
		}), n]
	});
}
// src/components/MobileBar.tsx
function D({ title: e, logo: t, onToggleNav: n, actions: r, className: i = "mobile-bar" }) {
	return /* @__PURE__ */ h("div", {
		className: i,
		children: [
			/* @__PURE__ */ m("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ m(o, { size: 18 })
			}),
			t && /* @__PURE__ */ m("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ m("span", {
				className: "mobile-bar-title",
				children: e
			}),
			r && /* @__PURE__ */ m("div", {
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
function O({ sidebar: t, mobileBar: n, children: r, className: i = "", defaultNavOpen: o = !1 }) {
	let [s, c] = a(o), l = () => c(!1), u = () => c((e) => !e), d = typeof t == "function" ? t({ onClose: l }) : t;
	return /* @__PURE__ */ h("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			i
		].filter(Boolean).join(" "),
		children: [
			d,
			/* @__PURE__ */ m("div", {
				className: "scrim",
				onClick: l
			}),
			/* @__PURE__ */ h("div", {
				className: "main",
				children: [e.isValidElement(n) ? n : n ? /* @__PURE__ */ m(D, {
					title: n.title || "",
					logo: n.logo,
					actions: n.actions,
					onToggleNav: u
				}) : null, r]
			})
		]
	});
}
// src/components/CommandPalette.tsx
var k = (e) => e.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function A({ open: e, onClose: t, items: o, placeholder: s = "Buscar comandos…", label: c = "Búsqueda rápida", emptyMessage: l = "No hay resultados.", onQueryChange: u, filterItems: d = !0 }) {
	let f = i(null), p = i(null), g = r(), [_, v] = a(""), [y, b] = a(0), x = k(_), S = d ? o.filter((e) => k(`${e.label} ${e.description ?? ""} ${e.keywords ?? ""}`).includes(x)) : o, C = Math.min(y, S.length - 1);
	n(() => {
		let t = f.current;
		t && (e && !t.open ? (v(""), u?.(""), b(0), t.showModal(), p.current?.focus()) : !e && t.open && t.close());
	}, [e]), n(() => {
		C >= 0 && document.getElementById(`${g}-${C}`)?.scrollIntoView?.({ block: "nearest" });
	}, [C, g]);
	let w = (e) => {
		t(), e.onSelect();
	};
	return /* @__PURE__ */ h("dialog", {
		ref: f,
		className: "command-palette",
		"aria-label": c,
		onCancel: (e) => {
			e.preventDefault(), t();
		},
		onClick: (e) => {
			e.target === f.current && t();
		},
		children: [/* @__PURE__ */ m("input", {
			ref: p,
			type: "search",
			role: "combobox",
			"aria-label": c,
			"aria-expanded": "true",
			"aria-controls": g,
			"aria-activedescendant": C >= 0 ? `${g}-${C}` : void 0,
			placeholder: s,
			value: _,
			onChange: (e) => {
				v(e.target.value), u?.(e.target.value), b(0);
			},
			onKeyDown: (e) => {
				e.key === "ArrowDown" && S.length && (e.preventDefault(), b((C + 1) % S.length)), e.key === "ArrowUp" && S.length && (e.preventDefault(), b((C + S.length - 1) % S.length)), e.key === "Enter" && C >= 0 && (e.preventDefault(), w(S[C]));
			}
		}), /* @__PURE__ */ h("div", {
			id: g,
			role: "listbox",
			"aria-label": "Resultados",
			className: "command-palette-results",
			children: [S.map((e, t) => /* @__PURE__ */ h("div", {
				id: `${g}-${t}`,
				role: "option",
				"aria-selected": t === C,
				className: "command-palette-result",
				onMouseEnter: () => b(t),
				onClick: () => w(e),
				children: [e.icon && /* @__PURE__ */ m("span", {
					className: "command-palette-icon",
					children: e.icon
				}), /* @__PURE__ */ h("span", { children: [/* @__PURE__ */ m("span", {
					className: "command-palette-title",
					children: e.label
				}), e.description && /* @__PURE__ */ m("span", {
					className: "command-palette-description",
					children: e.description
				})] })]
			}, e.id)), !S.length && /* @__PURE__ */ m("p", {
				className: "command-palette-empty",
				role: "status",
				children: l
			})]
		})]
	});
}
export { A as CommandPalette, D as MobileBar, S as NavItem, O as Shell, w as Sidebar, T as SidebarBottom, E as SidebarSection, C as ThemeToggle, y as applyTheme, v as getTheme, b as isDarkActive, g as themeLabels, x as useTheme };
