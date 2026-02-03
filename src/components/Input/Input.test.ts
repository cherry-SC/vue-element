import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  it("基本展示", () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        // disabled: false,
      },
      slots:{
        prepend: 'prepend',
        prefix: 'prefix',
      }
    })
    console.log(wrapper.html());
    expect(wrapper.html()).toContain('sc-input--small')
    expect(wrapper.html()).toContain('is-prepend')
  })
})
