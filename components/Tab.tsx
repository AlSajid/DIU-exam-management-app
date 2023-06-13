"use client";
import {useState} from "react";

export default function Tab({header, content}: any) {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="container mx-auto my-3">
            {/* tab headers */}
            <div className=" text-lg text-bold text-center rounded-full w-1/2 mx-auto">
                <div className="flex rounded border border-emerald-700">
                    {header?.map((item: string, index: number) => {
                        if (tabIndex === index)
                            return (
                                <div
                                    key={index}
                                    className="transition-all duration-300 ease-in-out select-none bg-emerald-700 text-white font-bold rounded p-3 w-1/2 text-xl "
                                    onClick={() =>
                                        setTabIndex(index)
                                    }>
                                    {item}
                                </div>
                            );
                        else
                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-3 font-bold w-1/2 text-gary-700 rounded bg-slate-100"
                                    onClick={() =>
                                        setTabIndex(index)
                                    }>
                                    {item}
                                </div>
                            );
                    })}
                </div>
            </div>

            {/* tab contents */}
            <div>{content[tabIndex]}</div>
        </div>
    );
}
