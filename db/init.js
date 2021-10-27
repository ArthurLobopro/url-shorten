const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, "db.sqlite")

fs.writeFileSync(dbPath, "", {encoding: "utf-8"})