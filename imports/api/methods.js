import { Categories } from "../api/collections";

Meteor.methods({
  'Items.add'({ name }) {

  },
  'Categories.add'({ name }) {
    // Create a new Global Category
    // Prevent duplicate category names
    var itemWithSameName = Categories.findOne({ name });
    if (itemWithSameName) {
      return {
        categoryExists: true,
        _id: itemWithSameName._id
      }
    }

    // Determine rank for new category
    var highestCategoryRank = Categories.find().count() - 1;

    var item = {
      name,
      rank: highestCategoryRank + 1,
      created: new Date()
    }

    var itemId = Categories.insert(item);
    return {
      _id: itemId
    };
  },
});

// model Item {
//   id         Int      @id @default(autoincrement())
//   name       String
//   published  Boolean  @default(true)
//   category   Category @relation(fields: [categoryId], references: [id])
//   categoryId Int
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt
// }