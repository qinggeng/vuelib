<template>
  <div :style = 'styles.frame'>
    <div :style = 'styles.left_side_bar'>
    </div>
    <div :style = 'styles.drag_border'/>
    <div :style = 'styles.main_content'>
    </div>
  </div>
</template>

<script>
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
  data: function() { return {}; },
}
</script>

