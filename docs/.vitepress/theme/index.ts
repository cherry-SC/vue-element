import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import '../../../src/styles/index.css'
import './custom.css'

import ScButton from '../../../src/components/Button/Button.vue'
import ScIcon from '../../../src/components/Icon/Icon.vue'
import ScAlert from '../../../src/components/Alert/Alert.vue'
import ScCollapse from '../../../src/components/Collapse/Collapse.vue'
import ScCollapseItem from '../../../src/components/Collapse/CollapseItem.vue'
import ScTooltip from '../../../src/components/Tooltip/Tooltip.vue'
import ScDropdown from '../../../src/components/Dropdown/Dropdown.vue'
import ScInput from '../../../src/components/Input/Input.vue'
import DemoBlock from './components/DemoBlock.vue'

library.add(fas)

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    app.component('ScButton', ScButton)
    app.component('ScIcon', ScIcon)
    app.component('ScAlert', ScAlert)
    app.component('ScCollapse', ScCollapse)
    app.component('ScCollapseItem', ScCollapseItem)
    app.component('ScTooltip', ScTooltip)
    app.component('ScDropdown', ScDropdown)
    app.component('ScInput', ScInput)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
