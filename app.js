// connexion
const mongoose = require('mongoose');

const uri = 'localhost:27017'; 
const database = 'Modele';

mongoose.connect(`mongodb://${uri}/${database}`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error('Erreur lors de la connexion à la base de données:', err));

// Creation du schema
const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 0 }, 
    favoriteFoods: [String] 
});

//creation du modéle
const Modele = mongoose.model('Person', modelSchema);

//creation et ajout d'une personne
async function Creation() {
    const newperson = new Modele({
        name: 'Real',
        age: 24,
        favoriteFoods: ['Pizza', 'CBON']
    });
    try {
        const people = await newperson.save();
        console.log('Utilisateur créé:', people);
      } catch (err) {
        console.error('Erreur lors de la création:', err);
      }
}
//creer et supprimer 
async function CreationDelete() {
    const newperson = new Modele({
        name: 'NO',
        age: 24,
        favoriteFoods: ['Sushi', 'Noodles']
    });
    try {
        const people = await newperson.save();
        console.log('Utilisateur créé:', people);
      } catch (err) {
        console.error('Erreur lors de la création:', err);
      }
}
//creation et ajout de plusieurs personnes
async function createManyPerson() {
    const arrayOfPeople = [
        { name: 'SDSaliou', age: 13, favoriteFoods: ['Riz', 'Poulet'] },
        { name: 'Demba', age: 26, favoriteFoods: ['Burgers', 'Fries'] },
        { name: 'Jule', age: 30, favoriteFoods: ['Salad', 'Viande'] },
        { name: 'Maria', age: 23, favoriteFoods: ['Crepe', 'Tacos'] }
    ];
    try {
        const savedPerson = await Modele.create(arrayOfPeople);
        console.log('Person enregistrées:', savedPerson);

    } catch (err) {
        console.error('Erreur lors de la sauvegarde de la personne:', err);
    }
}
// recherche de personnes par nom
async function searchByName(name) {
    try {
        const people = await Modele.find({ name: name });
        console.log('Personne recherchée', people);
    } catch (err) {
        console.error('Erreur de recherche:', err);
    }
}
// recherche par id et update favorite food
async function updateById(id) {
    try {
        const person = await Modele.findById(id);
        person.favoriteFoods.push('Hamburger');
        const updatedPerson = await person.save();
        console.log('Person modifiée:', updatedPerson);
    } catch (err) {
        console.error('Erreur de recherche:', err);
    }
}

// mise à jour d'une personne
async function update(name, age) {
    try {
        const updatedPerson = await Modele.findOneAndUpdate({ name: name }, { age: age }, { new: true });
        console.log('Personne update:', updatedPerson);
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la personne:', err);
    }
}

// Suppression par ID
async function deletePersonById(id) {
    try {
        const deletedPerson = await Modele.findByIdAndDelete(id);
        if (!deletedPerson) {
            console.log(`Personne avec l'ID ${id} n'a pas été trouvée.`);
        } else {
            console.log('Personne supprimée:', deletedPerson);
        }
    } catch (err) {
        console.error('Erreur lors de la suppression de la personne:', err);
    }
}


// suppression de plusieurs documents
async function deleteplusieurs(name) {
    try {
        const people = await Modele.deleteMany({ name: name });
        console.log('Delete result:', people);
    } catch (err) {
        console.error('Erreur lors de la suppression des personnes:', err);
    }
}

//creation des personnes qui aiment le burritos
async function createPerson() {
    const arrayOfPeople = [
        { name: 'SDS', age: 20, favoriteFoods: ['burritos', 'Poulet'] },
        { name: 'Nino', age: 26, favoriteFoods: ['Burgers', 'burritos'] },
        { name: 'Cheikh', age: 30, favoriteFoods: ['burritos', 'Viande'] },
    ];
    try {
        const savedPerson = await Modele.create(arrayOfPeople);
        console.log('Person enregistrées:', savedPerson);

    } catch (err) {
        console.error('Erreur lors de la sauvegarde de la personne:', err);
    }
}
//Chain Search Query Helpers to Narrow Results
async function findAndSortByFood(favoriteFood) {
    try {
        const people = await Modele.find({ favoriteFoods: favoriteFood })
            .sort({ name: 1 }) // Sort by name in ascending order
            .limit(2) // Limit to 2 results
            .select('-age'); // Exclude age from the result
        console.log('Filtered people:', people);
    } catch (err) {
        console.error('Error querying people:', err);
    }
}

//Exécuter 

async function executer() {
     await Creation();
     await createManyPerson ();
     await searchByName('NO');
     await updateById('671976c31099fa416ed8a5b4');
     await update ('Demba',30);
     await CreationDelete();
     await deletePersonById('67197786519c606d042cbd74');
     await createPerson();
     await deleteplusieurs('SDS');
     await findAndSortByFood ('burritos');

}
executer();

