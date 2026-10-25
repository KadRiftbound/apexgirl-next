"use client";

import { useState, useEffect } from "react";
import { NavIcon } from "@/components/navIcons";

/**
 * Collapses the desktop sidebar to icons only. The state lives on <html data-sidebar>
 * (set before paint by the inline script in the root layout) and in localStorage.
 */
export function SidebarToggle({ labelCollapse, labelExpand }: { labelCollapse: string; labelExpand: string }) {
  const [collapsed, setCollapsed] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setCollapsed(document.documentElement.dataset.sidebar === "collapsed"); }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (next) document.documentElement.dataset.sidebar = "collapsed";
    else delete document.documentElement.dataset.sidebar;
    try { localStorage.setItem("sidebar", next ? "collapsed" : "open"); } catch {}
  };

  return (
    <button type="button" className="sidebar-toggle" onClick={toggle} aria-label={collapsed ? labelExpand : labelCollapse} title={collapsed ? labelExpand : labelCollapse} aria-expanded={!collapsed}>
      <NavIcon name="chevron" size={16} />
    </button>
  );
}
