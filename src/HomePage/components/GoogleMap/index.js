import React, {useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import data from "../../../config.json";


export function MapContainer(props) {
    const {mapData={}, getCoordinates, handleChangeMapData} = props;
    const {longitude, latitude, address, reRender} = mapData;
    useEffect(() => {
        getLocation();
        handleChangeMapData("reRender", false)
      }, [reRender]);

    //use to update the state
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                handleChangeMapData("address", address)
                handleChangeMapData("latitude", latLng.lat)
                handleChangeMapData("longitude", latLng.lng)
            })
            .catch(error => console.error('Error', error));
    };
    return (
        <div id="googleMap">
            <PlacesAutocomplete
                value={address}
                onChange={(e)=> handleChangeMapData("address", e)}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, idx) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        key={idx}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <Map google={props.google}  style={{width: "40vw", height: "20vw"}}
                initialCenter={{
                    lat: latitude, lng: longitude
                }}
                center={{
                    lat: latitude, lng: longitude
                }}
            >
                <Marker position={{ lat: latitude, lng: longitude }} />
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: (data.API_KEY)
})(MapContainer)