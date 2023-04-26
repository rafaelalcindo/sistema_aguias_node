module.exports = {
    "type": "mysql",
    "host": process.env.MYSQL_HOSTNAME,
    "port": 3306,
    "username": process.env.MYSQL_USER_NAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "entities": [
        process.env.ENTITIES_PATH
    ],
    "migrations": [
        process.env.MIGRATION_PATH
    ],
    "cli": {
        "migrationsDir": [
            process.env.MIGRATION_DIR
        ],
        "entitiesDir": process.env.MODELS_PATH
    }
}
