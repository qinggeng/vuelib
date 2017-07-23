import Vue                       from 'vue'
import Router                    from 'vue-router'
import Hello                     from '@/components/Hello'
import mainFrame                 from '@/components/ui/mainFrame'
/* import {routes as demoRoutes} from '@/components/bz/demo/router.js' */
import HorizontalSplitWindow     from '@/components/bz/demo/horizontalSplittWindow';
import ShowModal                 from '@/components/bz/demo/showModal';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/ui/main',
      name: 'MainFrame',
      component: mainFrame,
    },
    {
      path: '/demo/horizontal-split-window',
      component: HorizontalSplitWindow,
    },
    {
      path: '/demo/show-modal',
      component: ShowModal,
    },
  ]
})
