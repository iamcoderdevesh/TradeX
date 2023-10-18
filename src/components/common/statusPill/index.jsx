import React from 'react'
import { classNames } from "components/utils";

const StatusPill = (props) => {
    const { value } = props;
    const status = value.toLowerCase();

    return (
        <span
            className={
                classNames(
                    "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                    status.startsWith("win") ? "bg-green-100 text-green-800" : null,
                    status.startsWith("pending") ? "bg-yellow-100 text-yellow-800" : null,
                    status.startsWith("loss") ? "bg-red-100 text-red-800" : null,
                )
            }
        >
            {status}
        </span>
    )
}

export default StatusPill;
