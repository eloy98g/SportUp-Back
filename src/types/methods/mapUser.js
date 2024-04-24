"use strict";
exports.__esModule = true;
var mapLocation_1 = require("./mapLocation");
var mapUser = function (data) {
    var newUser = {
        email: (data === null || data === void 0 ? void 0 : data.email) || "",
        name: (data === null || data === void 0 ? void 0 : data.name) || "",
        gid: data === null || data === void 0 ? void 0 : data.gid,
        phone: (data === null || data === void 0 ? void 0 : data.phone) || "",
        image: (data === null || data === void 0 ? void 0 : data.image) || "",
        description: (data === null || data === void 0 ? void 0 : data.description) || "",
        location: (0, mapLocation_1["default"])(data === null || data === void 0 ? void 0 : data.location),
        birthDate: (data === null || data === void 0 ? void 0 : data.birthDate) || 0,
        creationDate: (data === null || data === void 0 ? void 0 : data.creationDate) || 0,
        phoneVerified: (data === null || data === void 0 ? void 0 : data.phoneVerified) || false,
        emailVerified: (data === null || data === void 0 ? void 0 : data.emailVerified) || false,
        gender: data === null || data === void 0 ? void 0 : data.gender
    };
    return newUser;
};
exports["default"] = mapUser;
