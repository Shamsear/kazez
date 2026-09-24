import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedTabs = ({
  tabs = [],
  activeTab,
  defaultValue,
  onChange,
  variant = 'default',
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  indicatorClassName = '',
  hoverIndicatorClassName = '',
  layoutIdPrefix,
  enableHover = true,
  renderTab
}) => {
  const generatedId = useId();
  const safeId = (layoutIdPrefix || `animated-tabs-${generatedId}`).replace(/[:]/g, '-');
  const activeLayoutId = `${safeId}-active`;
  const hoverLayoutId = `${safeId}-hover`;

  // Normalize tabs to support strings or custom objects
  const normalizedTabs = tabs.map((tab, idx) => {
    if (typeof tab === 'string') {
      return { id: tab, label: tab, original: tab, index: idx };
    }
    return {
      id: tab.id ?? tab.key ?? tab.label ?? String(idx),
      label: tab.label ?? tab.name ?? tab.title ?? '',
      sub: tab.sub,
      icon: tab.icon,
      theme: tab.theme || '',
      indicatorClass: tab.indicatorClass || '',
      original: tab,
      index: idx,
      ...tab
    };
  });

  const [selectedTab, setSelectedTab] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return normalizedTabs[0]?.id || '';
  });

  const [hoveredTab, setHoveredTab] = useState(null);

  const currentTabId = activeTab !== undefined ? activeTab : selectedTab;

  const handleSelect = (tab) => {
    if (activeTab === undefined) {
      setSelectedTab(tab.id);
    }
    if (onChange) {
      onChange(tab.original, tab.index, tab.id);
    }
  };

  return (
    <div
      role="tablist"
      onMouseLeave={() => setHoveredTab(null)}
      className={`forge-animated-tabs forge-tabs-${variant} ${className}`}
    >
      {normalizedTabs.map((tab) => {
        const isActive = tab.id === currentTabId;
        const isHovered = hoveredTab === tab.id;
        const themeClass = tab.theme || '';

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleSelect(tab)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            className={`forge-tab-item ${isActive ? 'active' : ''} ${themeClass} ${tabClassName} ${
              isActive ? activeTabClassName : ''
            }`}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId={activeLayoutId}
                className={`forge-tab-active-indicator ${indicatorClassName} ${tab.indicatorClass || ''}`}
                transition={{
                  type: 'spring',
                  stiffness: 480,
                  damping: 36,
                  mass: 0.6
                }}
              />
            )}

            {/* Hover Sliding Highlight Indicator */}
            <AnimatePresence>
              {enableHover && !isActive && isHovered && (
                <motion.div
                  layoutId={hoverLayoutId}
                  className={`forge-tab-hover-indicator ${hoverIndicatorClassName}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 32,
                    mass: 0.5
                  }}
                />
              )}
            </AnimatePresence>

            <span className="forge-tab-content">
              {renderTab ? (
                renderTab(tab, isActive)
              ) : (
                <>
                  {tab.icon && (
                    <span className="forge-tab-icon">
                      {typeof tab.icon === 'function' ? (
                        <tab.icon size={15} />
                      ) : (
                        tab.icon
                      )}
                    </span>
                  )}
                  <span className="forge-tab-label">{tab.label}</span>
                  {tab.sub && <span className="forge-tab-sub">{tab.sub}</span>}
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export function AnimatedTabsExample() {
  const tabs = ["Home", "Components", "Docs", "Templates"];
  return (
    <AnimatedTabs tabs={tabs} variant="default" />
  );
}

export default AnimatedTabs;
