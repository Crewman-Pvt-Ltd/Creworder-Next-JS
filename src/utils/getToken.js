export const getToken = () => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem("crew_token");
    }
};