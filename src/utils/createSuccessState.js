export const createSuccessState = (stateName, message) => {
    return {
        [stateName]: {
            success: true,
            message: message,
        },
    };
};
