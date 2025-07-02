"use strict";
// Shared types for the compliance engine
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueSeverity = exports.DocumentStatus = exports.NotificationType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["ANALYST"] = "analyst";
})(UserRole || (exports.UserRole = UserRole = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["EMAIL"] = "email";
    NotificationType["SMS"] = "sms";
    NotificationType["PUSH"] = "push";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["UPLOADED"] = "uploaded";
    DocumentStatus["PROCESSING"] = "processing";
    DocumentStatus["ANALYZED"] = "analyzed";
    DocumentStatus["FAILED"] = "failed";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
var IssueSeverity;
(function (IssueSeverity) {
    IssueSeverity["LOW"] = "low";
    IssueSeverity["MEDIUM"] = "medium";
    IssueSeverity["HIGH"] = "high";
    IssueSeverity["CRITICAL"] = "critical";
})(IssueSeverity || (exports.IssueSeverity = IssueSeverity = {}));
