<template>
  <div id="app">
    <flash-message
      transitionName="flash"
      class="flashpool"
    ></flash-message>
    <section class="cpanel">
      <div class="cpanel__wrapper">
        <div class="cpanel__group">
          <label class="cpanel__label" for="messageType">Flash message type</label>
          <select id="messageType" name="messageType" v-model="messageType">
            <option selected>success</option>
            <option>error</option>
            <option>warning</option>
            <option>info</option>
          </select>
          <span class="cpanel__hint">Flasm message preset class. You can use your own classes though.</span>
        </div>

        <div class="cpanel__group">
          <label class="cpanel__label" for="messageContents">Message contents</label>
          <input class="cpanel__input" type="text" id="messageContents" name="messageContents" v-model="messageContents"/>
          <span class="cpanel__hint">Plain text or html.</span>
        </div>

        <div class="cpanel__group">
          <label class="cpanel__label" for="config__delay">Autoclose delay</label>
          <input class="cpanel__input" v-model="delay" id="config__delay"/>
          <span class="cpanel__hint">Delay in milliseconds. Set to 0 to disable.</span>
        </div>

        <div class="cpanel__group">
          <input class="cpanel__checkbox" v-model="messageImportant" id="config__important" type="checkbox"/>
          <span>important</span>
          <span class="cpanel__hint">Set to true to remove close control.</span>
        </div>
        <button v-on:click="clickButton">Spawn flash message</button>
      </div>
      <div class="cpanel__donate">
        <a href='https://ko-fi.com/V7V27B99' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      messageType: 'success',
      messageContents: 'Hello world',
      messageImportant: false,
      delay: 0,
    };
  },

  methods: {
    clickButton() {
      const flashMessage = this.flash(this.messageContents, this.messageType, {
        timeout: this.delay,
        important: this.messageImportant,
      });
    }
  },

  created() {
    const greetings = this.flash('Hi there, pal. Vue-flash-message is made to be <strong>simple and compact yet flexible</strong>. I hope you enjoy it :3', 'info', {
      timeout: 0,
      important: true,
    });
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.flashpool {
  box-sizing: border-box;
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: 400px;
  width: 260px;
  perspective: 400px;
}

.flashpool .flash__message {
  width: 260px;
  transition: all 500ms;
  display: flex;
  font-family: 'Oxygen', sans-serif;
  font-size: 13px;
  line-height: 130%;
}

.flash-enter, .flash-leave-to {
  opacity: 0;
  transform: rotateX(-30deg) scale(.88) translateY(-30px);
}

.flash-leave-active {
  position: absolute;
}

.cpanel {
  font-family: 'Oxygen', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 40px 24px 0 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(235, 234, 234);
}

.cpanel__wrapper {
  height: 100%;
  padding-bottom: 24px;
}

.cpanel__donate {
  flex-shrink: 0;
  padding-bottom: 24px;
  display: flex;
  justify-content: center;
  opacity: .3;
}

.cpanel__donate:hover {
  opacity: 1;
}

.cpanel__group {
  font-size: 13px;
  margin: 0 10px 31px 0;
}

.cpanel__input {
  appearance: none;
  border: none;
  font-size: 18px;
  padding: 0 0 6px 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
}

.cpanel__checkbox {
  margin-right: 3px;
  margin-bottom: 5px;
}

.cpanel input:focus {
  box-shadow: none;
  outline: none;
  border-bottom: 2px solid #47B784;
}

.cpanel button {
  width: 100%;
  appearance: none;
  border: 1px solid #47B784;
  color: #47B784;
  font-weight: normal;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
}

.cpanel button:focus, .cpanel button:active {
  outline: none;
}

.cpanel button:active {
  background-color: rgb(225, 241, 234);
}

.cpanel__label, .cpanel__hint {
  display: block;
  margin-bottom: 5px;
  color: #7f8c8d;
  font-size: 0.85em;
}

.cpanel__label {
  cursor: pointer;
}

.cpanel__hint {
  margin-top: 5px;
  font-style: italic;
  color: #a1abac;
}
</style>
