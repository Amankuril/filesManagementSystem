// src/components/CustomToasts.jsx
import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

export const SuccessToast = ({ message }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#D4AA7D] text-[#272727]">
            <CheckCircle size={18} />
        </div>
        <span className="text-[#EFD09E] font-medium">{message}</span>
    </div>
);

export const ErrorToast = ({ message }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-red-600 text-white">
            <AlertTriangle size={18} />
        </div>
        <span className="text-[#EFD09E] font-medium">{message}</span>
    </div>
);
