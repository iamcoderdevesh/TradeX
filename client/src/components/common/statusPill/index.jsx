import React from 'react'
import { classNames } from "utils";

const StatusPill = (props) => {
    const { value } = props;
    const status = value?.toLowerCase() || '';

    return (
        <span
            className={
                classNames(
                    "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-xl shadow-sm",
                    status.startsWith("win") ? "border-2 border-green text-green" : null,
                    status.startsWith("pending") ? "bg-yellow-100 text-yellow-800" : null,
                    status.startsWith("loss") ? "border-2 border-red text-red" : null,
                )
            }
        >
            {status}
        </span>
    )
}

export default StatusPill;
