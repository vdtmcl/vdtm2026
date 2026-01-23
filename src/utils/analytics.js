import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || "G-FTVPW8BJ57";

export const initGA = () => {
    if (GA_MEASUREMENT_ID) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        console.log(`[GA4] Initialized with ${GA_MEASUREMENT_ID}`);
    } else {
        console.warn("[GA4] No Measurement ID found. Check VITE_GA_ID in .env");
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
