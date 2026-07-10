import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * CommandPalette Component
 * A modular, copy-paste ready Kbar-style command palette for React applications.
 * Styled with fluid transitions, backdrop blurs, and glassmorphism.
 *
 * @param {Object} props
 * @param {boolean} [props.isOpen] - Controlled visibility state. If omitted, uses global Ctrl+K / Cmd+K toggle.
 * @param {Function} [props.onClose] - Callback when the palette is dismissed.
 * @param {Array} props.actions - Array of action objects.
 * @param {string} [props.placeholder='Type a command or search...'] - Search input placeholder text.
 * @param {string} [props.theme='glass'] - Visual theme options: 'glass' | 'dark' | 'light'
 * @param {string} [props.accentColor='#06b6d4'] - Color hex code for selections and search focus glow.
 * @param {boolean} [props.enableRecentCommands=true] - Toggle the recent actions section.
 * @param {number} [props.maxRecentCommands=5] - Maximum number of recent actions to store in history.
 */
export default function CommandPalette({
  isOpen: controlledIsOpen,
  onClose,
  actions = [],
  placeholder = 'Type a command or search...',
  theme = 'glass',
  accentColor = '#06b6d4',
  enableRecentCommands = true,
  maxRecentCommands = 5
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentSection, setCurrentSection] = useState(null); // tracking nested submenus
  const [history, setHistory] = useState([]); // nested menu breadcrumb stack
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentActionIds, setRecentActionIds] = useState([]);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  // Sync open state
  const isCurrentlyOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Toggle internal/controlled open state
  const setIsOpenState = (openState) => {
    if (controlledIsOpen !== undefined) {
      if (!openState && onClose) onClose();
    } else {
      setInternalIsOpen(openState);
    }
  };

  // Load recent actions history from localStorage
  useEffect(() => {
    if (enableRecentCommands) {
      const saved = localStorage.getItem('kbar-recent-actions-log');
      if (saved) {
        try {
          setRecentActionIds(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse recent actions', e);
        }
      }
    }
  }, [enableRecentCommands]);

  // Reset fields and index whenever palette visibility switches
  useEffect(() => {
    if (isCurrentlyOpen) {
      setSearch('');
      setCurrentSection(null);
      setHistory([]);
      setActiveIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isCurrentlyOpen]);

  // Spotlight mouse position tracking style update
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isCurrentlyOpen && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCurrentlyOpen]);

  // Global event listener for Ctrl+K / Cmd+K and shortcuts trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette trigger
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpenState(!isCurrentlyOpen);
        return;
      }

      // Check for global quick keys shortcut execution if palette is closed
      if (!isCurrentlyOpen) {
        const allActionsList = [];
        const extractActions = (items) => {
          items.forEach((item) => {
            allActionsList.push(item);
            if (item.children) extractActions(item.children);
          });
        };
        extractActions(actions);

        const target = e.target;
        const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

        if (!isTyping) {
          const matched = allActionsList.find((action) => {
            if (!action.shortcut || action.shortcut.length === 0) return false;
            // Matches single quick key (e.g., press 'h' to perform navigation)
            if (action.shortcut.length === 1 && e.key.toLowerCase() === action.shortcut[0].toLowerCase()) {
              return true;
            }
            return false;
          });

          if (matched && matched.perform) {
            e.preventDefault();
            matched.perform();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCurrentlyOpen, actions]);

  // Helper to retrieve flat representation of current submenu
  const flatActionsMap = useMemo(() => {
    let currentPool = actions;

    // Resolve sub-menus
    if (currentSection) {
      const parentMenu = actions.find((a) => a.id === currentSection);
      if (parentMenu && parentMenu.children) {
        currentPool = parentMenu.children;
      }
    }

    return currentPool;
  }, [actions, currentSection]);

  // Filter current submenu actions using search inputs
  const filteredActions = useMemo(() => {
    // Collect matching actions
    const baseList = flatActionsMap;
    
    if (!search.trim()) {
      // If search is empty, prepend recent items if active
      if (enableRecentCommands && !currentSection && recentActionIds.length > 0) {
        const recentItems = recentActionIds
          .map((id) => actions.find((a) => a.id === id))
          .filter(Boolean);
        
        // Exclude duplicate items from base list
        const remainingItems = baseList.filter(
          (item) => !recentActionIds.includes(item.id)
        );

        return [
          ...recentItems.map((item) => ({ ...item, section: 'Recent Commands' })),
          ...remainingItems
        ];
      }
      return baseList;
    }

    const query = search.toLowerCase();
    return baseList.filter((action) => {
      const nameMatch = action.name.toLowerCase().includes(query);
      const subtitleMatch = action.subtitle
        ? action.subtitle.toLowerCase().includes(query)
        : false;
      const keywordMatch = action.keywords
        ? action.keywords.some((kw) => kw.toLowerCase().includes(query))
        : false;
      return nameMatch || subtitleMatch || keywordMatch;
    });
  }, [flatActionsMap, search, enableRecentCommands, currentSection, recentActionIds, actions]);

  // Handle arrow key selections and execution keys
  const handleKeyDownInPalette = (e) => {
    if (!isCurrentlyOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(filteredActions.length, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(filteredActions.length, 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredActions[activeIndex]) {
          executeAction(filteredActions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (history.length > 0) {
          const newHistory = [...history];
          const prevSection = newHistory.pop();
          setHistory(newHistory);
          setCurrentSection(prevSection || null);
        } else {
          setIsOpenState(false);
        }
        break;
      case 'Backspace':
        if (!search && history.length > 0) {
          e.preventDefault();
          const newHistory = [...history];
          const prevSection = newHistory.pop();
          setHistory(newHistory);
          setCurrentSection(prevSection || null);
        }
        break;
      default:
        break;
    }
  };

  // Perform action and update recent history
  const executeAction = (action) => {
    if (action.children && action.children.length > 0) {
      setHistory((prev) => [...prev, currentSection]);
      setCurrentSection(action.id);
      setSearch('');
    } else {
      if (action.perform) action.perform();
      
      // Update recent history logs
      if (enableRecentCommands) {
        const nextRecent = [
          action.id,
          ...recentActionIds.filter((id) => id !== action.id)
        ].slice(0, maxRecentCommands);
        
        setRecentActionIds(nextRecent);
        localStorage.setItem('kbar-recent-actions-log', JSON.stringify(nextRecent));
      }

      setIsOpenState(false);
    }
  };

  // Scroll active elements into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  if (!isCurrentlyOpen) return null;

  // Theme visual attributes lookup
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          bg: '#ffffff',
          border: '1px solid #e2e8f0',
          text: '#0f172a',
          muted: '#64748b',
          shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          inputBg: '#f8fafc',
          inputBorder: '#cbd5e1',
          itemHover: '#f1f5f9',
          spotlightColor: 'rgba(15, 23, 42, 0.03)'
        };
      case 'dark':
        return {
          bg: '#090d16',
          border: '1px solid #1e293b',
          text: '#f8fafc',
          muted: '#64748b',
          shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          inputBg: '#111827',
          inputBorder: '#374151',
          itemHover: '#1f2937',
          spotlightColor: 'rgba(255, 255, 255, 0.015)'
        };
      case 'glass':
      default:
        return {
          bg: 'rgba(10, 14, 23, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          text: '#fafafa',
          muted: '#71717a',
          shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          inputBg: 'rgba(255, 255, 255, 0.02)',
          inputBorder: 'rgba(255, 255, 255, 0.04)',
          itemHover: 'rgba(255, 255, 255, 0.05)',
          backdropBlur: '12px',
          spotlightColor: 'rgba(255, 255, 255, 0.025)'
        };
    }
  };

  const styleTheme = getThemeStyles();

  return (
    <div
      className="kbar-overlay animate-fade-in"
      onClick={() => setIsOpenState(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: styleTheme.backdropBlur ? `blur(${styleTheme.backdropBlur})` : 'none',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15vh'
      }}
    >
      {/* Visual Palette Modal Container */}
      <div
        ref={cardRef}
        className="kbar-container animate-slide-down"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          height: 'fit-content',
          maxHeight: '480px',
          backgroundColor: styleTheme.bg,
          border: styleTheme.border,
          borderRadius: '16px',
          boxShadow: styleTheme.shadow,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundImage: `radial-gradient(circle 120px at var(--mouse-x, 0) var(--mouse-y, 0), ${styleTheme.spotlightColor}, transparent)`
        }}
      >
        {/* Submenu breadcrumbs */}
        {history.length > 0 && (
          <div
            style={{
              padding: '0.75rem 1.25rem 0 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: accentColor,
              fontWeight: 700,
              fontFamily: '"Fira Code", monospace'
            }}
          >
            <span>Root</span>
            {history.map((hId, index) => {
              const name = actions.find((a) => a.id === hId)?.name || 'Menu';
              return (
                <React.Fragment key={index}>
                  <span style={{ color: styleTheme.muted }}>/</span>
                  <span>{name}</span>
                </React.Fragment>
              );
            })}
            <span style={{ color: styleTheme.muted }}>/</span>
            <span style={{ textDecoration: 'underline' }}>
              {actions.find((a) => a.id === currentSection)?.name}
            </span>
          </div>
        )}

        {/* Input Bar Row */}
        <div
          style={{
            padding: '1.25rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDownInPalette}
            placeholder={placeholder}
            style={{
              width: '100%',
              backgroundColor: styleTheme.inputBg,
              border: `1px solid ${styleTheme.inputBorder}`,
              borderRadius: '10px',
              padding: '0.85rem 1rem 0.85rem 2.5rem',
              fontSize: '1rem',
              color: styleTheme.text,
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: `0 0 15px ${accentColor}08`
            }}
          />
          {/* Glass Search Icon */}
          <span
            style={{
              position: 'absolute',
              left: '2.1rem',
              color: styleTheme.muted,
              fontSize: '1rem'
            }}
          >
            🔍
          </span>
        </div>

        {/* List of Actions */}
        <div
          ref={listRef}
          className="kbar-scroll-list"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 0.5rem 0.75rem 0.5rem',
            maxHeight: '320px'
          }}
        >
          {filteredActions.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 0',
                color: styleTheme.muted,
                textAlign: 'center',
                fontSize: '0.9rem',
                fontFamily: '"Fira Code", monospace'
              }}
            >
              No matching commands found.
            </div>
          ) : (
            <div>
              {/* Group items by Section headers */}
              {Object.entries(
                filteredActions.reduce((acc, action) => {
                  const sec = action.section || 'General Actions';
                  if (!acc[sec]) acc[sec] = [];
                  acc[sec].push(action);
                  return acc;
                }, {})
              ).map(([sectionTitle, items]) => (
                <div key={sectionTitle}>
                  <div
                    style={{
                      padding: '0.65rem 1rem 0.35rem 1rem',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: styleTheme.muted,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {sectionTitle}
                  </div>
                  {items.map((action) => {
                    const globalIdx = filteredActions.indexOf(action);
                    const isActive = globalIdx === activeIndex;

                    return (
                      <div
                        key={action.id}
                        data-active={isActive}
                        onClick={() => executeAction(action)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          backgroundColor: isActive ? styleTheme.itemHover : 'transparent',
                          borderLeft: `3px solid ${isActive ? accentColor : 'transparent'}`,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {action.icon && (
                            <span style={{ fontSize: '1.2rem', color: isActive ? accentColor : styleTheme.text }}>
                              {action.icon}
                            </span>
                          )}
                          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontSize: '0.92rem', color: styleTheme.text, fontWeight: isActive ? 700 : 500 }}>
                              {action.name}
                            </span>
                            {action.subtitle && (
                              <span style={{ fontSize: '0.75rem', color: styleTheme.muted }}>
                                {action.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Shortcuts badge symbols */}
                        {action.shortcut && action.shortcut.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {action.shortcut.map((key, kIdx) => (
                              <kbd
                                key={kIdx}
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: '4px',
                                  padding: '0.15rem 0.4rem',
                                  fontSize: '0.75rem',
                                  fontFamily: '"Fira Code", monospace',
                                  color: styleTheme.text,
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper info bar */}
        <footer
          style={{
            padding: '0.65rem 1.25rem',
            borderTop: styleTheme.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: styleTheme.muted,
            backgroundColor: styleTheme.inputBg
          }}
        >
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>esc</kbd> Back/Close</span>
          </div>
          <div>
            <span>Press <kbd>Ctrl+K</kbd> globally to toggle</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
