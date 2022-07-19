// create 5 burgers (at least 3 should be beef)

db.burgers.insertMany([
  {
    meat: 'beef',
    cheese: 'single',
    toppings: ['pickles', 'ketchup', 'honey mustard']
  },
  { meat: 'chicken', cheese: 'single', toppings: ['pickles', 'honey mustard'] },
  { meat: 'beef', cheese: 'double', toppings: ['pickles', 'ketchup'] },
  { meat: 'chicken', cheese: 'single', toppings: ['pickles', 'honey mustard'] },
  { meat: 'beef', cheese: 'single', toppings: ['pickles', 'ketchup', 'onion'] },
  { meat: 'beef', cheese: 'none', toppings: ['pickles', 'onion'] }
])

// find all the burgers
db.burgers.find({})

// show just the meat of each burger
db.burgers.find({}, { meat: 1 })

// show just the toppings of each burger
db.burgers.find({}, { toppings: 1 })

// show everything but the cheese
db.burgers.find({}, { cheese: 0 })

// find all the burgers with beef

db.burgers.find({ meat: 'beef' })

// find all the burgers that are not beef

db.burgers.find({ meat: { $ne: 'beef' } })
// find the first burger with cheese
db.burgers.findOne({ cheese: 'single' })
// find one and update the first burger with cheese to have a property of 'double cheese'
db.burgers.updateOne(
  { cheese: 'single' },
  { $set: { cheese: 'double' }, $currentDate: { lastMOdified: true } }
)

// find the burger you updated to have double cheese
db.burgers.findOne({ cheese: 'double' })
// find and update all the beef burgers to be 'veggie'
db.burgers.updateMany({ meat: 'beef' }, { $set: { meat: 'veggie' } })

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
db.burgers.deleteMany({ meat: 'veggie' })

// drop the collection
//Expected Output
//true
db.burgers.drop()

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }
db.dropDatabase()
//
// Bonus
//recreate your burgers database and your burger collection
use burgerDatabase2

//copy paste your insert burgers from above to reseed your database

db.burgers.insertMany([
     {
     meat: 'beef',
     cheese: 'single',
     toppings: ['pickles', 'ketchup', 'honey mustard']
      },
     { meat: 'chicken', cheese: 'single', toppings: ['pickles', 'honey mustard'] },
     { meat: 'beef', cheese: 'double', toppings: ['pickles', 'ketchup'] },
     { meat: 'chicken', cheese: 'single', toppings: ['pickles', 'honey mustard'] },
      { meat: 'beef', cheese: 'single', toppings: ['pickles', 'ketchup', 'onion'] },
      { meat: 'beef', cheese: 'none', toppings: ['pickles', 'onion'] }
 ])

    
// Change the name of the key cheese to 'pumpkinSpice'
db.burgers.updateMany({}, {$rename:{cheese: "pumpkinSpice"}})

// find all the burgers with ketchup (or another topping you used at least once)
db.burgers.find({toppings: "onion"})

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles
db.burgers.updateMany({toppings: "onion"},{$pull :{toppings:"pickles" }})

// add a topping of 'eggs' to all the beef burgers
db.burgers.updateMany({meat: "beef"},{$push :{ toppings: "eggs" }})

//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact

burgerDatabase2> db.burgers.find({meat: "veggie"})

burgerDatabase2

//Add a price to each burger, start with $5.00 for each burger

db.burgers.updateMany({},{$set: {price: 5}, $currentDate: {lastModidied: true}})
db.burgers.updateMany({meat: "beef"},{$inc: {price: 2}, $currentDate: {lastModidied: true}})
