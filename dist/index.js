import e, { useCallback as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { Menu as o, Moon as s, PanelLeft as c, Plus as l, Search as u, Settings as d, Sun as f, X as p } from "lucide-react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
// src/theme.ts
var _ = {
	system: "Sistema",
	light: "Claro",
	dark: "Oscuro"
}, v = "personal.theme";
function y(e = v) {
	if (typeof window > "u") return "system";
	try {
		let t = localStorage.getItem(e);
		return t === "light" || t === "dark" ? t : "system";
	} catch {
		return "system";
	}
}
function b(e, t = v) {
	if (typeof window < "u") {
		try {
			localStorage.setItem(t, e);
		} catch {}
		e === "system" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	}
}
function x(e) {
	return typeof window > "u" ? !1 : e === "dark" || e !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function S(e = v) {
	let [t, r] = a(() => y(e)), [i, o] = a(() => x(y(e)));
	n(() => {
		if (b(t, e), o(x(t)), t === "system") {
			let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => o(e.matches);
			return e.addEventListener("change", t), () => e.removeEventListener("change", t);
		}
	}, [t, e]);
	let s = (t) => {
		r(t), b(t, e);
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
function C({ label: e, icon: t, twisty: n, badge: r, active: i, onClick: a, href: o, to: s, as: c = o || s ? "a" : "button", className: l = "", title: u, style: d, children: f, ...p }) {
	let m = [
		"nav-item",
		i ? "active" : "",
		l
	].filter(Boolean).join(" "), _ = t ?? n, v = {
		className: m,
		onClick: a,
		title: u ?? (typeof e == "string" ? e : void 0),
		style: d,
		...p
	};
	return o && (v.href = o), s && (v.to = s), /* @__PURE__ */ g(c, {
		...v,
		children: [
			_ && /* @__PURE__ */ h("span", {
				className: "twisty",
				children: _
			}),
			/* @__PURE__ */ h("span", {
				className: "label",
				children: e
			}),
			r != null && /* @__PURE__ */ h("span", {
				className: "badge",
				children: r
			}),
			f
		]
	});
}
// src/components/ThemeToggle.tsx
function w({ storageKey: e, className: t = "btn ghost sm icon", size: n = 15 }) {
	let { theme: r, isDark: i, cycleTheme: a } = S(e);
	return /* @__PURE__ */ h("button", {
		type: "button",
		className: t,
		onClick: a,
		title: `Tema: ${_[r]}`,
		"aria-label": `Cambiar tema (actual: ${_[r]})`,
		children: h(i ? s : f, { size: n })
	});
}
// src/components/CreateMenu.tsx
function T({ items: e, label: t = "Crear" }) {
	let [r, o] = a(!1), s = i(null), c = i(null), u = i(null);
	n(() => {
		if (!r) return;
		let e = (e) => {
			s.current?.contains(e.target) || o(!1);
		}, t = (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), o(!1), c.current?.focus());
		};
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t, !0);
		};
	}, [r]);
	function d(e) {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = Array.from(u.current?.querySelectorAll("button:not(:disabled)") ?? []);
		if (!t.length) return;
		e.preventDefault();
		let n = t.indexOf(document.activeElement);
		t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : e.key === "ArrowDown" ? (n + 1) % t.length : n <= 0 ? t.length - 1 : n - 1]?.focus();
	}
	return /* @__PURE__ */ g("div", {
		className: "create-menu",
		ref: s,
		children: [/* @__PURE__ */ h("button", {
			ref: c,
			type: "button",
			className: "btn sm icon create-menu-trigger",
			title: t,
			"aria-label": t,
			"aria-haspopup": "menu",
			"aria-expanded": r,
			onClick: () => o((e) => !e),
			onKeyDown: (e) => {
				e.key === "ArrowDown" && (e.preventDefault(), o(!0), requestAnimationFrame(() => u.current?.querySelector("button")?.focus()));
			},
			children: /* @__PURE__ */ h(l, {
				size: 16,
				"aria-hidden": "true"
			})
		}), r && /* @__PURE__ */ h("div", {
			ref: u,
			className: "create-menu-popup",
			role: "menu",
			"aria-label": t,
			onKeyDown: d,
			children: e.map((e) => /* @__PURE__ */ g("button", {
				type: "button",
				role: "menuitem",
				onClick: () => {
					o(!1), e.onSelect();
				},
				children: [e.icon && /* @__PURE__ */ h("span", {
					"aria-hidden": "true",
					children: e.icon
				}), /* @__PURE__ */ h("span", { children: e.label })]
			}, e.id))
		})]
	});
}
// src/components/Sidebar.tsx
function E({ brand: r, search: o, headerActions: s, createItems: l, children: f, footer: _, bottom: v, bottomClassName: y = "row", onClose: b, collapsed: x, defaultCollapsed: S = !1, onToggleCollapse: E, enableShortcut: D = !0, enableSearchShortcut: O = !0, sidebarRef: k, asideProps: A, storageKey: j, className: M = "", "aria-label": N = "Principal" }) {
	let P = x !== void 0, [F, I] = a(() => {
		if (j && typeof window < "u") try {
			let e = localStorage.getItem(j);
			if (e !== null) return e === "true";
		} catch {}
		return S;
	}), L = P ? x : F, R = i(null), z = i(!1), B = o?.shortcut ?? "/", V = !!o?.onChange, H = !!(o && (V || o.onClick)), U = t(() => {
		E && E(), P || I((e) => {
			let t = !e;
			if (j && typeof window < "u") try {
				localStorage.setItem(j, String(t));
			} catch {}
			return t;
		});
	}, [
		P,
		E,
		j
	]), W = t(() => {
		L && (z.current = V, U()), V ? L || R.current?.focus() : o?.onClick?.();
	}, [
		V,
		L,
		U,
		o?.onClick
	]);
	n(() => {
		!L && z.current && (z.current = !1, R.current?.focus());
	}, [L]), n(() => {
		if (!O || !H || !B) return;
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.key !== B) return;
			let t = e.target;
			t instanceof HTMLElement && (t.isContentEditable || t.closest("input, textarea, select, [contenteditable]:not([contenteditable=\"false\"]), [role=\"textbox\"]")) || (e.preventDefault(), W());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		O,
		H,
		B,
		W
	]), n(() => {
		if (!D) return;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b" && (e.preventDefault(), U());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [D, U]);
	let G = () => {
		if (!r) return null;
		let e = r.as || (r.to || r.href ? "a" : "div"), t = {
			className: "brand",
			onClick: (e) => {
				r.onClick && (r.to || r.href && r.href !== "#" || e.preventDefault(), r.onClick(e));
			}
		};
		return r.href && (t.href = r.href), r.to && (t.to = r.to), /* @__PURE__ */ g(e, {
			...t,
			children: [r.logo && /* @__PURE__ */ h("span", {
				className: "brand-logo",
				children: r.logo
			}), /* @__PURE__ */ h("span", {
				className: "brand-name",
				children: r.title
			})]
		});
	}, K = () => {
		if (v) return v;
		if (_) {
			let t = typeof _ == "object" ? _ : {}, n = t.to ?? (t.href ? void 0 : "/settings"), r = t.label ?? "Ajustes", i = t.icon ?? /* @__PURE__ */ h(d, { size: 14 });
			return /* @__PURE__ */ g(m, { children: [
				/* @__PURE__ */ h(C, {
					as: t.as || (n || t.href ? "a" : "button"),
					to: n,
					href: t.href,
					icon: i,
					label: r,
					active: t.active,
					onClick: t.onClick,
					style: { flex: 1 }
				}),
				t.themeToggle !== !1 && (e.isValidElement(t.themeToggle) ? t.themeToggle : /* @__PURE__ */ h(w, { storageKey: t.themeStorageKey })),
				t.extra
			] });
		}
		return null;
	};
	return /* @__PURE__ */ g("aside", {
		...A,
		ref: k,
		className: [
			"sidebar",
			L ? "is-collapsed" : "",
			M
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ g("div", {
				className: "sidebar-top",
				children: [
					/* @__PURE__ */ g("div", {
						className: "brand-row",
						children: [G(), /* @__PURE__ */ g("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px"
							},
							children: [/* @__PURE__ */ h("button", {
								type: "button",
								className: "btn ghost sm icon collapse-btn",
								title: L ? "Expandir barra lateral (⌘B / Ctrl+B)" : "Plegar barra lateral (⌘B / Ctrl+B)",
								"aria-label": L ? "Expandir barra lateral" : "Plegar barra lateral",
								"aria-expanded": !L,
								onClick: U,
								children: /* @__PURE__ */ h(c, { size: 16 })
							}), b && /* @__PURE__ */ h("button", {
								type: "button",
								className: "btn ghost sm icon sidebar-close-btn",
								onClick: b,
								"aria-label": "Cerrar menú",
								children: /* @__PURE__ */ h(p, { size: 16 })
							})]
						})]
					}),
					o && /* @__PURE__ */ g("div", {
						className: "sidebar-actions",
						children: [
							V ? /* @__PURE__ */ g("label", {
								className: "search-box",
								children: [
									/* @__PURE__ */ h(u, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ h("input", {
										ref: R,
										type: "search",
										"aria-label": o.title || o.placeholder || "Buscar",
										placeholder: o.placeholder || "Buscar",
										value: o.value,
										onChange: (e) => o.onChange?.(e.target.value)
									}),
									B && /* @__PURE__ */ h("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: B
									})
								]
							}) : /* @__PURE__ */ g("button", {
								type: "button",
								className: "search-box",
								onClick: o.onClick,
								title: o.title,
								disabled: !o.onClick,
								children: [
									/* @__PURE__ */ h(u, {
										size: 14,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ h("span", { children: o.placeholder || "Buscar" }),
									B && /* @__PURE__ */ h("kbd", {
										className: "kbd",
										"aria-hidden": "true",
										children: B
									})
								]
							}),
							/* @__PURE__ */ h("button", {
								type: "button",
								className: "btn ghost sm icon collapsed-only",
								title: o.title || (B ? `Buscar (${B})` : "Buscar"),
								"aria-label": o.title || o.placeholder || "Buscar",
								disabled: !V && !o.onClick,
								onClick: W,
								children: /* @__PURE__ */ h(u, { size: 14 })
							}),
							l?.length ? /* @__PURE__ */ h(T, { items: l }) : o.action
						]
					}),
					s
				]
			}),
			/* @__PURE__ */ h("nav", {
				className: "sidebar-scroll",
				"aria-label": N,
				children: f
			}),
			(v || _) && /* @__PURE__ */ h("div", {
				className: ["sidebar-bottom", y].filter(Boolean).join(" "),
				children: K()
			})
		]
	});
}
function D({ className: e = "", children: t }) {
	return /* @__PURE__ */ h("div", {
		className: [
			"sidebar-bottom",
			"row",
			e
		].filter(Boolean).join(" "),
		children: t
	});
}
function O({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ g("div", {
		className: ["sidebar-section", r].filter(Boolean).join(" "),
		children: [(e || t) && /* @__PURE__ */ g("div", {
			className: "sidebar-heading",
			children: [e && /* @__PURE__ */ h("span", { children: e }), t]
		}), n]
	});
}
// src/components/MobileBar.tsx
function k({ title: e, logo: t, onToggleNav: n, actions: r, className: i = "mobile-bar" }) {
	return /* @__PURE__ */ g("div", {
		className: i,
		children: [
			/* @__PURE__ */ h("button", {
				type: "button",
				className: "btn ghost sm icon menu-btn",
				onClick: n,
				"aria-label": "Abrir menú",
				children: /* @__PURE__ */ h(o, { size: 18 })
			}),
			t && /* @__PURE__ */ h("span", {
				className: "brand-logo",
				children: t
			}),
			/* @__PURE__ */ h("span", {
				className: "mobile-bar-title",
				children: e
			}),
			r && /* @__PURE__ */ h("div", {
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
function A({ sidebar: t, mobileBar: n, children: r, className: i = "", defaultNavOpen: o = !1 }) {
	let [s, c] = a(o), l = () => c(!1), u = () => c((e) => !e), d = typeof t == "function" ? t({ onClose: l }) : t;
	return /* @__PURE__ */ g("div", {
		className: [
			"app",
			s ? "nav-open" : "",
			i
		].filter(Boolean).join(" "),
		children: [
			d,
			/* @__PURE__ */ h("div", {
				className: "scrim",
				onClick: l
			}),
			/* @__PURE__ */ g("div", {
				className: "main",
				children: [e.isValidElement(n) ? n : n ? /* @__PURE__ */ h(k, {
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
var j = (e) => e.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function M({ open: e, onClose: t, items: o, placeholder: s = "Buscar comandos…", label: c = "Búsqueda rápida", emptyMessage: l = "No hay resultados.", onQueryChange: u, filterItems: d = !0 }) {
	let f = i(null), p = i(null), m = r(), [_, v] = a(""), [y, b] = a(0), x = j(_), S = d ? o.filter((e) => j(`${e.label} ${e.description ?? ""} ${e.keywords ?? ""}`).includes(x)) : o, C = Math.min(y, S.length - 1);
	n(() => {
		let t = f.current;
		t && (e && !t.open ? (v(""), u?.(""), b(0), t.showModal(), p.current?.focus()) : !e && t.open && t.close());
	}, [e]), n(() => {
		C >= 0 && document.getElementById(`${m}-${C}`)?.scrollIntoView?.({ block: "nearest" });
	}, [C, m]);
	let w = (e) => {
		t(), e.onSelect();
	};
	return /* @__PURE__ */ g("dialog", {
		ref: f,
		className: "command-palette",
		"aria-label": c,
		onCancel: (e) => {
			e.preventDefault(), t();
		},
		onClick: (e) => {
			e.target === f.current && t();
		},
		children: [/* @__PURE__ */ h("input", {
			ref: p,
			type: "search",
			role: "combobox",
			"aria-label": c,
			"aria-expanded": "true",
			"aria-controls": m,
			"aria-activedescendant": C >= 0 ? `${m}-${C}` : void 0,
			placeholder: s,
			value: _,
			onChange: (e) => {
				v(e.target.value), u?.(e.target.value), b(0);
			},
			onKeyDown: (e) => {
				e.key === "ArrowDown" && S.length && (e.preventDefault(), b((C + 1) % S.length)), e.key === "ArrowUp" && S.length && (e.preventDefault(), b((C + S.length - 1) % S.length)), e.key === "Enter" && C >= 0 && (e.preventDefault(), w(S[C]));
			}
		}), /* @__PURE__ */ g("div", {
			id: m,
			role: "listbox",
			"aria-label": "Resultados",
			className: "command-palette-results",
			children: [S.map((e, t) => /* @__PURE__ */ g("div", {
				id: `${m}-${t}`,
				role: "option",
				"aria-selected": t === C,
				className: "command-palette-result",
				onMouseEnter: () => b(t),
				onClick: () => w(e),
				children: [e.icon && /* @__PURE__ */ h("span", {
					className: "command-palette-icon",
					children: e.icon
				}), /* @__PURE__ */ g("span", { children: [/* @__PURE__ */ h("span", {
					className: "command-palette-title",
					children: e.label
				}), e.description && /* @__PURE__ */ h("span", {
					className: "command-palette-description",
					children: e.description
				})] })]
			}, e.id)), !S.length && /* @__PURE__ */ h("p", {
				className: "command-palette-empty",
				role: "status",
				children: l
			})]
		})]
	});
}
export { M as CommandPalette, T as CreateMenu, k as MobileBar, C as NavItem, A as Shell, E as Sidebar, D as SidebarBottom, O as SidebarSection, w as ThemeToggle, b as applyTheme, y as getTheme, x as isDarkActive, _ as themeLabels, S as useTheme };
