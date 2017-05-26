// @flow
export default function generatePreviewData(distribution, datasetId){
    const config = {
      "version":"0.0.03",
      "initSources":[
        {"catalog":[
          {"type":"group",
          "name":"User-Added Data",
          "description":"The group for data that was added by the user via the Add Data panel.",
          "isUserSupplied":true,
          "isOpen":true,
          "items":[
            {
            "type":distribution.format.toLowerCase(),
            "name":"User Data",
            "isUserSupplied":true,
            "isOpen":true,
            "isEnabled":true,
            "url":distribution.downloadUrl,
            "layers": getLayers(distribution, datasetId)
          }
        ]
      }],
      "catalogIsUserSupplied":true,
      "homeCamera": {
                        "west": 105,
                        "south": -45,
                        "east": 155,
                        "north": -5
                    }

    }]}

    function getLayers(distribution, datasetId){
      debugger
      if(distribution.format.toLowerCase() === 'wms' || distribution.format.toLowerCase() === 'wfs'){
        return `ckan_${datasetId.split('-').join('_')}`
      }
    }


    // if (config["initSources"][0]['catalog'][0]['items'][0]['type'] == 'arcgis rest api') {
    //     config["initSources"][0]['catalog'][0]['items'][0]['type'] = 'esri-mapServer-group';
    // }

    // if (spatial != '') {
    //             extent = geojsonExtent(JSON.parse(spatial)); //[WSEN]
    //             if (extent[0] != extent[2]) {
    //                 config["initSources"][0]['homeCamera']['west'] = extent[0];
    //                 config["initSources"][0]['homeCamera']['south'] = extent[1];
    //                 config["initSources"][0]['homeCamera']['east'] = extent[2];
    //                 config["initSources"][0]['homeCamera']['north'] = extent[3];
    //             }
    //         }

    var encoded_config = encodeURIComponent(JSON.stringify(config));
    return encoded_config;
}
