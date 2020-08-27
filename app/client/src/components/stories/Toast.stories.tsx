import React from "react";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { AdsToaster, ToastBox } from "../ads/Toast";
import Button, { Variant, Size, Category } from "../ads/Button";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";

export default {
  title: "Toast",
  component: AdsToaster,
  decorators: [withKnobs],
};

const ToastWrapper = styled.div`
  background: #1a191c;
  height: 700px;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;

  button {
    width: 200px;
    margin-bottom: 15px;
  }
`;

export const ToastStory = () => {
  return (
    <ToastWrapper>
      <ToastBox />
      <Button
        size={Size.medium}
        category={Category.primary}
        variant={Variant.info}
        text="Custom Notication"
        onClick={() => {
          AdsToaster.show({
            value: text("message", "Archived successfully"),
            duration: number("duration", 5000),
            variant: Variant.success,
            onUndo: action("on-undo"),
          });
        }}
      />

      <Button
        size={Size.medium}
        category={Category.primary}
        variant={Variant.info}
        text="Info Notification"
        onClick={() => {
          AdsToaster.show({
            value: "Archived successfully",
            duration: 5000,
            variant: Variant.info,
            onUndo: action("on-undo"),
          });
        }}
      />

      <Button
        size={Size.medium}
        category={Category.primary}
        variant={Variant.success}
        text="Success Notication"
        onClick={() => {
          AdsToaster.show({
            value: "App name saved successfully",
            duration: 5000,
            variant: Variant.success,
            onUndo: action("on-undo"),
          });
        }}
      />

      <Button
        size={Size.medium}
        category={Category.primary}
        variant={Variant.warning}
        text="Warning Notification"
        onClick={() => {
          AdsToaster.show({
            value: "This is a warning message",
            duration: 5000,
            variant: Variant.warning,
            onUndo: action("on-undo"),
          });
        }}
      />

      <Button
        size={Size.medium}
        category={Category.primary}
        variant={Variant.danger}
        onClick={() => {
          AdsToaster.show({
            value: "Opps! Incorrect App name",
            duration: 5000,
            variant: Variant.danger,
            onUndo: action("on-undo"),
          });
        }}
        text="Error Notication"
      />
    </ToastWrapper>
  );
};
