"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialCredential = exports.validateCredentials = void 0;
const zod_1 = require("zod");
const authSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required.",
    })
        .email({
        message: "Invalid email address",
    }),
    password: zod_1.z
        .string({
        invalid_type_error: "Invalid password",
        required_error: "Email is required.",
    })
        .min(8),
});
function validateCredentials(input) {
    return authSchema.safeParse(input);
}
exports.validateCredentials = validateCredentials;
function validatePartialCredential(input) {
    return authSchema.partial().safeParse(input);
}
exports.validatePartialCredential = validatePartialCredential;
