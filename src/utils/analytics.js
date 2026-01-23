import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

export const initGA = () => {
    if (GA_MEASUREMENT_ID) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        console.log("GA4 Initialized");
    }
};

export const logPageView = (path) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};

export const logSectionView = (sectionName) => {
    ReactGA.event({
        category: "Navigation",
        action: "View Section",
        label: sectionName,
    });
};
