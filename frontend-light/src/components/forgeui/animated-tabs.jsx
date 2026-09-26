import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Use isomorphic layout effect for SSR/CSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  const containerRef = useRef(null);
  const tabRefs = useRef(new Map());
  const isFirstRender = useRef(true);

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

  const [activeRect, setActiveRect] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const [hoverRect, setHoverRect] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  // Update active indicator position relative strictly to container box
  const updateActivePosition = useCallback((instant = false) => {
    if (!containerRef.current) return;
    const activeEl = tabRefs.current.get(currentTabId);
    if (!activeEl) {
      setActiveRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const containerBox = containerRef.current.getBoundingClientRect();
    const activeBox = activeEl.getBoundingClientRect();

    const left = activeBox.left - containerBox.left;
    const top = activeBox.top - containerBox.top;
    const width = activeBox.width;
    const height = activeBox.height;

    setActiveRect({ left, top, width, height, opacity: 1, instant });
  }, [currentTabId]);

  // Update hover indicator position relative strictly to container box
  const updateHoverPosition = useCallback(() => {
    if (!containerRef.current || !hoveredTab || hoveredTab === currentTabId) {
      setHoverRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const hoverEl = tabRefs.current.get(hoveredTab);
    if (!hoverEl) {
      setHoverRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const containerBox = containerRef.current.getBoundingClientRect();
    const hoverBox = hoverEl.getBoundingClientRect();

    const left = hoverBox.left - containerBox.left;
    const top = hoverBox.top - containerBox.top;
    const width = hoverBox.width;
    const height = hoverBox.height;

    setHoverRect({ left, top, width, height, opacity: 1 });
  }, [hoveredTab, currentTabId]);

  useIsomorphicLayoutEffect(() => {
    updateActivePosition(isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [updateActivePosition, tabs]);

  useIsomorphicLayoutEffect(() => {
    updateHoverPosition();
  }, [updateHoverPosition]);

  // Handle window resize or font loading changes
  useEffect(() => {
    const handleResize = () => {
      updateActivePosition(true);
      updateHoverPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateActivePosition, updateHoverPosition]);

  const handleSelect = (tab) => {
    if (activeTab === undefined) {
      setSelectedTab(tab.id);
    }
    if (onChange) {
      onChange(tab.original, tab.index, tab.id);
    }
  };

  // Find active tab metadata for custom styling (e.g. edition black/silver)
  const currentTabObj = normalizedTabs.find((t) => t.id === currentTabId);

  return (
    <div
      ref={containerRef}
      role="tablist"
      onMouseLeave={() => setHoveredTab(null)}
      className={`forge-animated-tabs forge-tabs-${variant} ${className}`}
    >
      {/* Active Tab Sliding Pill Indicator - Strictly Local Horizontal Glide */}
      {activeRect.opacity > 0 && (
        <motion.div
          className={`forge-tab-active-indicator ${indicatorClassName} ${currentTabObj?.indicatorClass || ''}`}
          initial={false}
          animate={{
            x: activeRect.left,
            y: activeRect.top,
            width: activeRect.width,
            height: activeRect.height,
            opacity: 1
          }}
          transition={
            activeRect.instant
              ? { duration: 0 }
              : {
                  type: 'spring',
                  stiffness: 480,
                  damping: 36,
                  mass: 0.6
                }
          }
          style={{
            position: 'absolute',
            left: 0,
            right: 'auto',
            top: 0,
            bottom: 'auto',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* Hover Tab Sliding Indicator */}
      <AnimatePresence>
        {enableHover && hoverRect.opacity > 0 && (
          <motion.div
            className={`forge-tab-hover-indicator ${hoverIndicatorClassName}`}
            initial={{ opacity: 0 }}
            animate={{
              x: hoverRect.left,
              y: hoverRect.top,
              width: hoverRect.width,
              height: hoverRect.height,
              opacity: 1
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 32,
              mass: 0.5
            }}
            style={{
              position: 'absolute',
              left: 0,
              right: 'auto',
              top: 0,
              bottom: 'auto',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </AnimatePresence>

      {/* Tab Buttons */}
      {normalizedTabs.map((tab) => {
        const isActive = tab.id === currentTabId;
        const themeClass = tab.theme || '';

        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
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
