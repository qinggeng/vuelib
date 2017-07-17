<template>
  <div :style = 'styles.frame || defaultStyle.frame' ref='frameWindow'>
    <div ref = 'container_one' :style='defaultStyle.container_one'>
      <slot name='win1'/>
    </div>
    <div 
      :style         = 'styles.bar || defaultStyle.bar'
      @mousedown     = "willDrag"
      @touchstart    = "willDrag"
      @touchmove     = "dragging"
      @touchend      = "dragged"
      @touchcanceled = "dragCancel"/>
    <div ref = 'container_two' :style='defaultStyle.container_two'>
      <slot name='win2'/>
    </div>
  </div>
</template>

<script>
const drag_border_style = {
  width: '4px',
  background: '#EEE',
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

const container_one_style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const container_two_style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
    },
    initial_ratio: {
      type: String,
      default: function () {
        return '1:1';
      }
    },
  }, // end of props

  data: function() {
    return {
      draggingExecutor: () => {},
      draggingCanceler: () => {},
      defaultStyle: {
        frame: frame_style,
        bar: drag_border_style,
        container_one: container_one_style,
        container_two: container_two_style,
      },
    };
  }, // end of data

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

      document.onmouseup = ((origX, origY, restore, dragTarget, ev) => {
        dragTarget.style.transform = '';
        let c1 = this.$refs.container_one;
        let c2 = this.$refs.container_two;
        let deltaX = ev.screenX - origX;
        let newStyle = JSON.parse(JSON.stringify(this.defaultStyle));
        newStyle.container_one.width = (c1.clientWidth + deltaX) + 'px';
        newStyle.container_two.width = (c2.clientWidth - deltaX) + 'px';
        this.defaultStyle = newStyle;
        restore();
      }).bind(this, ev.screenX, screenY, recover, ev.target);

      document.onmousemove = ((origX, origY, originHandlers, dragTarget, ev) => {
        var deltaX = ev.screenX - origX;
        dragTarget.style.transform = 'translate(' + deltaX + 'px, 0)';
      }).bind(this, ev.screenX, screenY, originEventHandles, ev.target);
    },
    dragging: function(ev) {
    },
    dragged: function(ev) {
    },
    dragCancel: function(ev) {
      console.log(`drag canceld`);
    },
  }, // end of methods

  created: function () {
    let normalize = (x) => {
      let value = Number(x);
      if (!isNaN(value))
      {
        return {
          type: 'relative',
          value: value,
        };
      }
      if (x.slice(-2) === 'px')
      {
        return {
          type: 'absolute',
          value: x,
        };
      }
      if (x === '--')
      {
        return {
          type: 'ignore',
        };
      }
    };

    let set_container_initial_ratio = (ratio, container_style) => {
      if (ratio.type === 'absolute')
      {
        container_style.width = ratio.value;
      }
      else if (ratio.type === 'ignore')
      {
        container_style.flexGrow = 1;
      }
      else if (ratio.type === 'relative')
      {
        container_style.flexGrow = ratio.value;
      }
    };

    let ratio        = this.initial_ratio;
    let ratioPattern = /\s*([^:]+)\s*:\s*([^:]+)\s*/;
    let match        = ratioPattern.exec(ratio);
    let first        = normalize(match[1]);
    let second       = normalize(match[2]);

    set_container_initial_ratio(first, this.defaultStyle.container_one);
    set_container_initial_ratio(second, this.defaultStyle.container_two);
  },
}
</script>

