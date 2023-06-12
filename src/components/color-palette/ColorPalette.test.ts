import { mount, shallowMount } from "@vue/test-utils";
import tinycolor from "tinycolor2";
import { describe, expect, it } from "vitest";

import ColorPalette from "./ColorPalette.vue";

describe("ColorPalette.vue", () => {
  it("mounted", () => {
    const wrapper = mount(ColorPalette, {
      props: {
        palette: [],
        modelValue: "",
      },
    });
    expect(wrapper.classes("palette")).toBe(true);
  });

  it("width props에 따라 palette 컨테이너의 width가 결정된다.", () => {
    const width = "200";
    const wrapper = mount(ColorPalette, {
      props: {
        modelValue: "",
        palette: [],
        width,
      },
    });
    const style = wrapper.find(".palette").attributes("style");
    expect(style?.includes("width")).toBe(true);
    expect(style).toContain(`width: ${width}px`);
  });
  const palettes = ["#F5EFE7", "#D8C4B6", "#4F709C"];

  it("palettes props에 따라 palette item이 설정된다.", () => {
    const wrapper = mount(ColorPalette, {
      props: {
        palette: palettes,
        modelValue: "",
      },
    });
    expect(wrapper.findAll(".palette-item")).toHaveLength(palettes.length);
    expect(wrapper.findAll(".palette-item")[1].attributes("style")).toContain(
      `background-color: ${tinycolor(palettes[1]).toRgbString()}`
    );
  });

  it("팔레트 선택시 update:modelValue emit이벤트가 발생된다.", async () => {
    const wrapper = mount(ColorPalette, {
      props: {
        palette: palettes,
        modelValue: "",
      },
    });
    await wrapper.find(".palette-item").trigger("click");
    const emitEvt = wrapper.emitted("update:modelValue");
    expect(emitEvt).toHaveLength(1);
    expect(emitEvt[0][0]).toEqual(palettes[0]);
  });

  it("팔레트 modelValue가 업데이트 되었을 시 선택되었음을 의미하는 UI가 활성화 된다.", async () => {
    const wrapper = shallowMount(ColorPalette, {
      props: {
        palette: palettes,
        modelValue: "",
      },
    });
    expect(wrapper.find(".palette-item__picked").exists()).toBe(false);
    await wrapper.setProps({ modelValue: palettes[0] });
    expect(wrapper.find(".palette-item__picked").exists()).toBe(true);
  });
});
