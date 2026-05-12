"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileNameRule = checkFileNameRule;
const path = __importStar(require("path"));
function checkFileNameRule(filePath) {
    const fileName = path.basename(filePath);
    // Rule: Component files should be kebab-case
    if (fileName.includes('.component.ts') && !isKebabCase(fileName)) {
        console.log(`⚠ File name should be kebab-case: ${fileName}`);
    }
    // Rule: Service files should have .service.ts suffix
    if (fileName.includes('.service.ts') && !fileName.endsWith('.service.ts')) {
        console.log(`⚠ Service files should end with .service.ts: ${fileName}`);
    }
}
function isKebabCase(str) {
    return /^[a-z]+(-[a-z]+)*(\.[a-z]+)?$/.test(str);
}
