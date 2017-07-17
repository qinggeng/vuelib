
<template>
  <splitwindow :initial_ratio = "'200px:--'">
    <div :style = 'styles.left_side_bar' slot='win1'>
    </div>
    <div :style = 'styles.main_content' slot='win2'>
    </div>
  </splitwindow>
</template>

<script>
import SplitWindow from '@/components/ui/SplitWindow';
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

const left_side_bar_style = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '200px',
  height: '100%',
  background: '#F00',
};

const main_content_style = {
  flexGrow: 1,
  height: '100%',
  background: '#0F0',
};

const drag_border_style = {
  width: '4px',
  background: '#000',
  cursor: 'col-resize',
};

const main_frame_style = {
  frame: frame_style,
  left_side_bar: left_side_bar_style,
  main_content: main_content_style,
  drag_border: drag_border_style,
};

export default {
  props: {
    styles: {
      type: Object,
      default: function () { return main_frame_style; },
    }
  },
  data: function() {
    return {
      draggingExecutor: () => {},
    };
  },
  methods: {
    willDrag: function(ev) {
      console.log('will drag');
      this.draggingExecutor = ((origX, origY, ev) => {
        var deltaX = ev.screenX - origX;
        this.$el.style.transform = 'translate(' + deltaX + 'px, 0)';
      }).bind(this, ev.screenX, screenY);
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
  components: {
    splitwindow: SplitWindow,
  },
}
</script>

