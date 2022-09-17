<script>
  import Tostar from '../../classes/tostar.js';

  Vue.component("Tostar", {
      template: `
        <div class="tostar-container">
            <p class="headline-medium">message</p>
            <div class="tostar-btn" @click="Tostar.removeTostarClick(this.parentNode)"></div>
        </div>
      `,
      data() {
          return {}
      },
      mounted() {

      }

  });

</script>

