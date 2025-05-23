import React from 'react';
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import { PageTitle, SubTitle, useModal } from "@md/components";
import { CreateItemForm } from "../../CreateItemForm";
import { EditItemForm } from "../../EditItemForm";

const slideInAnimation = css`
  @keyframes slideInAnimation {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  opacity: 1;
  animation: slideInAnimation 0.2s forwards;
`;

const slideOutAnimation = css`
  @keyframes slideOutAnimation {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  opacity: 0;
  animation: slideOutAnimation 0.2s forwards;
`;

export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  opacity: 0;
  animation: fadeIn 0.2s forwards;
`;

export const fadeOut = css`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  opacity: 1;
  animation: fadeOut 0.1 forwards;
`;

const SideBarModalContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 740px;
  height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.$isClosing ? `${slideOutAnimation}` : `${slideInAnimation}`};
`;

const Overlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  ${(props) => (props.$isClosing ? `${fadeOut}` : `${fadeIn}`)};
`;

const StyledSideBarModal = styled.div`
  background: white;
  border-radius: 4px;
  width: 100%;
  min-height: 100%;
`;

const SideBarModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 7px 20px; // Alignment to the height of keystone header
`;

export const SideBarModal = () => {
  const { sideBarModalData, setSideBarModalData } = useModal();
  const [$isClosing, setIsClosing] = React.useState(false);

  if (!sideBarModalData) return null;


  const onHide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSideBarModalData(null);
      setIsClosing(false);
    }, 200);
  };

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onHide} $isClosing={$isClosing} />
      <SideBarModalContainer $isClosing={$isClosing}>
        <StyledSideBarModal>
          <TitleContainer>
            <PageTitle>{sideBarModalData.headerText}</PageTitle>
          </TitleContainer>
          {
            {
              create: (
                <SideBarModalContentContainer>
                  {sideBarModalData.listName && (
                    <CreateItemForm
                      listName={sideBarModalData.listName}
                      fieldsToRender={sideBarModalData.fieldsToRender}
                      defaultValues={sideBarModalData.defaultValues}
                      notToRenderFields={sideBarModalData.notToRenderFields}
                      conditionalFields={sideBarModalData.conditionalFields}
                      tabs={sideBarModalData.tabs}
                      buttons={sideBarModalData.buttons}
                    />
                  )}
                </SideBarModalContentContainer>
              ),
              edit: (
                <SideBarModalContentContainer>
                  {sideBarModalData.listName && (
                    <EditItemForm
                      listName={sideBarModalData.listName}
                      itemId={sideBarModalData.id!}
                      fieldsToRender={sideBarModalData.fieldsToRender}
                      notToRenderFields={sideBarModalData.notToRenderFields}
                      conditionalFields={sideBarModalData.conditionalFields}
                      buttons={sideBarModalData.buttons}
                      tabs={sideBarModalData.tabs}
                    />
                  )}
                </SideBarModalContentContainer>
              ),
              dataSource: (
                <SideBarModalContentContainer>
                  <SubTitle>Select a source</SubTitle>
                  <span>
                    Choose where you want to import your contacts from.
                  </span>
                  {sideBarModalData.buttons?.map((button) => button.view?.())}
                </SideBarModalContentContainer>
              ),
              custom: (
                <SideBarModalContentContainer>
                  {sideBarModalData.children}
                </SideBarModalContentContainer>
              ),
            }[sideBarModalData.type]
          }
        </StyledSideBarModal>
      </SideBarModalContainer>
    </>,
    document.body,
  );
};
