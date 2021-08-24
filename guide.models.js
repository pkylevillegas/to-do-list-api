// ------------------------------------------------------------------------ START OF MODEL ----------------------------------------------------------------------------------- //
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    // class Guide. Guide should be name of the file name.
  class Guide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      
    // Default in every static associate
        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID
        });

    // Default in every static associate
        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });

    // Add your additional association here
        
    // End of your additional association 
    }
  }
  
  // Change Guide.init to {{Filename}}.init 
  Guide.init(
    {
        // Default column this is a primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        // Default column this is the status of the row if it is deleted or active
        status: {
            type: DataTypes.STRING(60),
            defaultValue: "Active",
        },

        // Default column this is associate to user model who create the data
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },

        // Default column this is associate to user model who update the data
        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },
    
        // Add your additional columns here //
        
        
        // End of additional columns //
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "guide", // Change model name base on file name
    }
  );

  // Change Guide to file name first letter should be in upper case
  return Guide;
};
// ------------------------------------------------------------------------ END OF MODEL ----------------------------------------------------------------------------------- //


// Default column format always place a comma in the end of properties always set allowNull to true during dev
// Just copy paste it to the additional column and modify it base on column properties on our database documentation
column_name: {
    type: DataTypes.STRING,
    allowNull: true, 
},

// COMMONLY USED DATA TYPES

type: DataTypes.UUID, // UUID Datatypes for primary key and foreign key
type: DataTypes.STRING(255), // STRING w/ length
type: DataTypes.INTEGER, // For number
type: DataTypes.BOOLEAN, // True or False
type: DataTypes.DATE, // Date with time and timezone
type: DataTypes.DATEONLY, // Date without time

// If column has a default value
defaultValue: "Default Value"
  
  // If record is must be unique
unique: {
    msg: "Example of error message. 'Email should be unique'"
},

// Validation format
validate: {
    notNull: { msg: "Column name should not be null." },         // if column cannot be null
},

validate: {
    isEmail: true,            // will only accept email adress format
},



// Validation properties that you can use just add it inside validate { }
isAfter: "2011-11-05",    // only allow date strings after a specific date
isAlpha: true,            // will only allow letters
isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
isNumeric: true,          // will only allow numbers