import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
// import { h } from 'vue'
// import Icon from '../Icon/Icon.vue'
import Item from './CollapseItem.vue'
// import CollapseItem from './CollapseItem.vue'
describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() =>
      <Collapse modelValue={['a']} onChange={onChange}>
        <Item name="a" title="a">
          content a
        </Item>
        <Item name="b" title="b">
          content b
        </Item>
        <Item name="c" title="c" disabled>
          content c
        </Item>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })
    console.log(wrapper.html())
    const headers = wrapper.findAll('.sc-collapse-item__header')
    const contents = wrapper.findAll('.sc-collapse-item__wrapper')
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    expect(headers[0]?.text()).toBe('a')
    expect(headers[1]?.text()).toBe('b')
    expect(contents[0]?.text()).toBe('content a')
    expect(contents[1]?.text()).toBe('content b')

    expect(contents[0]?.isVisible()).toBeTruthy()
    expect(contents[1]?.isVisible()).toBeFalsy()

    // await 点击后等待动画完成,不加await会立即执行,导致断言失败
    await headers[0]?.trigger('click')
    expect(onChange).toHaveBeenCalledWith([])
    expect(contents[0]?.isVisible()).toBeFalsy()

    expect(headers[2]?.classes()).toContain('is-disabled')
    await headers[2]?.trigger('click')
    expect(contents[2]?.isVisible()).toBeFalsy()
  })
})
