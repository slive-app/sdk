SLIVE.on("ready", (data) => {
    console.log("\nready")
    console.log(data)

    SLIVE.config.set({
        id: "t_rtl_logo",
        width: 1920,
        height: 1080,
    })

    SLIVE.db.set("test", "sdfsdf")
    
    SLIVE.db.get("test", (data) => {
        console.log(data)
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
