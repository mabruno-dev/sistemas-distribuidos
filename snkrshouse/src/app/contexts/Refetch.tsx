"use client";
import React, { createContext, useContext } from "react";

interface CauseRefetchProps {
    causeRefetch: boolean;
    changeCauseRefetch: () => void;
}

export const CauseRefecthContext = createContext<CauseRefetchProps | undefined>(undefined);

export const CauseRefecthProvider: React.FC<React.PropsWithChildren<{}>> = (props: any) => {
    const [causeRefetch, setCauseRefetch] = React.useState(false);

    const changeCauseRefetch = () => {
        setCauseRefetch(!causeRefetch);
    };

    return (
        <CauseRefecthContext.Provider value={{ causeRefetch, changeCauseRefetch }}>
            {props.children}
        </CauseRefecthContext.Provider>
    );
};

const useCauseRefetch = () => {
    const context = useContext(CauseRefecthContext);
    if (!context) {
        throw new Error("useCauseRefetch must be used within an CauseRefecthProvider");
    }
    return context;
};

export default useCauseRefetch;
