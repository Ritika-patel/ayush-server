const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = "development"; //production or development
CONFIG.port = "8000";

if (CONFIG.app === "production") {
  // TODO
} else if (CONFIG.app === "development") {
  CONFIG.db_dialect = "postgres";
  CONFIG.db_host = "localhost";
  CONFIG.db_port = "5432";
  CONFIG.db_name = "ayushdatabase";
  CONFIG.db_user = "postgres";
  CONFIG.db_password = "Ritika@123";
  CONFIG.jwt_encryption = "jwt_please_change";
}

module.exports = CONFIG;


// postgres://postgres:Ritika@123@localhost:5432/ayushdatabase
// postgres://postgres:Ritika@123@localhost:8000/ayushdatabase