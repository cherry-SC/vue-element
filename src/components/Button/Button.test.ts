import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    // expect(Button).toBeTruthy()
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'Test Button',
      },
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('sc-button--primary')
    expect(wrapper.get('button').text()).toBe('Test Button')
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })
    // 测试按钮是否被禁用,attributes的作用是获取元素的属性值
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-right',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-right')
  })

  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['Icon'],
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
