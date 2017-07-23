
<template>
  <div style="flex-grow: 1">
    <div :style = "appliedStyles.content_frame">
      <slot name="content"/>
    </div>
    <div :style = "appliedStyles.modal">
      <div 
        v-for='wnd of modal_stack'  
        style="
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgb(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
      ">
        <component :is='wnd' @window-closed='((data)=>{onCloseModalWnd(wnd, data);}).bind(this, wnd)'/>
      </div>
    </div>
  </div>
</template>

<script>
const content_frame_style = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
};

const main_frame_style = {
  content_frame: content_frame_style,
};

const modal_style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  visibility: 'hidden',
};

export default {
  props: {
    styles: {
      type: Object,
      default: function () { return main_frame_style; },
    },
    storeObject: {
      type: Object,
    },
  },
  data: function() {
    return {
      modal_stack: [],
      modal_style: {...modal_style},
      modal_wnd: {
        template: `<div><span>modal place holder</span></div>`,
      },
    };
  },
  methods: {
    show_modal: function(comp) {
      this.modal_stack.push(comp);
    },
    onCloseModalWnd: function(wnd, data) {
      this.modal_stack = this.modal_stack.filter(x => x !== wnd);
    },
  },
  computed: {
    appliedStyles: function () {
      var applied = {...this.styles, modal: this.modal_style};
      applied.modal.zIndex = 1;
      applied.modal.visibility = this.modal_stack.length > 0 ? 'visible' : 'hidden';
      return applied;
    },
  },
  components: {
  },
  created: function () {
    let store = this.storeObject;
    if (undefined !== store && undefined !== store.commit)
    {
      store.commit('set_modal_manager', this);
    }
    else
    {
      console.log('模态管理器注册失败');
    }
  }
}
</script>

