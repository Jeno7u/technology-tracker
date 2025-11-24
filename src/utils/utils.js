export const nextStatus = (current) => {
    const order = ["not-started", "in-progress", "completed"];
    const idx = order.indexOf(current);
    return order[(idx + 1) % order.length];
};
