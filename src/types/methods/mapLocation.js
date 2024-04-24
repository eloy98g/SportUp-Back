"use strict";
exports.__esModule = true;
var mapLocation = function (data) {
    var newLocation = {
        latitude: (data === null || data === void 0 ? void 0 : data.latitude) || null,
        longitude: (data === null || data === void 0 ? void 0 : data.longitude) || null,
        latitudeDelta: data === null || data === void 0 ? void 0 : data.latitudeDelta,
        longitudeDelta: data === null || data === void 0 ? void 0 : data.latitudeDelta,
        address: data === null || data === void 0 ? void 0 : data.latitudeDelta,
        radius: data === null || data === void 0 ? void 0 : data.latitudeDelta
    };
    return newLocation;
};
exports["default"] = mapLocation;
