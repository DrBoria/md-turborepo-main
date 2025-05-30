import React, { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  cursor: pointer;
  role: tablist;
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.offsets.elementContent} ${({ theme }) => `calc(2 * ${theme.offsets.elementContent})`};
  background-color: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.sectionContent};
  border: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};
  border-bottom: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};
  margin-right: ${({ theme }) => theme.offsets.betweenElements};
  top: 1px;
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size};
  font-weight: 500;
  border-top-right-radius: ${({ theme }) => theme.border.radius};
  border-top-left-radius: ${({ theme }) => theme.border.radius};

  &[type="button"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &[aria-selected="true"] {
    background-color: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.sectionContent};
    border-bottom: none;
    z-index: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.sectionContent};
    color: ${({ theme }) => theme.colors.section};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.highlighted};
    outline-offset: -2px;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: -2px;
      right: -2px;
      height: 3px;
      margin: 0px 3px;
      background-color: ${({ theme }) => theme.colors.highlightedText};
    }
  }
`;

const TabPanel = styled.div`
  padding: ${({ theme }) => theme.offsets.elementContent};
  margin-top: 0 !important;
  border: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};
  border-radius: ${({ theme }) => theme.border.radius};
  border-top-left-radius: 0;
`;

const Tabs: React.FC<{
  tabs: { label: string; content: React.ReactNode }[];
  onTabChange?: (tabNumber: number) => void;
  containerStyle?: React.CSSProperties;
  className?: string;
}> = ({ tabs, onTabChange, containerStyle, className }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange && onTabChange(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      handleTabClick(index);
    } else if (event.key === "ArrowRight") {
      const nextTab = (index + 1) % tabs.length;
      handleTabClick(nextTab);
    } else if (event.key === "ArrowLeft") {
      const prevTab = (index - 1 + tabs.length) % tabs.length;
      handleTabClick(prevTab);
    }
  };

  return (
    <TabsContainer className={className}>
      <TabList role="tablist">
        {tabs.map((tab, index) => (
          <Tab
            className="squared"
            key={index}
            role="tab"
            data-active={index === activeTab}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            id={`tab-${index}`}
            aria-controls={`panel-${index}`}
            aria-selected={index === activeTab}
            tabIndex={index === activeTab ? 0 : -1}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel
          style={containerStyle}
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeTab}
        >
          {tab.content}
        </TabPanel>
      ))}
    </TabsContainer>
  );
};

export { Tabs };
