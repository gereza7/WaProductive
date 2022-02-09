<template>

  <main class="wrapper">
    <div class="titulo home">
      <h2>Seleccione la sala a la que desea entrar</h2>
    </div>
    <div style="border:black">
      <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Meeting
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Sala Principal
        </v-list-item-title>
        <v-list-item-subtitle>Sala principal para la reunión de todo el equipo</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <div class="centrado">

   <button v-on:click="submitJoinRoom" class="boton1">Entrar</button>
      </div>
       
  
    </v-card-actions>
  </v-card>
    </div>
   

    <div class="call-container" :class="{ hidden: status === 'home' }">
      <!-- The Daily Prebuilt iframe is embedded in the div below using the ref -->
      <div id="call" ref="callRef"></div>
      <!-- Only show the control panel if a call is live -->
      <controls
        v-if="status === 'call'"
        :roomUrl="roomUrl"
        :callFrame="callFrame"
      />
    </div>
  </main>
</template>

<script>
import DailyIframe from "@daily-co/daily-js";
import Controls from "../Controls.vue";
import api from "../api.js";

const IFRAME_OPTIONS = {
  height: "100%",
  width: "100%",
  aspectRatio: 16 / 9,

  border: "1px solid var(--grey)",
  borderRadius: "4px",
};

export default {
  components: { Controls },
  name: "Home",
  data() {
    return {
      roomUrl: "https://waproductive.daily.co/Principal",
      status: "home",
      callFrame: null,
      validRoomURL: true,
      roomError: false,
    };
  },
  computed: {
    runningLocally() {
      return window?.location?.origin.includes("localhost");
    },
  },
  methods: {
    createAndJoinRoom() {
      api
        .createRoom()
        .then((room) => {
          this.roomUrl = room.url;
          this.joinRoom(room.url);
        })
        .catch((e) => {
          console.log(e);
          this.roomError = true;
        });
    },
    // Daily callframe created and joined below
    joinRoom(url) {
      if (this.callFrame) {
        this.callFrame.destroy();
      }

      // Daily event callbacks
      const logEvent = (ev) => console.log(ev);
      const goToLobby = () => (this.status = "lobby");
      const goToCall = () => (this.status = "call");
      const leaveCall = () => {
        if (this.callFrame) {
          this.status = "home";
          this.callFrame.destroy();
        }
      };
      // DailyIframe container element
      const callWrapper = this.$refs.callRef;

      // Create Daily call
      const callFrame = DailyIframe.createFrame(callWrapper, {
        iframeStyle: IFRAME_OPTIONS,
        showLeaveButton: true,
      });
      this.callFrame = callFrame;

      // Add event listeners and join call
      callFrame
        .on("loaded", logEvent)
        .on("started-camera", logEvent)
        .on("camera-error", logEvent)
        .on("joining-meeting", goToLobby)
        .on("joined-meeting", goToCall)
        .on("left-meeting", leaveCall);

      callFrame.join({ url, showFullscreenButton: true });
    },
    submitJoinRoom(e) {
      e.preventDefault();
      this.joinRoom(this.roomUrl);
    },
    validateInput(e) {
      this.validRoomURL = !!this.roomUrl && e.target.checkValidity();
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: var(--grey-lightest);
  height: 100%;
  display: flex;
  align-items: center;
}
.home {
  flex: 1;
}
.error {
  color: var(--red-dark);
}
.call-container {
  display: flex;

  height: 104%;
  position:absolute;
  margin: auto;

}


.call-container.hidden {
  flex: 0;
}
#call {
  flex: 1;
  margin-top: 24px;
}
.start-call-container {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: auto;
}
.start-call-container .subtext {
  margin: 8px 0 0;
}
.start-call-container input {
  margin-top: 8px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--grey);
  padding: 0 16px;
}
.start-call-container button {
  color: var(--dark-blue);
  background: var(--teal);
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}
.start-call-container input[type="submit"] {
  color: var(--dark-blue);
  background: var(--teal);
  border: 1px solid transparent;
  padding: 6px 16px 8px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}
button:disabled,
.start-call-container input[type="submit"]:disabled {
  cursor: not-allowed;
  background: var(--white);
  border: 1px solid var(--grey);
}
label {
  opacity: 0;
  font-size: 1px;
}



.titulo{
     position:absolute;
   left:5%;
   top:5%;
   bottom:30%;
   width:70%;
   height:5%;
   text-align:left;
}

.boton1{
background-color: #14876E;
padding: 10px;
border-radius: 10px;

}

.centrado{
display: flex;
  justify-content: center;
}
</style>
