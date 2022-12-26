import React from 'react';

const Map = () => {
	return (
		<div id="map-container-google-1" className="z-depth-1-half map-container">
			<iframe
				src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
				// frameBorder="0"
				allowFullScreen
			></iframe>
		</div>
	);
};

export default Map;
