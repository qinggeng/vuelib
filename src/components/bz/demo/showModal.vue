<template>
  <mainframe :storeObject='store'>
    <div slot='content'>
      <input type="button" value="show modal" @click='show_modal'/>
    </div>
  </mainframe>
</template>

<script>
import MainFrame      from '@/components/ui/mainFrame';
import store          from '@/store/index';
import {mapMutations} from 'vuex';

export default {
  props: {
  },
  data: function ()
  {
    return {
      store: store,
    };
  },
  methods: {
    ...mapMutations({
      do_show_modal: 'show_modal',
    }),
    show_modal: function (ev) {
      this.do_show_modal({
        template: `
<div :style='styles'>
  <input type="button" value="show modal" @click='show_modal'/>
</div>`.trim(),
        data: function () {
          return {
            styles: {
              width: '300px',
              height: '200px',
              background: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          };
        },
        created: function () {
          let closure = {};
          closure.timerId = window.setTimeout(((c) =>
          {
            this.$emit('window-closed', this);
            window.clearTimeout(c.timerId);
          }).bind(this, closure), 1000);
        },
        methods: {
          show_modal: function(ev) {
            this.$store.commit('show_modal', {
              template: `<div :style = 'styles'>modal 2</div>`,
              data: function () {
                return {
                  styles: {
                    width: '150px',
                    height: '100px',
                    background: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                };
              },
            });
          },
        },
      });
    },
  },
  components: {
    mainframe: MainFrame,
  },
}
</script>
