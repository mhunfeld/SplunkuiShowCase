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


const position = [51.505, -0.09]


// // Convert sparkline data from the datasource a format usable by the @splunk/react-sparkline component
// const formatSparklineData = (data) => {
//     return data.slice(1).map((val) => parseInt(val, 10));
// };

// // Extract data from the datasource a format usable by the table
// const formatData = (dataSources) => {
//     if (!dataSources.primary.data) {
//         return {
//             fields: [],
//             data: [],
//         };
//     }

//     // Get the names of the fields
//     const fields = dataSources.primary.data.fields.map((f) => f.name);
//     const data = [];

//     // Convert the data from column to row form
//     dataSources.primary.data.columns.forEach((col, i) => {
//         col.forEach((item, j) => {
//             if (!data[j]) {
//                 data.push({});
//             }
//             data[j][fields[i].replace(/\s/g, '')] =
//                 fields[i] === 'Logins Last Week'
//                     ? formatSparklineData(item)
//                     : item;
//         });
//     });

//     return { fields, data };
// };

const LeafletMap = ({ options, dataSources }) => {
    // const [tableData, setTableData] = useState(formatData(dataSources));

    // useEffect(() => {
    //     setTableData(formatData(dataSources));
    // }, [dataSources]);

    // const handleRequestMoveRow = useCallback(
    //     ({ fromIndex, toIndex }) => {
    //         if (!tableData) {
    //             return;
    //         }
    //         const data = cloneDeep(tableData.data);
    //         const rowToMove = data[fromIndex];

    //         const insertionIndex = toIndex < fromIndex ? toIndex : toIndex + 1;
    //         data.splice(insertionIndex, 0, rowToMove);

    //         const removalIndex =
    //             toIndex < fromIndex ? fromIndex + 1 : fromIndex;
    //         data.splice(removalIndex, 1);

    //         setTableData({
    //             fields: tableData.fields,
    //             data,
    //         });
    //     },
    //     [tableData]
    // );

    return (
        <MapContainer style={{ height: "100%", minHeight: "100%" }} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
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