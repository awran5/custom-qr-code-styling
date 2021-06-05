import React from 'react'

type TabsProps = {
  className?: string
  tabs: {
    label: string
    Component: (T: { index: number }) => JSX.Element
  }[]
  selectedTab: number
  onClick: (index: number) => void
  orientation?: 'horizontal' | 'vertical'
  type?: 'tabs' | 'pills'
}

const Tabs = ({
  className = 'tabs-component',
  tabs = [],
  selectedTab = 0,
  onClick,
  orientation = 'horizontal',
  type = 'tabs',
}: TabsProps): JSX.Element => {
  const Panel = tabs && tabs.find((_, index) => index === selectedTab)

  return (
    <div className={`${orientation === 'vertical' ? 'd-flex align-items-start ' : ''}` + className}>
      <div
        className={`nav${orientation === 'vertical' ? ' flex-column col-3 nav-pills me-4' : ` nav-${type} mb-4`}`}
        aria-orientation={orientation}
        role='tablist'
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            id={`tab-${index}`}
            className={selectedTab === index ? 'nav-link active' : 'nav-link'}
            type='button'
            role='tab'
            tabIndex={selectedTab === index ? 0 : -1}
            aria-selected={selectedTab === index}
            aria-controls={`pane-${index}`}
            onClick={() => onClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tab-content${orientation === 'vertical' ? ' col-9' : ''}`}>
        <div
          id={`pane-${selectedTab}`}
          className='tab-pane fade show active'
          role='tabpanel'
          aria-labelledby={`tab-${selectedTab}`}
        >
          {Panel?.Component && <Panel.Component index={selectedTab} />}
        </div>
      </div>
    </div>
  )
}
export default Tabs
