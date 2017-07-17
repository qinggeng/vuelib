<template>
  <div :style = 'styles.frame || defaultStyle.frame'>
    <slot name='win1'/>
    <div 
      :style         = 'styles.bar || defaultStyle.bar'
      @mousedown     = "willDrag"
      @touchstart    = "willDrag"
      @touchmove     = "dragging"
      @touchend      = "dragged"
      @touchcanceled = "dragCancel"/>
    <slot name='win2'/>
  </div>
</template>

<script>
const drag_border_style = {
  width: '4px',
  background: '#000',
  cursor: 'col-resize',
};

const frame_style = {
  display: 'flex',
  flexDirection: 'row',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  padding: '2px',
  background: '#000',
  position: 'absolute',
};

export default {
  props: {
    styles: {
      type: Object,
      default: function () {
        return {
          bar: drag_border_style,
        };
      },
    }
  },
  data: function() {
    return {
      draggingExecutor: () => {},
      draggingCanceler: () => {},
      defaultStyle: {
        frame: frame_style,
        bar: drag_border_style,
      },
    };
  },
  methods: {
    willDrag: function(ev) {
      const originEventHandles = {
        up   : document.onmouseup,
        down : document.onmousedown,
        move : document.onmousemove,
        out  : document.onmouseout,
      };

      const recover = ((orig) => {
        document.onmouseup   = orig.up;
        document.onmousedown = orig.down;
        document.onmousemove = orig.move;
        document.onmouseout  = orig.out;
      }).bind(this, originEventHandles);

      document.onmouseup = ((restore, ev) => {
        console.log(`up to restore`);
        restore();
      }).bind(this, recover);
      /*
      document.onmouseout = ((restore, ev) => {
        console.log(`out to restore`);
        restore();
      }).bind(this, recover);
      */

      document.onmousemove = ((origX, origY, originHandlers, ev) => {
        console.log(`moving`);
        var deltaX = ev.screenX - origX;
        this.$el.style.transform = 'translate(' + deltaX + 'px, 0)';
      }).bind(this, ev.screenX, screenY, originEventHandles);
    },
    dragging: function(ev) {
      this.draggingExecutor(ev);
    },
    dragged: function(ev) {
      console.log(`dragged`);
      this.draggingExecutor = () => {};
    },
    dragCancel: function(ev) {
      console.log(`drag canceld`);
    },
  },
}
</script>

