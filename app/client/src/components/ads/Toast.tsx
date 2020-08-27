import React from "react";
import { CommonComponentProps } from "./common";
import { Variant, Size } from "./Button";
import styled from "styled-components";
import Icon from "./Icon";
import Text, { TextType } from "./Text";
import { toast, ToastOptions, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = ToastOptions &
  CommonComponentProps & {
    value: string;
    variant?: Variant;
    duration: number;
    onUndo?: () => void;
  };

const WrappedToastContainer = styled.div`
  .Toastify__toast-container {
    width: auto;
  }
  .Toastify__toast--default {
    background: transparent;
  }
  .Toastify__toast {
    cursor: auto;
    min-height: auto;
    border-radius: 0px;
    font-family: ${props => props.theme.fonts.text};
    margin-bottom: ${props => props.theme.spaces[4]}px;
  }
`;

const ToastBody = styled.div<{ variant?: Variant; onUndo?: () => void }>`
  background-color: ${props =>
    props.variant === Variant.danger
      ? "rgba(226, 44, 44, 0.08)"
      : props.variant === Variant.warning
      ? "#29251A"
      : props.theme.colors.blackShades[0]};
  padding: ${props => props.theme.spaces[4]}px
    ${props => props.theme.spaces[5]}px;
  display: flex;
  align-items: center;

  .ads-icon {
    cursor: auto;
    margin-right: ${props => props.theme.spaces[3]}px;
  }

  span {
    color: ${props =>
      props.variant === Variant.danger
        ? props.theme.colors.danger.main
        : props.variant === Variant.warning
        ? props.theme.colors.warning.main
        : props.theme.colors.blackShades[7]};
  }

  ${props =>
    props.onUndo
      ? `
    span:last-child {
      cursor: pointer;
      margin-left: ${props.theme.spaces[3]}px;
      color: ${props.theme.colors.info.main};
    }
    `
      : null}
`;

const ToastComponent = (props: ToastProps) => {
  return (
    <ToastBody variant={props.variant} onUndo={props.onUndo}>
      {props.variant === Variant.success ? (
        <Icon name="success" size={Size.large} />
      ) : props.variant === Variant.warning ? (
        <Icon name="warning" size={Size.large} />
      ) : null}
      {props.variant === Variant.danger ? (
        <Icon name="error" size={Size.large} />
      ) : null}
      <Text type={TextType.P1}>{props.value}</Text>
      {props.onUndo ? (
        <Text type={TextType.H6} onClick={() => props.onUndo && props.onUndo()}>
          UNDO
        </Text>
      ) : null}
    </ToastBody>
  );
};

export const ToastBox = () => {
  return (
    <WrappedToastContainer>
      <ToastContainer />
    </WrappedToastContainer>
  );
};

const Toaster = {
  show: (config: ToastProps) => {
    const toastId = toast(
      <ToastComponent
        {...config}
        onUndo={() => {
          toast.dismiss(toastId);
          config.onUndo && config.onUndo();
        }}
      />,
      {
        hideProgressBar: true,
        pauseOnHover: true,
        autoClose: config.duration,
        transition: Slide,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
      },
    );
  },
  clear: () => toast.dismiss(),
};

export const AdsToaster = Toaster;
