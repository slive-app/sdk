SLIVE.on("ready", async (data) => {
    console.log("\nready")
    console.log(data)

    SLIVE.config.set({
        id: "t_rtl_logo",
        width: 3840 * 2,
        height: 2160,
    })
})

SLIVE.on("chat", (data) => {
    console.log("\nchat")
    console.log(data)
})

SLIVE.on("event", (data) => {
    console.log("\nevent")
    console.log(data)
})

SLIVE.on("toolData", (data) => {
    console.log("\ntoolData")
    console.log(data)
})


console.log(SLIVE)
