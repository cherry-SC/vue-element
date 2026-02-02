import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Tooltip from "./Tooltip.vue";

// Tooltip 内部会在打开时调用 Popper 的 createPopper 来计算浮层位置。
// 在单元测试（jsdom）环境里我们不关心布局/定位结果，只关心“是否渲染/是否触发事件”。
// 因此这里把 @popperjs/core 的 createPopper mock 掉，避免：
// 1) 依赖真实 DOM 测量导致的不稳定；
// 2) 在测试里引入不必要的副作用。
vi.mock("@popperjs/core", () => {
  return {
    createPopper: vi.fn(() => ({
      destroy: vi.fn(),
    })),
  };
});

// Tooltip 里使用 lodash debounce 来实现 openDelay/closeDelay。
// 测试里配合 vitest fake timers 时，需要“推进时间”并等待 Vue 刷新 DOM。
// 这里封装一个小工具函数，确保每次推进计时器后都等到下一轮渲染完成。
const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await nextTick();
};

describe("Tooltip.vue", () => {
  beforeEach(() => {
    // 每个用例前都开启 fake timers：
    // - 这样我们可以精确控制 openDelay/closeDelay（debounce 的 setTimeout）
    // - 也能在用例里快速推进时间，不需要真实等待
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 清理本文件里所有 mock 计数、调用参数等，避免用例之间互相污染
    vi.clearAllMocks();
    // 恢复真实计时器，避免影响其他测试文件
    vi.useRealTimers();
  });

  test("默认不显示内容，hover 可打开/关闭并触发 visible-change", async () => {
    // Tooltip emits: 'visible-change'，参数为 boolean（true=显示，false=隐藏）
    const onVisibleChange = vi.fn();
    const wrapper = mount(
      () => (
        // TSX 里监听 kebab-case 的 emit 事件需要用字符串 key：
        // TooltipEmits: (e: 'visible-change', visible: boolean) => void
        // 在 JSX/TSX 中用 {...{ "onVisible-change": fn }} 来绑定最稳妥（可通过 type-check）
        <Tooltip content="hello" {...{ "onVisible-change": onVisibleChange }}>
          <button class="trigger-btn">trigger</button>
        </Tooltip>
      ),
      { attachTo: document.body }
    );

    // 初始状态：isOpen=false，浮层不存在（v-if）
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    // hover 打开：mouseenter 绑定在 .sc-tooltip__trigger 上
    await wrapper.get(".sc-tooltip__trigger").trigger("mouseenter");
    // 默认 openDelay=0，但因为内部使用 debounce，仍需推进一次计时器队列
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(true);
    // 未提供 content 插槽时，会渲染 props.content
    expect(wrapper.find(".sc-tooltip__popper").text()).toContain("hello");
    // 打开时 emit visible-change(true)
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    // hover 关闭：mouseleave 绑定在最外层 .sc-tooltip 上（outerEvents）
    await wrapper.get(".sc-tooltip").trigger("mouseleave");
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);
    // 关闭时 emit visible-change(false)
    expect(onVisibleChange).toHaveBeenCalledWith(false);

    wrapper.unmount();
  });

  test("click 触发可切换显示隐藏，点击外部自动关闭", async () => {
    // 这里直接 mount 组件本身（而不是 JSX 包一层）：
    // - 这样 slots 的写法更直观
    // - 也避免 TSX 里 <template #content> 这种语法不被解析的问题
    const wrapper = mount(Tooltip, {
      props: {
        trigger: "click",
      },
      slots: {
        // 默认插槽：触发元素
        default: () => <button class="trigger-btn">trigger</button>,
        // 命名插槽 content：浮层内容
        content: () => <div class="tooltip-content">content</div>,
      },
      attachTo: document.body,
    });

    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    // click 打开：click 事件绑定在 .sc-tooltip__trigger 上
    await wrapper.get(".sc-tooltip__trigger").trigger("click");
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(true);
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);

    // clickOutside：Tooltip 内部通过 useClickOutside 在 document 上监听 click
    // 当点击发生在 popperContainerNode 之外时，会触发关闭
    const outside = document.createElement("div");
    outside.className = "outside";
    document.body.appendChild(outside);
    // 用原生 click 触发 document 事件（更贴近 useClickOutside 的实现）
    outside.click();
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    outside.remove();
    wrapper.unmount();
  });

  test("openDelay/closeDelay 生效", async () => {
    // openDelay/closeDelay 都是毫秒：内部用 debounce(open, delay) / debounce(close, delay)
    const wrapper = mount(
      () => (
        <Tooltip content="delayed" openDelay={300} closeDelay={300}>
          <button class="trigger-btn">trigger</button>
        </Tooltip>
      ),
      { attachTo: document.body }
    );

    await wrapper.get(".sc-tooltip__trigger").trigger("mouseenter");
    // 推进 299ms：未到 openDelay，仍不显示
    await advance(299);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);
    // 再推进 1ms：达到 300ms，显示
    await advance(1);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(true);

    await wrapper.get(".sc-tooltip").trigger("mouseleave");
    // 推进 299ms：未到 closeDelay，仍显示
    await advance(299);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(true);
    // 再推进 1ms：达到 300ms，隐藏
    await advance(1);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    wrapper.unmount();
  });

  test("manual 模式不自动绑定事件，但暴露的 show/hide 可用", async () => {
    // manual=true：组件不会 attachEvents（hover/click 事件都不绑定）
    // 这时只能通过 defineExpose 暴露的 show()/hide() 来控制显示隐藏
    const wrapper = mount(Tooltip, {
      props: {
        manual: true,
        content: "manual",
      },
      slots: {
        default: () => <button class="trigger-btn">trigger</button>,
      },
      attachTo: document.body,
    });

    // 触发 hover 不会打开（因为没有绑定 mouseenter/mouseleave）
    await wrapper.get(".sc-tooltip__trigger").trigger("mouseenter");
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    // show(): 内部对应 openFinal（会 cancel closeDebounce 并触发 openDebounce）
    // wrapper.vm 是 Vue Test Utils 暴露的“组件实例代理”（组件的 public instance）。
    // Tooltip 在 <script setup> 里通过 defineExpose 暴露了 show()/hide()，因此可以从 vm 上直接调用。
    // 这里用 any 是为了绕开 TS 对 vm 上方法的类型限制（测试只关心行为，不强行约束实例类型）。
    (wrapper.vm as any).show();
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(true);

    // hide(): 内部对应 closeFinal（会 cancel openDebounce 并触发 closeDebounce）
    (wrapper.vm as any).hide();
    await advance(0);
    expect(wrapper.find(".sc-tooltip__popper").exists()).toBe(false);

    wrapper.unmount();
  });
});
