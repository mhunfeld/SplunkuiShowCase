import React, { useState, useEffect, useCallback } from 'react';
import SplunkVisualization from '@splunk/visualizations/common/SplunkVisualization';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import { cloneDeep } from 'lodash';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const position = [51.1642292, 10.4541194] 


// Extract data from the datasource a format usable by the table
const formatData = (dataSources) => {
    if (!dataSources.primary.data) {
        return {
            fields: [],
            data: [],
        };
    }

    // Get the names of the fields
    const fields = dataSources.primary.data.fields.map((f) => f.name);
    const data = [];

    // Convert the data from column to row form
    dataSources.primary.data.columns.forEach((col, i) => {
        col.forEach((item, j) => {
            if (!data[j]) {
                data.push({});
            }
            data[j][fields[i].replace(/\s/g, '')] = item;
        });
    });

    console.log('data', dataSources.primary.data);
    return { fields, data };
};

const LeafletMap = ({ options, dataSources }) => {
    const [tableData, setTableData] = useState(formatData(dataSources));

    useEffect(() => {
        setTableData(formatData(dataSources));
    }, [dataSources]);

    return (
        <MapContainer style={{ height: "100%", minHeight: "100%" }} center={position} zoom={7} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {tableData.data.map((row) => (
            <Marker position={[row.latitude, row.longitude]}>
                <Popup>
                    Name: {row.name} <br /> 
                    latitude: {row.latitude} <br />
                    longitude: {row.longitude} <br />
                </Popup>
            </Marker>
            ))}
        </MapContainer>
    );
};

LeafletMap.config = {
    dataContract: {},
    optionsSchema: {},
    key: 'consist.LeafletMap',
    name: 'LeafletMap',
};

LeafletMap.propTypes = {
    ...SplunkVisualization.propTypes,
};

LeafletMap.defaultProps = {
    ...SplunkVisualization.defaultProps,
};

export default LeafletMap;