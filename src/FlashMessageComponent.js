const defaultTemplate = `
<div class="flash__wrapper" @flash="updateFlash">
  <template v-for="(message, index) in storage">
    <transition
      :name="transitionName"
      :enter-active-class="transitionIn"
      :leave-active-class="transitionOut"
    >
      <div
        :class="cssClasses(index) + ' flash__message'"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="flash__message-content" v-html="message.message"></div>
        <button v-if="!message.important"
          type="button"
          class="flash__close-button"
          data-dismiss="alert"
          aria-label="alertClose"
          @click.stop.prevent="closeFlash(index)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </transition>
  </template>
</div>
`;

export default function ({
    // <Number> duration of auto close flash message (in milliseconds)
    duration = 3000,
    // <String> template to use display flash
    template = defaultTemplate,
    // <Boolean> if false then clear persisted storage every time
    keep = true,
    // <Storage> persistant storage
    storageKey = '$flashStorage',
    // <Array> custom css classes for template
    css = null,
  } = {}, bus,
) {
  return {
    template,
    props: {
      transitionName: {
        type: String,
        default: 'custom-classes-transition',
      },
      transitionIn: {
        type: String,
        default: 'animated fadeInDown',
      },
      transitionOut: {
        type: String,
        default: 'animated fadeOutUp',
      },
    },
    data() {
      return Object.assign({
        message: null,
        closed: false,
        _timeout: null,
      }, { duration, storageKey, css, keep });
    },
    computed: {
      storage() {
        return bus.flashStorage;
      },
      show() {
        return !this.closed;
      },
    },
    methods: {
      cssClasses(id) {
        return this.getFlash(id).type;
      },
      getFlash(id) {
        return this.storage[id];
      },

      closeFlash(id) {
        const storage = {};
        Object.assign(storage, bus.flashStorage);
        delete storage[id];
        bus.flashStorage = storage;
      },

      closeFlashAfterTimeout(id, timeout) {
        const flash = bus.flashStorage[id];
        flash.timer = window.setTimeout(() => {
          this.closeFlash(id);
        }, timeout);
      },

      updateFlash(msg) {
        console.log(msg);
      },
    },
    created() {
      bus.$on('flash', (id, msg, config) => {
        if (config.timeout > 0) {
          this.closeFlashAfterTimeout(id, config.timeout);
        }
      });
    },
    watch: {
      storage() {
        console.log('storage changed!');
      },
    },
  };
}