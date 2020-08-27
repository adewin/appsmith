import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import Callout from "../ads/Callout";
import { Variant } from "../ads/Button";

export default {
  title: "Callout",
  component: Callout,
  decorators: [withKnobs],
};

export const CalloutStory = () => (
  <div
    style={{ height: "700px", background: "#1A191C", padding: "50px 100px" }}
  >
    <Callout
      text="Lorem ipsum dolar sit adicipling dolare."
      variant={select(
        "variant",
        [Variant.success, Variant.danger, Variant.info, Variant.warning],
        Variant.success,
      )}
    />
  </div>
);
