"use client";
import React, { createContext, useContext } from "react";

interface ModalProps {
    open: boolean;
    changeOpen: () => void;
}

export const OpenModalContext = createContext<ModalProps | undefined>(undefined);

export const OpenModalProvider: React.FC<React.PropsWithChildren<{}>> = (props: any) => {
    const [open, setOpen] = React.useState(false);

    const changeOpen = () => {
        setOpen(!open);
    };

    return <OpenModalContext.Provider value={{ open, changeOpen }}>{props.children}</OpenModalContext.Provider>;
};

const useOpenModal = () => {
    const context = useContext(OpenModalContext);
    if (!context) {
        throw new Error("useOpenModal must be used within an OpenModalProvider");
    }
    return context;
};

export default useOpenModal;
