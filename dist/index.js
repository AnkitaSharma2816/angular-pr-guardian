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
exports.zoneJsRule = exports.toPromiseRule = exports.standaloneMigrationRule = exports.standaloneBootstrapRule = exports.signalMigrationRule = exports.signalInputRule = exports.selfClosingTagRule = exports.queryRule = exports.outputRule = exports.ngIfRule = exports.ngForRule = exports.lazyRouteRule = exports.injectRule = exports.bootstrapRule = exports.resetProject = exports.getProject = exports.runTemplateMigrationScanner = exports.runMigrationScanner = exports.printFinalReport = exports.addPoints = exports.deductPoints = exports.scoreEngine = exports.getConfig = exports.setConfig = void 0;
// Main exports
var config_1 = require("./core/config");
Object.defineProperty(exports, "setConfig", { enumerable: true, get: function () { return config_1.setConfig; } });
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return config_1.getConfig; } });
var score_engine_1 = require("./core/score-engine");
Object.defineProperty(exports, "scoreEngine", { enumerable: true, get: function () { return score_engine_1.scoreEngine; } });
Object.defineProperty(exports, "deductPoints", { enumerable: true, get: function () { return score_engine_1.deductPoints; } });
Object.defineProperty(exports, "addPoints", { enumerable: true, get: function () { return score_engine_1.addPoints; } });
var final_report_1 = require("./core/final-report");
Object.defineProperty(exports, "printFinalReport", { enumerable: true, get: function () { return final_report_1.printFinalReport; } });
var migration_scanner_1 = require("./analyzers/migration-scanner");
Object.defineProperty(exports, "runMigrationScanner", { enumerable: true, get: function () { return migration_scanner_1.runMigrationScanner; } });
var template_migration_scanner_1 = require("./analyzers/template-migration-scanner");
Object.defineProperty(exports, "runTemplateMigrationScanner", { enumerable: true, get: function () { return template_migration_scanner_1.runTemplateMigrationScanner; } });
var ts_project_1 = require("./analyzers/ts-project");
Object.defineProperty(exports, "getProject", { enumerable: true, get: function () { return ts_project_1.getProject; } });
Object.defineProperty(exports, "resetProject", { enumerable: true, get: function () { return ts_project_1.resetProject; } });
// Export all rules individually (instead of as a namespace)
exports.bootstrapRule = __importStar(require("./migration-rules/bootstrap-migration.rule"));
exports.injectRule = __importStar(require("./migration-rules/inject-migration.rule"));
exports.lazyRouteRule = __importStar(require("./migration-rules/lazy-route.rule"));
exports.ngForRule = __importStar(require("./migration-rules/ngfor-migration.rule"));
exports.ngIfRule = __importStar(require("./migration-rules/ngif-migration.rule"));
exports.outputRule = __importStar(require("./migration-rules/output-migration.rule"));
exports.queryRule = __importStar(require("./migration-rules/query-migration.rule"));
exports.selfClosingTagRule = __importStar(require("./migration-rules/self-closing-tag.rule"));
exports.signalInputRule = __importStar(require("./migration-rules/signal-input.rule"));
exports.signalMigrationRule = __importStar(require("./migration-rules/signal-migration.rule"));
exports.standaloneBootstrapRule = __importStar(require("./migration-rules/standalone-bootstrap.rule"));
exports.standaloneMigrationRule = __importStar(require("./migration-rules/standalone-migration.rule"));
exports.toPromiseRule = __importStar(require("./migration-rules/topromise.rule"));
exports.zoneJsRule = __importStar(require("./migration-rules/zonejs.rule"));
