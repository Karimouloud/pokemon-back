const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée','Psy','Roche','Acier','Dragon','Sol','Combat','Spectre','Glace']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
           msg: 'Le NAME est déjà pris'
        },
        validate: {
          notEmpty: { msg: 'Veuillez remplir le champ NAME'},
          notNull: { msg: 'Le champ NAME est une propriété requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          min: {
            args: [0],
            msg: "Les points de vie doivent supérieurs ou égales à 0"
          },
          max: {
            args: [999],
            msg: "MLes points de vie doivent être inférieurs ou égales à 999"
          },
          notNull: { msg: 'Les points de vie sont une propriété requise'  }
         
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Veuillez entrer uniquement des nombres entiers'},
          min: {
            args: [0],
            msg: "Les points de dégâts doivent supérieurs ou égales à 0"
          },
          max: {
            args: [99],
            msg: "MLes points de dégâts doivent être inférieurs ou égales à 99"
          },
          notNull: { msg: 'Les points de dégâts sont une propriété requise'  }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Veuillez utiliser une URL valide'},
          notNull: { msg: 'L\'URL est une propriété requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types')
        },
        set(types) {
          this.setDataValue('types', types.join(','))
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokemon doit avoir au moins 1 TYPE.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokemon ne peut pas avoir + de 3 TYPES.')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error(`Le type du pokemon n'est pas dans la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, 
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}
