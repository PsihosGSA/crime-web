import React from 'react';
import AppMarker from "../AppMarker/index";

import {LayerGroup} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

class AppLayerGroupe extends React.Component {
    render() {
        console.log(this.props.layerGroup);
        return (<LayerGroup>
                    <MarkerClusterGroup>
                        {Object.values(this.props.layerGroup.markers).map((element) => <AppMarker key={JSON.stringify(element)} marker={element}/>)}
                    </MarkerClusterGroup>
                </LayerGroup>)
    }
}

export default AppLayerGroupe;