"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRelativeTime = exports.getStatusColor = exports.getSeverityColor = exports.formatCreditCard = exports.formatPhoneNumber = exports.capitalizeFirst = exports.truncateText = exports.formatPercentage = exports.formatCurrency = exports.formatDuration = exports.formatComplianceScore = exports.formatDateTime = exports.formatDate = exports.formatFileSize = void 0;
const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
exports.formatFileSize = formatFileSize;
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
exports.formatDate = formatDate;
const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
};
exports.formatDateTime = formatDateTime;
const formatComplianceScore = (score) => {
    return `${Math.round(score * 100)}%`;
};
exports.formatComplianceScore = formatComplianceScore;
const formatDuration = (seconds) => {
    if (seconds < 60) {
        return `${seconds}s`;
    }
    else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }
    else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }
};
exports.formatDuration = formatDuration;
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
const formatPercentage = (value, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`;
};
exports.formatPercentage = formatPercentage;
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength) + '...';
};
exports.truncateText = truncateText;
const capitalizeFirst = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
exports.capitalizeFirst = capitalizeFirst;
const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};
exports.formatPhoneNumber = formatPhoneNumber;
const formatCreditCard = (cardNumber) => {
    const cleaned = cardNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return cardNumber;
};
exports.formatCreditCard = formatCreditCard;
const getSeverityColor = (severity) => {
    switch (severity) {
        case 'low':
            return '#28a745'; // green
        case 'medium':
            return '#ffc107'; // yellow
        case 'high':
            return '#fd7e14'; // orange
        case 'critical':
            return '#dc3545'; // red
        default:
            return '#6c757d'; // gray
    }
};
exports.getSeverityColor = getSeverityColor;
const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return '#6c757d'; // gray
        case 'processing':
            return '#007bff'; // blue
        case 'completed':
            return '#28a745'; // green
        case 'failed':
            return '#dc3545'; // red
        default:
            return '#6c757d'; // gray
    }
};
exports.getStatusColor = getStatusColor;
const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
        return 'just now';
    }
    else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    else {
        return (0, exports.formatDate)(dateString);
    }
};
exports.formatRelativeTime = formatRelativeTime;
