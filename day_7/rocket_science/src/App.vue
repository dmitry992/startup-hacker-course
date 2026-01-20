<template>
  <div class="s-space">
      <div class="s-space-stats">
        <div class="s-space-stats-item">
          <span>Всего запущено:</span>
          <strong>{{ totalShipsCount }}</strong>
        </div>
        <div class="s-space-stats-item">
          <span>Активных:</span>
          <strong>{{ activeShipCount }}</strong>
        </div>
        <div class="s-space-stats-item">
          <span>Разбито:</span>
          <strong>{{ crashedShipCount }}</strong>
        </div>
      </div>
      <ShipSelector :ships @openForm="openForm"/>
      <div class="s-space-stage">
        <transition-group name="s-ship-launch">
          <Ship
              v-for="ship in activeShips"
              :key="ship.id"
              :ship="ship"
              :custom-style="getShipStyle(ship)"
              :custom-class="{ 'is-crashed': ship.isCrashed, 's-space-active-ship': true }"
              :activeShip="true"
              @click="refuel(ship)"
          />
        </transition-group>
      </div>
      <SDialog v-model="isShown" title="Введите имя корабля" width="500px">
        <ShipForm @startShip="startShip"/>
      </SDialog>
  </div>
</template>
<script setup>
  import {ref,onMounted,onUnmounted, computed} from 'vue'
  import { SDialog } from 'startup-ui';
  import ShipForm from '@/components/ShipForm.vue'
  import ShipSelector from '@/components/ShipSelector.vue'
  import Ship from "@/components/Ship.vue";

  const selectedShip = ref(null);

  const openForm = (ship) => {
    selectedShip.value = ship;
    isShown.value = true;
  };

  const ships = ref([
    {
      id: 1,
      capacity: 100,
      speed: 10,
      img: '/ship.png',
      crashedImg: '/ship_crashed3.png'
    },
    {
      id: 2,
      capacity: 70,
      speed: 5,
      img: '/ship1.png',
      crashedImg: '/ship_crashed1.png'
    },
    {
      id: 3,
      capacity: 100,
      speed: 7,
      img: '/ship2.png',
      crashedImg: '/ship_crashed2.png'
    },
    {
      id: 4,
      capacity: 50,
      speed: 3,
      img: '/ship4.png',
      crashedImg: '/ship_crashed4.png'
    },
    {
      id: 5,
      capacity: 90,
      speed: 6,
      img: '/ship5.png',
      crashedImg: '/ship_crashed5.png'
    }
  ]);
  const activeShips = ref([]);
  const isShown = ref(false)

  const startShip = (name) => {
    if (!name) return;
    activeShips.value.push({
      id: Date.now(),
      name: name,
      fuel: selectedShip.value.capacity,
      maxFuel: selectedShip.value.capacity,
      speed: selectedShip.value.speed,
      img: selectedShip.value.img,
      crashedImg: selectedShip.value.crashedImg,
      isCrashed: false,
      altitude: 0,
      posX: Math.random() * 60 + 20
    });

    isShown.value = false;

  };

  const refuel = (ship) => {
    if (!ship.isCrashed) ship.fuel = ship.maxFuel
  }

  let timer

  onMounted(() => {
    timer = setInterval(() => {
      const maxHeight = window.innerHeight - 150;

      activeShips.value.forEach(ship => {
        if (ship.fuel > 0) {
          ship.fuel -= (ship.speed * 0.1)
          if (ship.fuel <= 0) {
            ship.fuel = 0
            ship.isCrashed = true
          }
        }

        if (!ship.isCrashed && ship.fuel > (ship.maxFuel * 0.1)) {
          if (ship.altitude < maxHeight) {
            ship.altitude += (ship.speed * 0.5)
          } else {
            ship.altitude = maxHeight
          }
        } else {
          if (ship.altitude > 0) {
            ship.altitude -= 5
          } else {
            ship.altitude = 0
          }
        }
      })
    }, 50)
  })

  const totalShipsCount = computed(() => activeShips.value.length)

  const activeShipCount = computed(() => {
    return activeShips.value.filter(ship => !ship.isCrashed).length
  })

  const crashedShipCount = computed(() => {
    return activeShips.value.filter(ship => ship.isCrashed).length
  })

  const getShipStyle = (ship) => ({
    bottom: ship.altitude + 'px',
    left: ship.posX + '%',
    transition: 'bottom 0.05s linear'
  })

  onUnmounted(() => clearInterval(timer))


</script>
<style scoped>
.s-space {
  min-height: 100vh;
  width: 100%;
  background-image: url('/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.s-space::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

h1{
  position: relative;
  z-index: 1;
  color: white;
}

.s-ship-launch-enter-active {
  transition: all 0.8s ease-out;
}
.s-ship-launch-enter-from {
  opacity: 0;
  transform: translateY(100px) scale(0.5);
}
.is-crashed {
  transition: all 1s ease-in;
}

.s-space-stage {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.s-space-stats {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #050817;
  border-radius: 8px;
  padding: 15px;
  color: white;
  z-index: 1000;
  min-width: 200px;
}

.s-space-stats-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.s-space-stats-item:last-child{
  margin-bottom: 0;
}

</style>