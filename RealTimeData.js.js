// Initialize the map
var map = L.map('map').setView([20.0, 5.0], 2);

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Replace with the correct GDACS endpoint
const gdacsEndpoint = 'https://webtools.europa.eu/load.js';  // Assuming this is the correct endpoint

// Fetch GDACS data
fetch(gdacsEndpoint)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data); // Log the fetched data for debugging

        // Process the data and add markers to the map
        data.features.forEach(event => {
            var lat = event.geometry.coordinates[1];  // Adjust based on actual data structure
            var lon = event.geometry.coordinates[0]; // Adjust based on actual data structure
            var alertLevel = event.properties.alertlevel;
            var title = event.properties.title;

            // Customize marker based on alert level
            var markerColor;
            if (alertLevel === 'Green') {
                markerColor = 'green';
            } else if (alertLevel === 'Orange') {
                markerColor = 'orange';
            } else if (alertLevel === 'Red') {
                markerColor = 'red';
            }

            var marker = L.circleMarker([lat, lon], {
                color: markerColor,
                radius: 8
            }).addTo(map);

            // Add popup to marker
            marker.bindPopup(`<b>${title}</b><br>Alert Level: ${alertLevel}`);
        });
    })
    .catch(error => console.error('Error fetching GDACS data:', error));
