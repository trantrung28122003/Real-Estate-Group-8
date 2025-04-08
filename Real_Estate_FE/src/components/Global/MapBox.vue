<template>
  <div id="map" ref="mapContainer" style="width: 100%; height: 450px;"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import mapboxSdk from '@mapbox/mapbox-sdk';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

export default {
  name: 'MapboxMap',
  props: {
    address: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      map: null,
      mapboxClient: null,
      lng: null,
      lat: null,
    };
  },
  mounted() {
    this.initializeMapbox();
  },
  methods: {
    initializeMapbox() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaHViYW5nMTI0MjAxIiwiYSI6ImNseDZiaTF5cDFxcHcyaXExN2pwZHd5OXIifQ.Hc2t-jFbDI3O3Gxy82_zmw';
      this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      const geocodingClient = mapboxGeocoding(this.mapboxClient);

      geocodingClient
        .forwardGeocode({
          query: this.address,
          limit: 1
        })
        .send()
        .then((response) => {
          if (response && response.body && response.body.features && response.body.features.length) {
            const feature = response.body.features[0];
            this.lng = feature.center[0];
            this.lat = feature.center[1];
            this.initializeMap();
          } else {
            console.error('Geocoding không trả về kết quả nào.');
          }
        })
        .catch((error) => {
          console.error('Lỗi geocoding:', error);
        });
    },
    initializeMap() {
      if (this.lng !== null && this.lat !== null) {
        this.map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.lng, this.lat],
          zoom: 15,
        });

        new mapboxgl.Marker()
          .setLngLat([this.lng, this.lat])
          .addTo(this.map);
      }
    },
  },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 450px;
    overflow: hidden; /* Đảm bảo các thành phần không bị tràn ra ngoài */
}

.leaflet-marker-icon {
    max-width: 30px;
    max-height: 30px;
}
</style>
